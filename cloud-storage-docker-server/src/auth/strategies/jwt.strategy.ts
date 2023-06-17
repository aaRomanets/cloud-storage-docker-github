import {ExtractJwt, Strategy} from 'passport-jwt'
import {PassportStrategy} from '@nestjs/passport'
import {Injectable, UnauthorizedException} from '@nestjs/common'
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UsersService
    ) {
        super ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'test123'    
        });
    }

    //эта функция учавствует в формировании токена авторизованного пользователя
    async validate(payload: {id: string}) 
    {
        const user = await this.userService.findById(payload.id) as any;

        if (!user)
        {
            throw new UnauthorizedException('У вас нет доступа.');
        }

        //возвращаем идентификатор авторизируемого зарегистированного пользователя 
        return  {
            id: user._id
        }
    }
}