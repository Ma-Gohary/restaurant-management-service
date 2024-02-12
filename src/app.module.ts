import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {CommonModule} from './common/common.module';
import {Config} from './common/configs/config';
import {HealthModule} from './health/health.module';
import {UserModule} from './user/user.module';
import {RestaurantModule} from './restaurant/restaurant.module';

@Module({
  imports: [
    MongooseModule.forRoot(Config.DATABASE_CONNECTION, {
      dbName: Config.DATABASE_NAME,
      connectionName: Config.DATABASE_CONNECTION_NAME,
      maxPoolSize: 200,
    }),
    UserModule,
    RestaurantModule,
    CommonModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
