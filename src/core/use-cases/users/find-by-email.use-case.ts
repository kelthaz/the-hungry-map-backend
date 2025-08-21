import { UserRepositoryPort } from 'src/application/ports/users/user.repository.port';
import { User } from 'src/core/domain/user/user.entity';

export class FindUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
