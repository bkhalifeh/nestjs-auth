import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import session from 'express-session';
import SQLiteStore from 'connect-sqlite3';
import passport from 'passport';

import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const SQLiteStoreInstance = SQLiteStore(session);

    const configService = app.get(ConfigService);

    app.setViewEngine('ejs');
    app.setBaseViewsDir(join(__dirname, '..', 'views'));

    app.use(
        session({
            secret: configService.get<string>('SECRET_SESSION'),
            resave: false,
            saveUninitialized: false,
            store: new SQLiteStoreInstance({
                db: configService.get<string>('DB_NAME'),
            }) as any,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 30,
            },
        }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

    await app.listen(3000);
}
bootstrap();
