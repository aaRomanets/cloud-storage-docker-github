import { Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import { ApiBody} from '@nestjs/swagger';
import { UserCreateDto} from '../users/dto/user-create.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    //проверяем существует ли зарегистрированный пользователь, которого нужно авторизовать 
    //(при этом связываемся с функцией LocalStrategy.validate) 
    @UseGuards(LocalAuthGuard)
    //проводим запрос на авторизацию зарегистрированного пользователя
    @Post('/login')
    //задаем шаблон входных данных по авторизации зарегистрированного пользователя 
    @ApiBody({type: UserCreateDto})
    login(@Request() req: any) 
    {
        //проводим требуемую авторизацию
        return this.authService.login(req.user._doc);
    }

    //запрос на регистрацию нового пользователя
    @Post('/register')
    register(@Body() dto: UserCreateDto) {
        //проводим требуемую регистрацию
        return this.authService.register(dto);
    }
}