import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async validateUser(
        username: string,
        password: string,
    ): Promise<{ id: number; username: string } | null> {
        const user = await this.usersService.findOne(username);
        if (user && user.password == password) {
            return { id: user.id, username: user.username };
        }
        return null;
    }

    async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
        const user = await this.usersService.findOne(registerUserDto.username);
        if (user) {
            throw new BadRequestException('Username exists');
        } else {
            const newUser = await this.usersService.insertUser(
                registerUserDto.username,
                registerUserDto.password,
            );
            return newUser;
        }
    }
}
