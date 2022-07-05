import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  HttpException,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserDocument } from 'src/schemas/user.schema';
import { UserDto } from '../user/dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { SaveUserAvatar } from 'src/helpers/utils';
@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/local/register')
  async create(
    @Body(new ValidationPipe({ transform: true }))
    userDto: UserDto,
  ): Promise<UserDocument> {
    let user = await this.userService.findOneUsername(userDto.username);
    if (user)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Username already exist',
        },
        HttpStatus.FORBIDDEN,
      );
    user = await this.userService.findOneLocalEmail(
      userDto.credentials.local.email,
    );
    if (user)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Email already exist',
        },
        HttpStatus.FORBIDDEN,
      );
    userDto.avatar = await SaveUserAvatar(userDto.avatar);
    return this.authService.register(userDto);
  }

  @Post('/local/login')
  login(
    @Body(new ValidationPipe({ transform: true }))
    userLogin: LoginDto,
  ): Promise<boolean> {
    return this.authService.login(userLogin);
  }
}
