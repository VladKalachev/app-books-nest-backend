import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FILE_REQUIRED } from './file.constants';
import { FileService } from './file.service';

@ApiBearerAuth()
@ApiTags('Files')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @ApiOperation({ summary: 'Загрузка файла' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Файл был успешно загружен.',
  })
  @ApiResponse({ status: 400, description: 'Требуется файл.' })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException(FILE_REQUIRED, HttpStatus.BAD_REQUEST);
    }

    const filePath = await this.fileService.uploadFile(file);
    return { filePath };
  }

  @Delete('delete/:fileName')
  @ApiOperation({ summary: 'Удаление файла' })
  @ApiResponse({
    status: 200,
    description: 'Файл успешно удален.',
  })
  @ApiResponse({ status: 404, description: 'Файл не найден.' })
  async deleteFile(@Param('fileName') fileName: string) {
    await this.fileService.deleteFile(fileName);

    return { message: 'Файл успешно удален.' };
  }
}
