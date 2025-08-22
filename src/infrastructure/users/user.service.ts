import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserUseCase } from 'src/core/use-cases/users/create-user.use-case';
import { GetUsersUseCase } from 'src/core/use-cases/users/get-users.use-case';
import { FindUserByEmailUseCase } from 'src/core/use-cases/users/find-by-email.use-case';
import { User } from 'src/core/domain/user/user.entity';
import { CreateUserDto } from 'src/application/dtos/users/create-user.dto';
import { Repository } from 'typeorm';
import { Role } from 'src/core/domain/role/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,

    @InjectRepository(Role) // 👈 le dices a Nest que inyecte el repo de Role
    private readonly roleRepository: Repository<Role>, // Assuming you have a RoleRepository injected
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      if (
        !createUserDto.name ||
        !createUserDto.email ||
        !createUserDto.password
      ) {
        throw new BadRequestException('Faltan campos requeridos');
      }

      const user = new User();
      user.name = createUserDto.name;
      user.lastName = createUserDto.lastName;
      user.email = createUserDto.email;
      user.password = createUserDto.password;
      user.status = createUserDto.status;
      user.phone = createUserDto.phone;

      const role = new Role();
      role.id = Number(createUserDto.role);
      user.role = role;

      return await this.createUserUseCase.execute(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('El correo ya está en uso');
      }

      console.error('Error en createUser:', error);

      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async getUsers(): Promise<User[]> {
    return this.getUsersUseCase.execute();
  }

  async findByEmail(email: string): Promise<User | null> {
    // 👈 Se cambió el llamado al caso de uso inyectado
    return this.findUserByEmailUseCase.execute(email);
  }
}
