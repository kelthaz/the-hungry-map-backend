// src/infrastructure/features/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/user.service';
import { User } from 'src/core/domain/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    console.log('Validating user:', email, password);
    const user = await this.userService.findByEmail(email);
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };
    console.log('Generating JWT for user:', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

// async register(userData: Partial<User>) {
//     if (!userData.password || !userData.name || !userData.email) {
//         throw new BadRequestException('All required fields must be provided.');
//     }

//     const passwordString = userData.password as string;
//     const hashedPass = await bcrypt.hash(passwordString, 10);

//     // Se utiliza un cast para decirle a TypeScript que, después de la validación, el objeto cumple con el tipo
//     const createUserDto: CreateUserDto = { 
//       ...userData, 
//       password: hashedPass 
//     } as CreateUserDto;

//     return this.userService.createUser(createUserDto);
// }
}
