import { IsString, IsEmail, MinLength, Matches } from 'class-validator';

export class createUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5, { message: 'password is too short' })
  password: string;

  url: string;
}
