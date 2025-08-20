import { Role } from 'src/core/domain/role/role.entity';

export interface RoleRepositoryPort {
  create(user: Role): Promise<Role>;
  findAll(): Promise<Role[]>;
}
