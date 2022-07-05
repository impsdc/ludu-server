import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Store, StoreSchema } from 'src/schemas/store.schema';

@Module({
  providers: [UserService],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: User.name,
          schema: UserSchema,
        },
        {
          name: Store.name,
          schema: StoreSchema,
        },
      ],
      'mongo',
    ),
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
