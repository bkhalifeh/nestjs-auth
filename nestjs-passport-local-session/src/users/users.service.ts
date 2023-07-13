import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async findOne(username: string): Promise<User | null> {
        return await this.usersRepository.findOneBy({ username });
    }

    async insertUser(username: string, password: string): Promise<User> {
        const user = this.usersRepository.create({ username, password });
        return await this.usersRepository.save(user);
    }
}
