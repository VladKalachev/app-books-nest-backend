import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PublishingService } from './publishing.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePublishingDto } from './dto/create-publishing.dto';
import { PUBLISHING_NOT_FOUND_ERROR } from './publishing.constants';

@ApiBearerAuth()
@ApiTags('Publishing')
@Controller('publishing')
export class PublishingController {
  constructor(private readonly publishingService: PublishingService) {}

  @Get()
  @ApiOperation({ summary: 'Получение всего списка Издательств' })
  async all() {
    return this.publishingService.all();
  }

  @Post('create')
  @ApiOperation({ summary: 'Добавление новое Издательство' })
  async create(@Body() dto: CreatePublishingDto) {
    return this.publishingService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение Издательства по id' })
  async one(@Param('id') id: number) {
    const author = await this.publishingService.findById(+id);
    if (!author) {
      throw new NotFoundException(PUBLISHING_NOT_FOUND_ERROR);
    }
    return author;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление Издательства по id' })
  async remove(@Param('id') id: number) {
    const deletedAuthor = await this.publishingService.deleteById(+id);
    if (!deletedAuthor) {
      throw new NotFoundException(PUBLISHING_NOT_FOUND_ERROR);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Редактирование Издательства по id' })
  async update(@Param('id') id: number, @Body() dto: CreatePublishingDto) {
    const updatedAuthor = await this.publishingService.updateById(+id, dto);
    if (!updatedAuthor) {
      throw new NotFoundException(PUBLISHING_NOT_FOUND_ERROR);
    }
    return updatedAuthor;
  }
}
