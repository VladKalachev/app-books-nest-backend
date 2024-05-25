import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { TokenModule } from 'src/auth/token/token.module';
import { MailModule } from 'src/auth/mail/mail.module';

@Module({
  controllers: [UserController],
  imports: [DatabaseModule, TokenModule, MailModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
