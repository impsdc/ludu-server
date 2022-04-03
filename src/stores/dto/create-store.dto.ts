import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly address: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly owner: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsOptional()
  readonly dateCreation: Date;
}
