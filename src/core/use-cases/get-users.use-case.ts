import { UserRepositoryPort } from "src/application/ports/user.repository.port";
import { User } from "src/core/domain/user.entity";

export class GetUsersUseCase {
    constructor(private readonly userRepository: UserRepositoryPort) {}

    async execute(): Promise<User[]> {
        return this.userRepository.findAll();
    }
}