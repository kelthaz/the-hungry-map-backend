import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/core/domain/role/role.entity';
import { RoleRepositoryPort } from 'src/application/ports/roles/role.repository.port';

@Injectable()
export class RoleRepository implements RoleRepositoryPort {
  constructor(
    @InjectRepository(Role)
    private readonly ormRepo: Repository<Role>,
  ) {}

  async create(role: Role): Promise<Role> {
    return await this.ormRepo.save(role);
  }

  async findAll(): Promise<Role[]> {
    return await this.ormRepo.find();
  }
}
