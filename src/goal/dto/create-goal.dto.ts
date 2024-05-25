import { IsString, IsInt, IsBoolean } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  title: string;

  @IsInt()
  numberPages: number;

  @IsInt()
  currentPages: number;

  @IsBoolean()
  completed: boolean;

  @IsInt()
  bookId: number;

  @IsInt()
  userId: number;
}
