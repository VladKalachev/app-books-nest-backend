import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  async all() {}

  async create() {}

  async one() {}

  async remove() {}

  async update() {}
}
