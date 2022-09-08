import {
  Body,
  Controller,
  Patch,
  Post,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
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
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(parseInt(id), body);
  }
  @Post('/')
  createUser(@Body() body: createUserDto) {
    return this.userService.createUser(body);
  }
  @Get('/all')
  allUser() {
    return this.userService.getAllusers();
  }
  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(parseInt(id));
  }
}
