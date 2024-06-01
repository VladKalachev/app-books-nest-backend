import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { DatabaseModule } from 'src/database/database.module';
import { TokenModule } from './token/token.module';
import { ConfigModule } from '@nestjs/config';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    TokenModule,
    ConfigModule,
    TelegramModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
