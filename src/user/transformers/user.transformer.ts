import {Injectable} from "@nestjs/common";
import {UserResponseDto} from "../dtos/response/user.response.dto";
import {User} from "../entities/user.entity";


@Injectable()
export class UserTransformer {
  transformUserToUserDto(user: User): UserResponseDto {
    return {
      id: user._id,
      fullName: user.fullName,
      cuisines: user.cuisines?.map(cuisine => cuisine.toString()),
      restaurants: user.restaurants?.map(restaurant => restaurant.toString()),
    };
  }
}