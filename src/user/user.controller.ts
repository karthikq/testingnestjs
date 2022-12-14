import {
  Body,
  Controller,
  Patch,
  Post,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';
import { Serialize } from '../interceptors/transform.interceptor';

import { createUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('/:id')
  @UseGuards(JWTAuthGuard)
  updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Request() req: any,
  ) {
    return this.userService.updateUser(id, body, req.user);
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

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }
}
