import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';

@Module({
  controllers: [GoalController],
  imports: [DatabaseModule],
  providers: [GoalService],
})
export class GoalModule {}
