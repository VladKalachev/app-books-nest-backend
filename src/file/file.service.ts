import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createWriteStream, unlink } from 'fs';
import { join } from 'path';
import { Express } from 'express';
import { FILE_NOT_FOUND_ERROR, UPLOAD_FILE_ERROR } from './file.constants';

@Injectable()
export class FileService {
  private readonly uploadPath = './uploads';

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const filePath = join(this.uploadPath, file.originalname);
    const writeStream = createWriteStream(filePath);

    return new Promise((resolve, reject) => {
      writeStream.write(file.buffer);
      writeStream.end();
      writeStream.on('finish', () => resolve(filePath));
      writeStream.on('error', () => {
        reject(
          new HttpException(
            UPLOAD_FILE_ERROR,
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      });
    });
  }

  async deleteFile(fileName: string): Promise<void> {
    const filePath = join(this.uploadPath, fileName);

    return new Promise((resolve, reject) => {
      unlink(filePath, (err) => {
        if (err) {
          reject(new HttpException(FILE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND));
        } else {
          resolve();
        }
      });
    });
  }
}
