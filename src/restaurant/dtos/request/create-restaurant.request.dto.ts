import {ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateRestaurantRequestDto {
  
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
    
    @ApiProperty({ type: [String], description: 'Cuisines served at the restaurant', example: ['Fast Food', 'Burgers'] })
    @IsArray()
    @IsString({each: true})
    @IsNotEmpty({each: true})
    @ArrayMinSize(1)
    @ArrayMaxSize(3)
    cuisines: string[];
    
}

