import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers/users/user.controller';
import { UserService } from '../services/users/user.service';
import { CreateUserUseCase } from 'src/core/use-cases/create-user.use-case';
import { GetUsersUseCase } from 'src/core/use-cases/get-users.use-case';
import { User } from 'src/core/domain/user.entity';
import { UserRepository } from '../persistence/user.repository';
import { DatabaseModule } from '../persistence/database.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
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
  ],
})
export class AppModule {}
