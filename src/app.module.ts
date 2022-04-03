import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreModule } from './stores/store.module';
import { LocationModule } from './locations/location.module';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    StoreModule,
    LocationModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
