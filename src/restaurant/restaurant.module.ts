import {Module} from '@nestjs/common';
import {CommonModule} from '../common/common.module';
import {MongooseModule} from '@nestjs/mongoose';
import {ClsModule} from 'nestjs-cls';
import {Config} from 'src/common/configs/config';
import {RestaurantRepository} from "./repositories/restaurant.repository";
import {RestaurantController} from "./controllers/restaurant.controller";
import {RestaurantService} from "./services/restaurant.service";
import {Restaurant, RestaurantSchema} from "./entities/restaurant.entity";
import {Cuisine, CuisineSchema} from "./entities/cuisine.entity";
import {CuisineService} from "./services/cuisine.service";
import {CuisineRepository} from "./repositories/cuisine.repository";
import {RestaurantTransformer} from "./transformers/restaurant.transformer";

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantService, CuisineService, RestaurantTransformer, RestaurantRepository, CuisineRepository],
  imports: [
    CommonModule,
    ClsModule.register({
      interceptor: { generateId: true, mount: true },
    }),
    MongooseModule.forFeature(
      [
        {
          name: Restaurant.name,
          schema: RestaurantSchema,
          collection: Config.RESTAURANT_COLLECTION_NAME,
        },
        {
          name: Cuisine.name,
          schema: CuisineSchema,
          collection: Config.CUISINE_COLLECTION_NAME,
        },
      ],
      Config.DATABASE_CONNECTION_NAME
    ),
  ],
  exports: [
    RestaurantService,
    CuisineService,
    RestaurantTransformer,
  ]
})
export class RestaurantModule {}
