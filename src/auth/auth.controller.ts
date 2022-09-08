import {
  Controller,
  Body,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from '../interceptors/transform.interceptor';
import { userDto } from '../user/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { authDto } from './dto/auth-user.dto';
import { JWTAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@Serialize(userDto)
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signup(@Body() body: authDto) {
    return this.authService.singup(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signin(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JWTAuthGuard)
  @Get('/user')
  getUserProfile(@Request() req: any) {
    console.log(req.user);

    return req.user;
  }
}
