import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateComment {
  @IsString()
  @MaxLength(150)
  @MinLength(1)
  message: string;
}
