import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"

export type UserDocument = User & Document;

@Schema()
//схема базы данных по пользователю
export class User {
    //электронная почта пользователя
    @Prop({required: true})
    email: string;

    //полное имя пользователя
    @Prop({required: true})
    fullName: string;

    //пароль пользователя
    @Prop({required: true})
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);