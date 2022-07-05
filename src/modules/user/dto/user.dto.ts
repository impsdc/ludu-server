import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ROLES } from 'src/schemas/user.schema';
import { StoreDocument } from 'src/schemas/store.schema';

import { OauthDto } from './oauth.dto';
import { LocalDto } from './local.dto';

interface ICredentials {
  local: LocalDto;
  oauth: OauthDto;
}

export class UserDto {
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty({
    example: 'Location 1',
    description: 'The name of the store',
  })
  @IsNotEmpty()
  @IsString()
  readonly role: [ROLES];

  @ApiProperty({
    example: 'popolito',
    description: 'Your nickname',
  })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  credentials: ICredentials;

  @ApiProperty({
    example: "User's phone number",
    description: '+33620202020',
  })
  @IsNotEmpty()
  @IsPhoneNumber('FR')
  phone: string;

  @ApiProperty({
    example: "User's adresse",
    description: '16 rue de beaumont, Montesson 78360',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  avatar: string;

  @ApiPropertyOptional({ description: 'Stores' })
  readonly stores: StoreDocument[];
}
