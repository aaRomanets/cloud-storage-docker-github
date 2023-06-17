import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  //запрос на нахождение полной информации про авторизированного пользователя
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  //связываемся с функцией JwtStrategy.validate, чтобы получить токен авторизированного пользователя
  getMe(@UserId() id: string) {
    //находим необходимую информацию по идентификатору авторизированного пользователя
    return this.usersService.findById(id);
  }
}