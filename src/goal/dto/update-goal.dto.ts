import { IsString, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class UpdateGoalDto {
  @IsString()
  title: string;

  @IsInt()
  @IsOptional()
  numberPages: number;

  @IsInt()
  currentPages: number;

  @IsBoolean()
  @IsOptional()
  completed: boolean;

  @IsInt()
  @IsOptional()
  bookId: number;

  @IsInt()
  @IsOptional()
  userId: number;
}
