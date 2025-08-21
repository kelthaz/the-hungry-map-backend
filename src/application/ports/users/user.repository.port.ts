import { User } from "src/core/domain/user/user.entity";

export interface UserRepositoryPort {
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
}