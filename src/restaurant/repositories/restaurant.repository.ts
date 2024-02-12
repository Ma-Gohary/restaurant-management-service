import {Injectable} from "@nestjs/common";
import {Restaurant} from "../entities/restaurant.entity";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Config} from "../../common/configs/config";
import {RestaurantResponseDto} from "../dtos/response/restaurant.response.dto";
import {ConversionsUtil} from "../../common/utils/conversions.util";
import {CreateRestaurantRequestDto} from "../dtos/request/create-restaurant.request.dto";
import {InvalidRestaurantNameException} from "../../common/errors/generic-error.error";
import {CuisineResponseDto} from "../dtos/response/cuisine.response.dto";
import {RestaurantTransformer} from "../transformers/restaurant.transformer";

@Injectable()
export class RestaurantRepository {
  
  constructor(
    @InjectModel(Restaurant.name, Config.DATABASE_CONNECTION_NAME)
    private readonly restaurantModel: Model<Restaurant>,
    private readonly restaurantTransformer: RestaurantTransformer
  ) {}
  
  async create(createRestaurantRequestDto: CreateRestaurantRequestDto, cuisines: CuisineResponseDto[]): Promise<RestaurantResponseDto> {
    const createdRestaurant = new this.restaurantModel({
      nameEn: createRestaurantRequestDto.nameEn,
      nameAr: createRestaurantRequestDto.nameAr,
      location: {
        point: {
          coordinates: [
            createRestaurantRequestDto.longitude,
            createRestaurantRequestDto.latitude,
          ],
        }
      },
      cuisines: cuisines.map(cuisine => cuisine.id),
    });
    try {
      const restaurant = await createdRestaurant.save();
      return this.restaurantTransformer.transformRestaurantToRestaurantDto(restaurant);
    } catch(e) {
      if (e.code === 11000) {
        throw new InvalidRestaurantNameException('Restaurant Error');
      } else {
        throw e;
      }
    }
  }
  
  async findAll(cuisineId: string): Promise<RestaurantResponseDto[]> {
    const query = {};
    if (cuisineId) {
      query['cuisines'] = cuisineId;
    }
    const restaurantList = await this.restaurantModel.find(query).exec();
    
    return restaurantList.map(restaurant => this.restaurantTransformer.transformRestaurantToRestaurantDto(restaurant));
  }
  
  async findOne(id: string, name?: string): Promise<RestaurantResponseDto> {
    const restaurantDoc = name ? { nameEn: name } : { _id: id };
    const restaurant = await this.restaurantModel.findOne(restaurantDoc).exec();
    
    return this.restaurantTransformer.transformRestaurantToRestaurantDto(restaurant);
  }
  
  async findNearbyRestaurants(latitude: number, longitude: number): Promise<RestaurantResponseDto[]> {
    // Get all restaurants within a certain radius
    const restaurantList = await this.restaurantModel.find({
      "location.point": {
        $geoWithin: {
          $centerSphere: [
            [longitude, latitude],
            ConversionsUtil.meterToRadian(Config.AREA_IN_METERS),
          ],
        }
      }
    }).exec();
    
    return restaurantList.map(restaurant => this.restaurantTransformer.transformRestaurantToRestaurantDto(restaurant));
  }
  
  async findRestaurantByName(name: string): Promise<RestaurantResponseDto> {
    const restaurant = await this.restaurantModel.findOne({ nameEn: name }).exec();
    return this.restaurantTransformer.transformRestaurantToRestaurantDto(restaurant);
  }
  
  async registerUserToRestaurant(userId: string, restaurantId: string): Promise<void> {
    await this.restaurantModel.updateOne({ _id: restaurantId }, { $push: { users: userId } }).exec();
  }
  
}