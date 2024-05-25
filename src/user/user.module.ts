import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { TokenModule } from 'src/auth/token/token.module';
import { MailModule } from 'src/auth/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UserController],
  imports: [DatabaseModule, TokenModule, MailModule, JwtModule, ConfigModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
