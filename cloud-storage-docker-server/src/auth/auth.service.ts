import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserCreateDto } from 'src/users/dto/user-create.dto';
import { User } from 'src/users/entities/user.schema';
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        //сервис по данным пользователя
        private usersService: UsersService,
        //серфис по формированию токенов
        private jwtService: JwtService
    ) {}

    //функция проверки существования пользователя по email  и password
    async validateUser(email: string, password: string) : Promise<any> {
        //ищем пользователя по email в базе данных пользователей
        const user = await this.usersService.findByEmail(email) as any;

        //если пользователь найден то сравниваем его пароль с входным паролем
        if (user && user.password === password)
        {
            const {password, ...result} = user;
            //в случае успеха возвращаем искомый результат
            return result;
        }

        //в противном случае возвращается нулевой результат
        return null;
    }

    //функция регистрации нового пользователя
    async register(dto: UserCreateDto): Promise<User>
    {
        try
        {
            //проводим указанную регистрацию
            return await this.usersService.create(dto);
        } 
        catch (err)
        {
            console.log(err);
            throw new ForbiddenException('Ошибка при регистрации');
        }
    }

    //функция авторизации зарегистрированого пользователя
    //(тут идет связь с функцией JwtStrategy.validate )
    async login(user: any) 
    {
        return {
            //получаем токен авторизации зарегистрированного пользователя
            token: this.jwtService.sign({id: user._id})
        }
    }
}