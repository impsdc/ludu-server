import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { IsEmail } from 'class-validator';
import { Exclude, Transform } from 'class-transformer';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { hashPassword } from 'src/helpers/bcrypt';
import { isPasswordInvalid } from 'src/helpers/utils';

export enum ROLES {
  USER,
  SELLER,
  ADMIN,
}

export type UserDocument = User & Document;

export class Oauth {
  @Prop()
  token: string;

  @Prop()
  email: string;

  @Prop()
  name: string;
}

export class LocalAuth {
  @IsEmail()
  @Prop({ unique: false })
  email: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    select: false,
  })
  @Exclude()
  password: string;

  @Prop()
  emailVerified: string;
}

export class Credentials {
  @Prop({ type: LocalAuth })
  local: LocalAuth;

  @Prop({ type: Oauth })
  oauth: Oauth;
}

@Schema({ timestamps: true })
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ type: Credentials })
  credentials: Credentials;

  @Prop()
  role: [ROLES];

  @Prop({ required: true })
  phone: number;

  @Prop()
  avatar: string;

  @Prop()
  address: string;

  @Prop({ type: Types.ObjectId, ref: 'Store' })
  store: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (user.credentials.local.password) {
    // if (isPasswordInvalid(user.credentials.local.password))
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.BAD_REQUEST,
    //       error: 'password:invalid:min(8)|required(upper,lower,number)',
    //     },
    //     HttpStatus.BAD_REQUEST,
    //   );

    this.credentials.local.password = hashPassword(
      this.credentials.local.password,
    );
  }
  next();
});
