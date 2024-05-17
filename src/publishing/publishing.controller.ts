import { Controller } from '@nestjs/common';
import { PublishingService } from './publishing.service';

@Controller('publishing')
export class PublishingController {
  constructor(private readonly publishinService: PublishingService) {}

  async all() {}

  async create() {}

  async one() {}

  async remove() {}

  async update() {}
}
