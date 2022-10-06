import {
  Body,
  Controller,
  Patch,
  Post,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';
import { Serialize } from '../interceptors/transform.interceptor';

import { createUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
@Serialize(userDto)
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('/:id')
  @UseGuards(JWTAuthGuard)
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(parseInt(id), body);
  }
  @Post('/')
  createUser(@Body() body: createUserDto) {
    return this.userService.createUser(body);
  }
  @UseGuards(JWTAuthGuard)
  @Get('/all')
  allUser() {
    return this.userService.getAllusers();
  }
  @UseGuards(JWTAuthGuard)
  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(parseInt(id));
  }
}
