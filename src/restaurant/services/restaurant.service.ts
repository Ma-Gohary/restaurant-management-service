import {Injectable} from "@nestjs/common";
import {RestaurantRepository} from "../repositories/restaurant.repository";
import {CreateRestaurantRequestDto} from "../dtos/request/create-restaurant.request.dto";
import {ListRestaurantRequestDto} from "../dtos/request/list-restaurant.request.dto";
import {RestaurantResponseDto} from "../dtos/response/restaurant.response.dto";
import {CuisineService} from "./cuisine.service";
import {CuisineResponseDto} from "../dtos/response/cuisine.response.dto";

@Injectable()
export class RestaurantService {
  
  constructor(
    private readonly restaurantRepository: RestaurantRepository,
    private readonly cuisineService: CuisineService
  ) {}
  
  async create(createRestaurantRequestDto: CreateRestaurantRequestDto): Promise<RestaurantResponseDto> {
    const cuisines = await this.cuisineService.findOrCreateCuisine(createRestaurantRequestDto.cuisines);
    const createdRestaurant = await this.restaurantRepository.create(createRestaurantRequestDto, cuisines);
    await this.cuisineService.registerRestaurantToCuisine(createdRestaurant.id, cuisines.map(cuisine => cuisine.id));
    return createdRestaurant;
  }
  
  async findAll(listRestaurantRequestDto: ListRestaurantRequestDto): Promise<RestaurantResponseDto[]> {
    let cuisine: CuisineResponseDto;
    let restaurants: RestaurantResponseDto[] = [];
    if (listRestaurantRequestDto.cuisine) {
      cuisine = await this.cuisineService.findCuisineByName(listRestaurantRequestDto.cuisine);
      if (!cuisine) {
        return restaurants;
      }
    }
    restaurants =  await this.restaurantRepository.findAll(cuisine?.id);
    return restaurants;
    
  }
  
  async findOne(id: string, name?: string): Promise<RestaurantResponseDto> {
    return await this.restaurantRepository.findOne(id, name);
  }
  
  async findNearbyRestaurants(latitude: number, longitude: number): Promise<RestaurantResponseDto[]> {
    return await this.restaurantRepository.findNearbyRestaurants(latitude, longitude);
  }
  
  async findRestaurantByName(name: string): Promise<RestaurantResponseDto> {
    return await this.restaurantRepository.findRestaurantByName(name);
  }
  
  async registerUserToRestaurant(userId: string, restaurantId: string): Promise<void> {
    await this.restaurantRepository.registerUserToRestaurant(userId, restaurantId);
  }
  
}