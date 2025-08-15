import { User } from "src/core/domain/user.entity";

export interface UserRepositoryPort {
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
}