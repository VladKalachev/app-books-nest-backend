import { IsString, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreateGoalDto {
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
  bookId: number;

  @IsInt()
  @IsOptional()
  userId: number;
}
