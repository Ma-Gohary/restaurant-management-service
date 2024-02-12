import {UserRepository} from "../repositories/user.repository";
import {Injectable} from "@nestjs/common";
import {CreateUserRequestDto} from "../dtos/requests/create-user.request.dto";
import {UserResponseDto} from "../dtos/response/user.response.dto";
import {UpdatePartialUserRequestDto} from "../dtos/requests/update-partial-user.request.dto";
import {RestaurantService} from "../../restaurant/services/restaurant.service";
import {CuisineService} from "../../restaurant/services/cuisine.service";
import {UsersAndRestaurantsResponseDto} from "../dtos/response/users-and-restaurants.response.dto";
import {
  CuisineAlreadyExists,
  CuisineNotFoundException,
  RestaurantAlreadyExists,
  RestaurantNotFoundException,
  UserNotFoundException
} from "../../common/errors/generic-error.error";
import {CuisineResponseDto} from "../../restaurant/dtos/response/cuisine.response.dto";
import {RestaurantResponseDto} from "../../restaurant/dtos/response/restaurant.response.dto";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly restaurantService: RestaurantService,
    private readonly cuisineService: CuisineService,
  ) {}
  
  async findUserById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new UserNotFoundException('User Error');
    }
    return user;
  }
  
  async create(createUserRequestDto: CreateUserRequestDto): Promise<UserResponseDto> {
    return await this.userRepository.create(createUserRequestDto);
  }
  
  async favoriteRestaurantOrCuisine(id: string, updatePartialUserRequestDto: UpdatePartialUserRequestDto): Promise<UserResponseDto> {
    let cuisine: CuisineResponseDto;
    let restaurant: RestaurantResponseDto;
    const user = await this.userRepository.findOne(id);
    // find restaurant by name and if it is found add this restaurant to user's favorite restaurants.
    if (updatePartialUserRequestDto.restaurant) {
      restaurant = await this.restaurantService.findRestaurantByName(updatePartialUserRequestDto.restaurant);
      if (!restaurant) {
        throw new RestaurantNotFoundException('Restaurant Error');
      }
      if (user.restaurants.includes(restaurant.id)) {
        throw new RestaurantAlreadyExists('Restaurant Error');
      }
      await this.restaurantService.registerUserToRestaurant(user.id, restaurant.id);
    }
  
    // find cuisine by name and if it is found add this restaurant to user's favorite cuisines.
    if (updatePartialUserRequestDto.cuisine) {
      cuisine = await this.cuisineService.findCuisineByName(updatePartialUserRequestDto.cuisine);
      if (!cuisine) {
        throw new CuisineNotFoundException('Cuisine Error');
      }
      if (user.cuisines.includes(cuisine.id)) {
        throw new CuisineAlreadyExists('Cuisine Error');
      }
      await this.cuisineService.registerUserToCuisine(user.id, cuisine.id);
    }
    return await this.userRepository.favoriteRestaurantOrCuisine(id, restaurant?.id, cuisine?.id);
  }
  
  async findUsersAndRestaurants(id: string): Promise<UsersAndRestaurantsResponseDto> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new UserNotFoundException('User Error');
    }
    // find users with the same cuisine.
    const users = await this.userRepository.findUsersWithSameCuisines(user);
    // find restaurants followed by the same users.
    const restaurants = await this.userRepository.findRestaurantsFollowedByUsers(user);
    return {
      users,
      restaurants
    }
  }
}