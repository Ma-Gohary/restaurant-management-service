import {Body, Controller, Get, Param, Patch, Post} from "@nestjs/common";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {UserService} from "../services/user.service";
import {CreateUserRequestDto} from "../dtos/requests/create-user.request.dto";
import {UserResponseDto} from "../dtos/response/user.response.dto";
import {UpdatePartialUserRequestDto} from "../dtos/requests/update-partial-user.request.dto";
import {UsersAndRestaurantsResponseDto} from "../dtos/response/users-and-restaurants.response.dto";

@ApiTags('User Controller')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}
  
  @Get('/:id')
  async findUserById(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.userService.findUserById(id);
  }
  
  @ApiOkResponse({
    description: 'Successful Operation',
    type: UserResponseDto,
  })
  @Post()
  async create(@Body() createUserRequestDto: CreateUserRequestDto): Promise<UserResponseDto> {
    return this.userService.create(createUserRequestDto);
  }
  
  @ApiOkResponse({
    description: 'Successful Operation',
    type: UserResponseDto,
  })
  @Patch(':userId/favorite')
  async favoriteRestaurantsAndCuisines(
    @Param('userId') id: string,
    @Body() updatePartialUserRequestDto: UpdatePartialUserRequestDto): Promise<UserResponseDto> {
    return this.userService.favoriteRestaurantOrCuisine(id, updatePartialUserRequestDto);
  }
  
  
  @ApiOkResponse({
    description: 'Successful Operation',
    type: UsersAndRestaurantsResponseDto,
  })
  @Get('/:id/restaurants')
  async findUsersAndRestaurants(@Param('id') id: string): Promise<UsersAndRestaurantsResponseDto> {
    return await this.userService.findUsersAndRestaurants(id);
  }

}