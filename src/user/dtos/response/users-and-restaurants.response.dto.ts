import {UserResponseDto} from "./user.response.dto";
import {RestaurantResponseDto} from "../../../restaurant/dtos/response/restaurant.response.dto";
import {IsArray} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UsersAndRestaurantsResponseDto {
  @ApiProperty({ type: [UserResponseDto], description: 'List of users' })
  @IsArray({ each: true })
  users: UserResponseDto[];
  
  @ApiProperty({ type: [RestaurantResponseDto], description: 'List of restaurants' })
  @IsArray({ each: true })
  restaurants: RestaurantResponseDto[];
}