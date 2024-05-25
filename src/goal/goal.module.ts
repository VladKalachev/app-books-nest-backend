import { Module } from '@nestjs/common';
import { TokenModule } from 'src/auth/token/token.module';
import { DatabaseModule } from 'src/database/database.module';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';

@Module({
  controllers: [GoalController],
  imports: [DatabaseModule, TokenModule],
  providers: [GoalService],
})
export class GoalModule {}
