import { IsString, IsEmail, MinLength, Matches } from 'class-validator';

export class createUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{3,}', '', {
    message:
      'Must contain at least one number and one uppercase and lowercase letter, and at least 3 or more characters',
  })
  @MinLength(3, { message: 'password is too short' })
  password: string;
}
