import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('login')
    loginGet(@Res() res: Response) {
        res.render('login');
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    loginPost() {
        return 'Succssful Login';
    }

    @Get('register')
    registerGet(@Res() res: Response) {
        res.render('register');
    }

    @Post('register')
    async registerPost(@Body() registerUserDto: RegisterUserDto) {
        return await this.authService.registerUser(registerUserDto);
    }
}
