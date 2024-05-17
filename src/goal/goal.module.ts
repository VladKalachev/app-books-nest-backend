import { Module } from '@nestjs/common';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';

@Module({
  controllers: [GoalController],
  imports: [],
  providers: [GoalService],
})
export class GoalModule {}
