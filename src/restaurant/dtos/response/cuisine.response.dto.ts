import {IsArray, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CuisineResponseDto {
  
  @ApiProperty({ type: String, description: 'Id of the cuisine', example: 'xyz' })
  @IsString()
  @IsNotEmpty()
  id: string;
  
  @ApiProperty({ type: String, description: 'Name of the cuisine in English', example: 'Fast Food'})
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty({ type: [String], description: 'List of restaurant ids', example: ['xyz', 'abc']})
  @IsArray()
  @IsOptional()
  restaurants?: string[];
  
  @ApiProperty({ type: [String], description: 'List of user ids', example: ['xyz', 'abc']})
  @IsArray()
  @IsOptional()
  users?: string[];
}