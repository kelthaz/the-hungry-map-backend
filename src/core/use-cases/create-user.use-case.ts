import { UserRepositoryPort } from "src/application/ports/user.repository.port";
import { User } from "src/core/domain/user.entity";

export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepositoryPort) {}

    async execute(user:User): Promise<User> {
        return this.userRepository.create(user);
    }
}