import {Module} from '@nestjs/common';
import {CommonModule} from '../common/common.module';
import {ClsModule} from 'nestjs-cls';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from './entities/user.entity';
import {Config} from 'src/common/configs/config';
import {UserRepository} from "./repositories/user.repository";
import {UserService} from "./services/user.service";
import {UserController} from "./controllers/user.controller";
import {RestaurantModule} from "../restaurant/restaurant.module";
import {UserTransformer} from "./transformers/user.transformer";

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserTransformer,
    UserRepository,
  ],
  imports: [
    CommonModule,
    RestaurantModule,
    ClsModule.register({
      interceptor: { generateId: true, mount: true },
    }),
    MongooseModule.forFeature(
      [
        {
          name: User.name,
          schema: UserSchema,
          collection: Config.USER_COLLECTION_NAME,
        },
      ],
      Config.DATABASE_CONNECTION_NAME
    ),
  ],
})
export class UserModule {}
