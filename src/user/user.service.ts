import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private prisma: DatabaseService) {}

  async all() {}

  async create() {}

  async remove() {}

  async one() {}

  async update() {}
}
