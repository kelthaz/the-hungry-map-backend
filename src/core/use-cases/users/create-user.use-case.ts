import { UserRepositoryPort } from 'src/application/ports/users/user.repository.port';
import { User } from 'src/core/domain/user/user.entity';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(user: User): Promise<User> {
    return this.userRepository.create(user);
  }
}
