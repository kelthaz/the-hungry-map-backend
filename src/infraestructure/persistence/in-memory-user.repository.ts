import { UserRepositoryPort } from "src/application/ports/user.repository.port";
import { User } from "src/core/domain/user.entity";

export class InMemoryUserRepository implements UserRepositoryPort {
    private users: User[] = [];

    async create(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }
}