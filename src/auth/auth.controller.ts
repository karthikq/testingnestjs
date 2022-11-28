import {
  Controller,
  Body,
  Post,
  Get,
  Request,
  UseGuards,
  Req,
  Response,
} from '@nestjs/common';
import { Serialize } from '../interceptors/transform.interceptor';
import { userDto } from '../user/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { authDto } from './dto/auth-user.dto';
import { JWTAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { GoogleAuthGuard } from './google-auth.guard';
import { FacebookAuthGaurd } from './facebook-auth.guard';

@Controller('auth')
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
    return req.user;
  }
  @UseGuards(GoogleAuthGuard)
  @Get('/google/login')
  async googleLogin(@Request() req: any) {}

  @UseGuards(GoogleAuthGuard)
  @Get('/google/cb')
  async googleRedirect(@Request() req: any, @Response() res: any) {
    return this.authService.googleLogin(req.user, res);
  }

  @UseGuards(FacebookAuthGaurd)
  @Get('/facebook/login')
  async facebookLogin(@Request() req: any) {}

  @UseGuards(FacebookAuthGaurd)
  @Get('/facebook/redirect')
  async facebookRedirect(@Request() req: any, @Response() res: any) {
    return this.authService.facebookLogin(req.user, res);
  }
}
