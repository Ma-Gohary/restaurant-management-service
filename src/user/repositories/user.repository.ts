import {User} from "../entities/user.entity";
import {Injectable} from "@nestjs/common";
import {Model, Types} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Config} from "../../common/configs/config";
import {CreateUserRequestDto} from "../dtos/requests/create-user.request.dto";
import {UserResponseDto} from "../dtos/response/user.response.dto";
import {RestaurantResponseDto} from "../../restaurant/dtos/response/restaurant.response.dto";
import {UserTransformer} from "../transformers/user.transformer";
import {RestaurantTransformer} from "../../restaurant/transformers/restaurant.transformer";

@Injectable()
export class UserRepository {
  
  constructor (
    @InjectModel(User.name, Config.DATABASE_CONNECTION_NAME)
    private readonly userModel: Model<User>,
    private readonly userTransformer: UserTransformer,
    private readonly restaurantTransformer: RestaurantTransformer,
  ) {}
  
  async create(createUserRequestDto: CreateUserRequestDto): Promise<UserResponseDto> {
    try {
      const createdUser = await this.userModel.create({
        fullName: createUserRequestDto.fullName,
      })
      return this.userTransformer.transformUserToUserDto(createdUser);
    } catch (e) {
      throw e;
    }
  }
  
  async findOne(id: string): Promise<UserResponseDto> {
   const user = await this.userModel.findById(id).exec();
    return this.userTransformer.transformUserToUserDto(user);
  }
  
  async favoriteRestaurantOrCuisine(id: string, restaurantId?: string, cuisineId?: string): Promise<UserResponseDto> {
    const query = { $addToSet: {}};
    if (restaurantId) {
      query.$addToSet['restaurants'] = restaurantId;
    }
    if (cuisineId) {
      query.$addToSet['cuisines'] = cuisineId;
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(id, query);
    return this.userTransformer.transformUserToUserDto(updatedUser);
  }
  
  async findUsersWithSameCuisines(user: UserResponseDto): Promise<UserResponseDto[]> {
    const cuisineIds = user.cuisines.map(cuisine => new Types.ObjectId(cuisine));
  
    const relatedUsers = await this.userModel.aggregate([
      {
        $match: {
          cuisines: { $in: cuisineIds },
          _id: { $ne: user.id },
        },
      },
    ]);
  
    return relatedUsers.map((user) => this.userTransformer.transformUserToUserDto(user));
  }
  
  async findRestaurantsFollowedByUsers(user: UserResponseDto): Promise<RestaurantResponseDto[]> {
    const cuisineIds = user.cuisines.map(cuisine => new Types.ObjectId(cuisine));
  
    const relatedUsers = await this.userModel.aggregate([
      {
        $match: {
          cuisines: { $in: cuisineIds },
          _id: { $ne: user.id },
        },
      },
      {
        $lookup: {
          from: 'restaurant',
          localField: '_id',
          foreignField: 'users',
          as: 'restaurants',
        },
      },
      {
        $unwind: '$restaurants',
      },
      {
        $group: {
          _id: null,
          restaurants: { $addToSet: '$restaurants' },
        },
      },
      {
        $project: {
          _id: 0,
          restaurants: 1,
        },
      },
    ]);
  
    return relatedUsers[0]?.restaurants.map((restaurant) => this.restaurantTransformer.transformRestaurantToRestaurantDto(restaurant));
  }

}