import {Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "./entities/user.schema";
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  //функция определения данных по автоизованному пользователю на основании вводимой электронной почты email
  async findByEmail(email: string) {
    return this.userModel.findOne({email: email});
  }

  //функция определения данных по автоизованному пользователю на основании вводимого идентификатора id
  async findById(id: string) {
    return this.userModel.findOne({_id: id})    
  }

  //функция добавления в базу данных информации о новом зарегистрированном пользователе
  async create(userCreateDto: UserCreateDto):Promise<User>
  { 
    let userExist = await this.userModel.findOne({email: userCreateDto.email}) ;
    
    //существующего пользователя удаляем из базы данных        
    if (userExist != null)
    {
      await this.userModel.deleteOne({email: userCreateDto.email});
    }

    //проводим указанную регистрацию
    const newUser = new this.userModel(userCreateDto);
    return await newUser.save();
  }
}
