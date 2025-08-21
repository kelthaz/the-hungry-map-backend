import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/core/domain/role/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository';
import { CreateRoleUseCase } from 'src/core/use-cases/roles/create-role.use-case';
// import { GetRolesUseCase } from 'src/core/use-cases/roles/get-roles.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [
    RoleService,
    RoleRepository,
    {
      provide: CreateRoleUseCase,
      useFactory: (roleRepository: RoleRepository) =>
        new CreateRoleUseCase(roleRepository),
      inject: [RoleRepository],
    },
    // {
    //   provide: GetRolesUseCase,
    //   useFactory: (roleRepository: RoleRepository) =>
    //     new GetUsersUseCase(userRepository),
    //   inject: [RoleRepository],
    // },
  ],
  exports: [RoleService, RoleRepository],
})
export class RoleModule {}
