import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/all')
  getUsers() {}

  @Post('/')
  createUser(@Body() body: createUserDto) {
    return this.userService.createUser(body);
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    console.log(id);
  }
}
