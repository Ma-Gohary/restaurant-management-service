import {IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ListRestaurantRequestDto {
  
  @ApiProperty({ type: String, description: 'Name of cuisine type', example: 'Food, Burger', required: false })
  @IsString()
  @IsNotEmpty({ message: 'Cuisine Name is required' })
  @IsOptional()
  cuisine?: string;
  
}