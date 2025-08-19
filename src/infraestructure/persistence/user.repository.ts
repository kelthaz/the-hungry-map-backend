import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/core/domain/user.entity';
import { UserRepositoryPort } from 'src/application/ports/user.repository.port';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(User)
    private readonly ormRepo: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return await this.ormRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.ormRepo.find();
  }
}
