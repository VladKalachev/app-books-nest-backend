import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PublishingService } from './publishing.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePublishingDto } from './dto/create-publishing.dto';
import { PUBLISHING_NOT_FOUND_ERROR } from './publishing.constants';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('Publishing')
@Controller('publishing')
export class PublishingController {
  constructor(private readonly publishingService: PublishingService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получение всего списка Издательств' })
  @ApiQuery({ name: 'search', required: false })
  async all(@Query('search') search?: string) {
    return this.publishingService.all(search);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @Post('create')
  @ApiOperation({ summary: 'Добавление новое Издательство' })
  async create(@Body() dto: CreatePublishingDto) {
    return this.publishingService.create(dto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получение Издательства по id' })
  async one(@Param('id') id: number) {
    const author = await this.publishingService.findById(+id);
    if (!author) {
      throw new NotFoundException(PUBLISHING_NOT_FOUND_ERROR);
    }
    return author;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Удаление Издательства по id' })
  async remove(@Param('id') id: number) {
    const deletedAuthor = await this.publishingService.deleteById(+id);
    if (!deletedAuthor) {
      throw new NotFoundException(PUBLISHING_NOT_FOUND_ERROR);
    }
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Редактирование Издательства по id' })
  async update(@Param('id') id: number, @Body() dto: CreatePublishingDto) {
    const updatedAuthor = await this.publishingService.updateById(+id, dto);
    if (!updatedAuthor) {
      throw new NotFoundException(PUBLISHING_NOT_FOUND_ERROR);
    }
    return updatedAuthor;
  }
}
