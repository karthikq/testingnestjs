import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class authDto {
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  username: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(2, { message: 'password is too short' })
  password: string;

  @IsString()
  url: string;

  id: string;
}
