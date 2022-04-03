import { MaxLength, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;
}
