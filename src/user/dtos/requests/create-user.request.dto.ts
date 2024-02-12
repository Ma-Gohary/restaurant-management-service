import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserRequestDto {
  
  @ApiProperty({ type: String, description: 'Full name of the user', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  fullName: string;
}