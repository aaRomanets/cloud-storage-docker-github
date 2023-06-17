import { IsNotEmpty } from "class-validator";

//шаблон данных по пользователю
export class UserCreateDto {    
    //электронная почта пользователя
    @IsNotEmpty()
    email: string;

    //полное имя пользователя
    @IsNotEmpty()
    fullName: string;

    //пароль пользователя
    @IsNotEmpty()
    password: string;
}
