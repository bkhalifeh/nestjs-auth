import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async findOne(username: string) {
        return await this.usersRepository.findOneBy({ username });
    }

    async insertUser(username: string, password: string) {
        const user = this.usersRepository.create({ username, password });
        return await this.usersRepository.save(user);
    }
}
