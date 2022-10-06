import { IsEmail, IsString, MinLength } from 'class-validator';

export class authDto {
  @IsString()
  username: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(5, { message: 'password is too short' })
  password: string;
}
