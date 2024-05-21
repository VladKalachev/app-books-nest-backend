import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { TokenModule } from 'src/auth/token/token.module';

@Module({
  controllers: [UserController],
  imports: [DatabaseModule, TokenModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
