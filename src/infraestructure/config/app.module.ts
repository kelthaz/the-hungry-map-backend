import { Module } from '@nestjs/common';
import { UserController } from '../controllers/users/user.controller';
import { UserService } from '../services/users/user.service';
import { CreateUserUseCase } from 'src/core/use-cases/create-user.use-case';
import { GetUsersUseCase } from 'src/core/use-cases/get-users.use-case';
import { InMemoryUserRepository } from '../persistence/in-memory-user.repository';
import { User } from 'src/core/domain/user.entity';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, InMemoryUserRepository,{
    provide: CreateUserUseCase,
    useFactory: (userRepository: InMemoryUserRepository) => {
      return new CreateUserUseCase(userRepository);
    },
    inject: [InMemoryUserRepository],
  }, {
    provide: GetUsersUseCase,
    useFactory: (userRepository: InMemoryUserRepository) => {
      return new GetUsersUseCase(userRepository);
    },
    inject: [InMemoryUserRepository],
  }],
})
export class AppModule {}
