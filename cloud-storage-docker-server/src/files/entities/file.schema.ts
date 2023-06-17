import {Schema, Prop, SchemaFactory} from "@nestjs/mongoose"
import {User} from "../../users/entities/user.schema";
import * as mongoose from "mongoose";
export type FileDocument = File & Document;

//типы файлов
export enum FileType {
    //фотографии
    PHOTOS = 'photos',
    //файлы в корзине
    TRASH = 'trash'
}

@Schema()
export class File {
    @Prop()
    fileName: string;
    @Prop()
    originalName: string;
    @Prop()
    size: number; 
    @Prop()
    mimetype: string;
    @Prop()
    deletedAt: Date; 
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    user: User
}
export const FileSchema = SchemaFactory.createForClass(File);