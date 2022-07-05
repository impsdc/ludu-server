import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Delete,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDocument, User } from 'src/schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/middlewares/jwt-auth.guard';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Get('')
  findAll(): Promise<UserDocument[]> {
    console.log('out');
    return this.userService.findAll();
  }

  @Get('/:id')
  findById(
    @Param('id')
    id: string,
  ): Promise<UserDocument> {
    return this.userService.findById(id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({ description: 'Success', type: User })
  update(
    @Param('id')
    id: string,
    @Body(new ValidationPipe({ transform: true }))
    locationDto: UserDto,
  ): Promise<UserDocument> {
    return this.userService.update(id, locationDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an user' })
  @ApiOkResponse({ description: 'Success', type: User })
  async remove(
    @Param('id')
    id: string,
  ): Promise<void> {
    await this.userService.remove(id);
  }
}
