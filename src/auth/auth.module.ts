import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '@nestjs/jwt';

import { JWtStratergy } from './stratergy/jwt.stratergy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStratergy } from './stratergy/local.stratergy';
import { GoogleStratergy } from './stratergy/google.stratergy';
import { FacebookStratergy } from './stratergy/facebook.stratergy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('JWT_SECRECT'),
          signOptions: { expiresIn: '24hr' },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule,
  ],

  controllers: [AuthController],
  providers: [
    AuthService,
    JWtStratergy,
    LocalStratergy,
    GoogleStratergy,
    FacebookStratergy,
  ],
})
export class AuthModule {}
