import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RestaurantResponseDto {
  
  @ApiProperty({ type: String, description: 'Id of the restaurant', example: 'xyz' })
  @IsString()
  @IsNotEmpty()
  id: string;
  
  @ApiProperty({ type: String, description: 'Name of the restaurant in English', example: 'McDonalds' })
  @IsString()
  @IsNotEmpty()
  nameEn: string;
  
  @ApiProperty({ type: String, description: 'Name of the restaurant in Arabic', example: 'ماكدونالدز' })
  @IsString()
  @IsNotEmpty()
  nameAr: string;
  
  @ApiProperty({ type: Number, description: 'Latitude of the restaurant', example: 24.7136 })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;
  
  @ApiProperty({ type: Number, description: 'Longitude of the restaurant', example: 46.6753 })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
  
  @ApiProperty({ type: [String], description: 'Ids of the users who like the restaurant', example: ['xyz', 'abc'] })
  @IsArray()
  @IsOptional()
  users?: string[];
  
  @ApiProperty({ type: [String], description: 'Ids of the cuisines the restaurant serves', example: ['Fast Food', 'Burger'] })
  @IsArray()
  @IsOptional()
  cuisines?: string[];
}