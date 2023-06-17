import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { JwtModule} from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return {
        //секретное слово токена авторизованного пользователя
        secret: 'test123',
        signOptions: {
          //время жизни токена авторизованного пользователя
          expiresIn: '30d'
        }
      }
    }
  }), 
  UsersModule, 
  PassportModule
],
  providers: [AuthService , LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
