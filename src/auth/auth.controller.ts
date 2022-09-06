import { Controller, Body, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signup(@Body() body: authDto) {
    return this.authService.singup(body);
  }
}
