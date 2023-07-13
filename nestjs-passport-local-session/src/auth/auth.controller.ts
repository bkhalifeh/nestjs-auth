import {
    All,
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';

import { Response } from 'express';

import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalGuard } from './local.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('login')
    loginGet(@Res() res: Response) {
        res.render('login');
    }

    @UseGuards(LocalGuard)
    @Post('login')
    loginPost(@Res() res: Response) {
        res.redirect('/');
    }

    @Get('register')
    registerGet(@Res() res: Response) {
        res.render('register');
    }

    @Post('register')
    async registerPost(@Body() registerUserDto: RegisterUserDto) {
        return await this.authService.registerUser(registerUserDto);
    }

    @All('logout')
    async logoutGet(@Req() req, @Res() res: Response) {
        req.session.destroy();
        res.redirect('/auth/login');
    }
}
