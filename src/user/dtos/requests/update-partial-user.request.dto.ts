import {IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdatePartialUserRequestDto {
  
  @ApiProperty({ type: String, description: 'Favorite Restaurant of the user', example: 'Mcdonalds' })
  @IsString()
  @IsOptional()
  restaurant?: string;
  
  @ApiProperty({ type: String, description: 'Favorite Cuisine of the user', example: 'Fast Food' })
  @IsString()
  @IsOptional()
  cuisine?: string;
}