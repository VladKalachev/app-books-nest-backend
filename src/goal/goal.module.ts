import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from 'src/auth/token/token.module';
import { BookModule } from 'src/book/book.module';
import { DatabaseModule } from 'src/database/database.module';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';

@Module({
  controllers: [GoalController],
  imports: [DatabaseModule, TokenModule, JwtModule, ConfigModule, BookModule],
  providers: [GoalService],
})
export class GoalModule {}
