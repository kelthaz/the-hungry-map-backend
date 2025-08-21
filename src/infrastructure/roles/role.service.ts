import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from 'src/core/use-cases/users/create-user.use-case';
import { CreateRoleDto } from 'src/application/dtos/roles/create-role.dto';
import { CreateRoleUseCase } from 'src/core/use-cases/roles/create-role.use-case';
// import { GetUsersUseCase } from 'src/core/use-cases/users/get-users.use-case';
// import { CreateUserDto } from 'src/application/dtos/users/create-user.dto';
import { Role } from 'src/core/domain/role/role.entity';

@Injectable()
export class RoleService {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase,
    // private readonly getUsersUseCase: GetUsersUseCase,
  ) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = new Role(); // 👈 vacío
    role.name = createRoleDto.name;
    //   role.role = createRoleDto.role;

    return this.createRoleUseCase.execute(role);
  }

  //   async getRoles(): Promise<Role[]> {
  //     return this.getUsersUseCase.execute();
  //   }
}
