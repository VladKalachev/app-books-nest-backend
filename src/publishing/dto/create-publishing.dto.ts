import { IsString } from 'class-validator';

export class CreatePublishingDto {
  @IsString()
  title: string;
}
