import { IsString, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  genre: string;

  @IsString()
  fullName: string;

  // @IsString()
  // image: string;

  @IsInt()
  @IsOptional()
  year?: number;

  @IsInt()
  numberPages: number;

  @IsString()
  publishing: string;

  @IsString()
  notes: string;

  @IsBoolean()
  read: boolean;

  @IsBoolean()
  buy: boolean;

  @IsInt()
  @IsOptional()
  userId?: number;

  @IsInt()
  @IsOptional()
  genreId?: number;

  @IsInt()
  @IsOptional()
  authorId?: number;

  @IsInt()
  @IsOptional()
  publishingId?: number;
}
