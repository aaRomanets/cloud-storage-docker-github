import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {File, FileDocument, FileType} from "./entities/file.schema";

@Injectable()
//класс операций с файлами
export class FilesService {
  constructor(
    @InjectModel(File.name) private fileModel: Model<FileDocument>
  ) {}

  //функция получения файлов пользователя с идентификатором userId
  async findAll(userId: any, fileType: FileType) :Promise<File[]> 
  {
    let files = await this.fileModel.find({user: userId});
    let remainFiles = files.filter((file) => file.deletedAt == null); 

    if (fileType === FileType.TRASH) 
    {
      let filesDelete = files.filter((file) => file.deletedAt !== null);
      return filesDelete;
    }
    else if (fileType === FileType.PHOTOS)
    {
      let imagesFiles = remainFiles.filter((file) => file.mimetype.includes("image/"));
      return imagesFiles;
    }
    else
    {
      return remainFiles;
    }
  }

  //в базу данных отправляем информацию о новом созданном файле
  create(file: Express.Multer.File, userId: any)
  {
    const newFile = new this.fileModel({
      //сформированное имя файла
      fileName: file.filename,
      //первоначальное имя файла
      originalName: file.originalname,
      //размер файла
      size: file.size,
      //тип файла (текстовый или пиксельный)
      mimetype: file.mimetype,
      deletedAt: null, 
      //идентификатор пользователя, который загрузил этот файл с диска
      user: userId
    });

    return newFile.save();
  }

  //функция помещения в козину серии файлов пользоватяля с идентификатором userId
  async remove(ids: string) 
  {
    //выделяем идентификаторы файлов, которые нужно поместить в корзину
    const idsArray = ids.split(',');

    //помещаем файлы в корзину
    for (let i = 0; i < idsArray.length; i++)
    {
      const newTime = new Date();
      await this.fileModel.findOneAndUpdate({_id: idsArray[i]},{deletedAt: newTime});
    } 
    return [];
  }
}