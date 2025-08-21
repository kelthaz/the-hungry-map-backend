import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/domain/user/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { CreateUserUseCase } from 'src/core/use-cases/users/create-user.use-case';
import { GetUsersUseCase } from 'src/core/use-cases/users/get-users.use-case';
import { FindUserByEmailUseCase } from 'src/core/use-cases/users/find-by-email.use-case';
import { Role } from 'src/core/domain/role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Role])],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    {
      provide: CreateUserUseCase,
      useFactory: (userRepository: UserRepository) =>
        new CreateUserUseCase(userRepository),
      inject: [UserRepository],
    },
    {
      provide: GetUsersUseCase,
      useFactory: (userRepository: UserRepository) =>
        new GetUsersUseCase(userRepository),
      inject: [UserRepository],
    },
    {
      provide: FindUserByEmailUseCase,
      useFactory: (userRepository: UserRepository) =>
        new FindUserByEmailUseCase(userRepository),
      inject: [UserRepository],
    },
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}
