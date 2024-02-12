import {Injectable} from "@nestjs/common";
import {Cuisine} from "../entities/cuisine.entity";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Config} from "../../common/configs/config";
import {CuisineResponseDto} from "../dtos/response/cuisine.response.dto";

@Injectable()
export class CuisineRepository {
  constructor(
    @InjectModel(Cuisine.name, Config.DATABASE_CONNECTION_NAME)
    private readonly cuisineModel: Model<Cuisine>
  ) {}
  
  async findOrCreateCuisine(cuisineNames: string[]): Promise<CuisineResponseDto[]> {
    const returnedCuisines = await this.cuisineModel.find({ nameEn: { $in: cuisineNames }});
    if (returnedCuisines.length !== cuisineNames.length) {
      const newCuisinesToBeAdded = cuisineNames.filter(requestedCuisine =>
        !returnedCuisines.map(returnedCuisine => returnedCuisine.nameEn).includes(requestedCuisine));
      const newCuisines = await this.cuisineModel.insertMany(newCuisinesToBeAdded.map(name => ({
        nameEn: name,
      })));
      returnedCuisines.push(...newCuisines);
    }
    return returnedCuisines.map(cuisine => ({
      id: cuisine._id,
      name: cuisine.nameEn,
      restaurants: cuisine.restaurants?.map(restaurant => restaurant.toString()),
      users: cuisine.users?.map(user => user.toString()),
    }));
  }
  
  async registerRestaurantToCuisine(restaurantId: string, cuisineIds: string[]): Promise<void> {
    await this.cuisineModel
      .updateMany({ _id: { $in: cuisineIds } },
        { $push: { restaurants: restaurantId }}).exec();
  }
  
  async findCuisineByName(name: string): Promise<CuisineResponseDto> {
    let mappedCuisine: CuisineResponseDto;
    const cuisine = await this.cuisineModel.findOne({ nameEn: name }).exec();
    if (cuisine) {
      mappedCuisine = {
        id: cuisine._id,
        name: cuisine.nameEn,
        restaurants: cuisine.restaurants?.map(restaurant => restaurant.toString()),
        users: cuisine.users?.map(user => user.toString()),
      };
    }
    return mappedCuisine;
  }
  
  async registerUserToCuisine(userId: string, cuisineId: string): Promise<void> {
    await this.cuisineModel
      .updateOne({ _id: cuisineId },
        { $push: { users: userId }}).exec();
  }
}