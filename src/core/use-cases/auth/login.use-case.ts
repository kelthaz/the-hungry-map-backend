// src/core/use-cases/auth/login.use-case.ts
import { User } from 'src/core/domain/user/user.entity';

export class LoginUseCase {
  constructor(private readonly validateUser: (email: string, pass: string) => Promise<User | null>) {}

  async execute(email: string, password: string): Promise<User | null> {
    return await this.validateUser(email, password);
  }
}
