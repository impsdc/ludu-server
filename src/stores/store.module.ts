import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema, Store } from './schemas/store.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Store.name, schema: CustomerSchema },
    ]),
  ],
  providers: [StoreService],
  controllers: [StoreController],
})
export class StoreModule {}
