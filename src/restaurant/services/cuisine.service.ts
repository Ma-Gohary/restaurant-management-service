import {Injectable} from "@nestjs/common";
import {CuisineRepository} from "../repositories/cuisine.repository";
import {CuisineResponseDto} from "../dtos/response/cuisine.response.dto";

@Injectable()
export class CuisineService {
  
  constructor(
    private readonly cuisineRepository: CuisineRepository,
  ) {}
  
  async findOrCreateCuisine(cuisineNames: string[]): Promise<CuisineResponseDto[]> {
    return await this.cuisineRepository.findOrCreateCuisine(cuisineNames);
  }
  
  async registerRestaurantToCuisine(restaurantId: string, cuisineIds: string[]): Promise<void> {
    await this.cuisineRepository.registerRestaurantToCuisine(restaurantId, cuisineIds);
  }
  
  async findCuisineByName(name: string): Promise<CuisineResponseDto> {
    return await this.cuisineRepository.findCuisineByName(name);
  }
  
  async registerUserToCuisine(userId: string, cuisineId: string): Promise<void> {
    await this.cuisineRepository.registerUserToCuisine(userId, cuisineId);
  }
  
}