import {
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(200)
  desp: string;
}
