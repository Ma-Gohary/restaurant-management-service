import {Body, Controller, Get, Param, Post, Query} from "@nestjs/common";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {RestaurantService} from "../services/restaurant.service";
import {CreateRestaurantRequestDto} from "../dtos/request/create-restaurant.request.dto";
import {RestaurantResponseDto} from "../dtos/response/restaurant.response.dto";
import {ListRestaurantRequestDto} from "../dtos/request/list-restaurant.request.dto";

@ApiTags('Restaurant Controller')
@Controller('restaurant')
export class RestaurantController {
  
  constructor(private readonly restaurantService: RestaurantService) {}
  
  @ApiOkResponse({
    description: 'Successful Operation',
    type: RestaurantResponseDto,
  })
  @Post()
  create(@Body() restaurantDto: CreateRestaurantRequestDto): Promise<RestaurantResponseDto> {
    return this.restaurantService.create(restaurantDto);
  }
  
  @ApiOkResponse({
    description: 'Successful Operation',
    type: RestaurantResponseDto,
    isArray: true
  })
  @Get()
  findAll(
    @Query() listRestaurantRequestDto: ListRestaurantRequestDto
  ): Promise<RestaurantResponseDto[]> {
    return this.restaurantService.findAll(listRestaurantRequestDto);
  }
  
  @ApiOkResponse({
    description: 'Successful Operation',
    type: RestaurantResponseDto,
    isArray: true
  })
  @Get('/nearby')
  findNearbyRestaurants(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ): Promise<RestaurantResponseDto[]> {
    return this.restaurantService.findNearbyRestaurants(latitude, longitude);
  }
  
  @ApiOkResponse({
    description: 'Successful Operation',
    type: RestaurantResponseDto,
  })
  @Get('/:id')
  findOne(
    @Param('id') id: string,
    @Query('name') name?: string,
  ): Promise<RestaurantResponseDto> {
    return this.restaurantService.findOne(id, name);
  }
}