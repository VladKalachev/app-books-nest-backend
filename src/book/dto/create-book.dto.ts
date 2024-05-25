import { IsString, IsInt, IsBoolean } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  genre: string;

  @IsString()
  fullName: string;

  @IsString()
  image: string;

  @IsInt()
  year: number;

  @IsInt()
  numberPages: number;

  @IsBoolean()
  publishing: boolean;

  @IsString()
  notes: string;

  @IsBoolean()
  read: boolean;

  @IsBoolean()
  buy: boolean;

  @IsInt()
  userId: number;

  @IsInt()
  genreId: number;

  @IsInt()
  authorId: number;

  @IsInt()
  publishingId: number;
}
