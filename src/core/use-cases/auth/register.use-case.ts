// src/core/use-cases/auth/register.use-case.ts
import { User } from 'src/core/domain/user/user.entity';
import { UserRepositoryPort } from 'src/application/ports/users/user.repository.port';

export class RegisterUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(userData: Partial<User>): Promise<User> {
    // Usamos create() del repo para instanciar la entidad
    const newUser = await this.userRepository.create(userData as User);
    return newUser;
  }
}
