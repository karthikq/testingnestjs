import {
    IsArray,
    IsString,
  
    MaxLength,
 
    MinLength,
  } from 'class-validator';
  
  export class editPostDto {
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    title: string;
  
    @IsArray()
    images: string[];
  }
  