import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/core/domain/user/user.entity';
import { UserRepositoryPort } from 'src/application/ports/users/user.repository.port';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(User)
    private readonly ormRepo: Repository<User>,
  ) {}

async create(user: User): Promise<User> {
  const entity = this.ormRepo.create(user);
  return await this.ormRepo.save(entity); // usa "entity"
}


  async findAll(): Promise<User[]> {
    return await this.ormRepo.find();
  }

 async findByEmail(email: string): Promise<User | null> {
    // Correcto: usa this.ormRepo y el método findOne
    const user = await this.ormRepo.findOne({
      where: { email: email },
    });
    return user; // findOne ya retorna null si no encuentra nada
  }
}
