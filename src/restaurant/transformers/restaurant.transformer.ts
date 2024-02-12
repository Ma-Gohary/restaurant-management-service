import {Injectable} from "@nestjs/common";
import {Restaurant} from "../entities/restaurant.entity";
import {RestaurantResponseDto} from "../dtos/response/restaurant.response.dto";

//
@Injectable()
export class RestaurantTransformer {
  transformRestaurantToRestaurantDto(restaurant: Restaurant): RestaurantResponseDto {
    return {
      id: restaurant._id,
      nameEn: restaurant.nameEn,
      nameAr: restaurant.nameAr,
      latitude: restaurant.location.point.coordinates[1],
      longitude: restaurant.location.point.coordinates[0],
      users: restaurant.users?.map(user => user.toString()),
      cuisines: restaurant.cuisines?.map(cuisine => cuisine.toString()),
    };
  }
}