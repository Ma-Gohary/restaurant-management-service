import {IsArray, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserResponseDto {
  
  @ApiProperty({ type: String, description: 'Id of the user', example: 'xyz' })
  @IsString()
  @IsNotEmpty()
  id: string;
  
  @ApiProperty({ type: String, description: 'Full name of the user', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  fullName: string;
  
  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [String], description: 'Ids of the restaurants the user like', example: ['xyz', 'abc'] })
  restaurants?: string[];
  
  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [String], description: 'Ids of the cuisines the user like', example: ['xyz', 'abc'] })
  cuisines?: string[];
}