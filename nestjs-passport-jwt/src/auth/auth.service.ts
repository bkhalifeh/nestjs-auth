import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

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

    async loginUser(
        loginUserDto: LoginUserDto,
    ): Promise<{ access_token: string }> {
        const user = await this.validateUser(
            loginUserDto.username,
            loginUserDto.password,
        );
        if (user) {
            return {
                access_token: this.jwtService.sign(user),
            };
        }
        throw new UnauthorizedException('Error! username or password wrong');
    }

    async registerUser(registerUserDto: RegisterUserDto) {
        const user = await this.usersService.findOne(registerUserDto.username);
        if (user) {
            throw new BadRequestException('Username exists');
        } else {
            const newUser = await this.usersService.insertUser(
                registerUserDto.username,
                registerUserDto.password,
            );
            return { ...newUser, message: 'succssful register.' };
        }
    }
}
