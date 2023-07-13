import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './auth/auth.guard';
import { Request, Response } from 'express';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @UseGuards(AuthenticatedGuard)
    @Get()
    getHello(@Req() req: Request, @Res() res: Response) {
        res.render('index', { user: req.user });
    }
}
