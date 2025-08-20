import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers/users/user.controller';
import { UserService } from '../services/users/user.service';
import { CreateUserUseCase } from 'src/core/use-cases/users/create-user.use-case';
import { GetUsersUseCase } from 'src/core/use-cases/users/get-users.use-case';
import { UserRepository } from '../persistence/users/user.repository';
import { DatabaseModule } from '../persistence/database.module';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/core/domain/user/user.entity';
import { Role } from 'src/core/domain/role/role.entity';
import { RoleRepository } from '../persistence/roles/role.repository';
import { RoleService } from '../services/roles/role.service';
import { CreateRoleUseCase } from 'src/core/use-cases/roles/create-role.use-case';
import { RoleController } from '../controllers/roles/role.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([User, Role]),
  ],
  controllers: [UserController, RoleController],
  providers: [
    UserService,
    UserRepository,
    {
      provide: CreateUserUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new CreateUserUseCase(userRepository);
      },
      inject: [UserRepository],
    },
    {
      provide: GetUsersUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new GetUsersUseCase(userRepository);
      },
      inject: [UserRepository],
    },
    RoleRepository,
    RoleService,
    {
      provide: CreateRoleUseCase,
      useFactory: (roleRepository: RoleRepository) => {
        return new CreateRoleUseCase(roleRepository);
      },
      inject: [RoleRepository],
    },
  ],
})
export class AppModule {}
