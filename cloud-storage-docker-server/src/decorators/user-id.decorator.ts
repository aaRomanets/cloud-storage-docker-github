import {createParamDecorator, ExecutionContext} from '@nestjs/common'

//функция определения идентификатора пользователя
export const UserId = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): any => {
        const request = ctx.switchToHttp().getRequest();
        return request.user?.id ? request.user.id : null;
    }
);