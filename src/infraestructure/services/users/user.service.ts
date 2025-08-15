import { Injectable } from "@nestjs/common";
import { CreateUserUseCase } from "src/core/use-cases/create-user.use-case";
import { GetUsersUseCase } from "src/core/use-cases/get-users.use-case";
import { User } from "src/core/domain/user.entity";
import { CreateUserDto } from "src/application/dtos/create-user.dto";

@Injectable()
export class UserService {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly getUsersUseCase: GetUsersUseCase
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = new User(createUserDto.id,createUserDto.email, createUserDto.name, createUserDto.password,
             new Date(),new Date(), createUserDto.status,)
        return this.createUserUseCase.execute(user);
    }

    async getUsers(): Promise<User[]> {
        return this.getUsersUseCase.execute();
    }
}