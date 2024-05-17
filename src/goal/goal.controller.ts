import { Controller } from '@nestjs/common';
import { GoalService } from './goal.service';

@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  async all() {}

  async create() {}

  async one() {}

  async remove() {}

  async update() {}
}
