import { Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/users/entities/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email'
        });
    }

    //функция проверки существования зарегистрированного пользователя по email и password
    async validate(email: string, password: string) : Promise<any> {
        //ищем указанного пользователя
        const user = await this.authService.validateUser(email, password) as User;

        if (!user) 
        {
            //не получилось найти пользователя
            throw new UnauthorizedException('Неверный логин или пароль');
        }

        //пользователь существует
        return user;
    }
}