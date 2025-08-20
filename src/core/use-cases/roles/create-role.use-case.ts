import { RoleRepositoryPort } from 'src/application/ports/roles/role.repository.port';
import { Role } from 'src/core/domain/role/role.entity';

export class CreateRoleUseCase {
  constructor(private readonly roleRepository: RoleRepositoryPort) {}

  async execute(role: Role): Promise<Role> {
    return this.roleRepository.create(role);
  }
}
