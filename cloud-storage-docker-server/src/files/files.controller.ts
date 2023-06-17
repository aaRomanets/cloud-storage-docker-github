import { 
  Controller, 
  ParseFilePipe, 
  Post, 
  Get,
  UploadedFile, 
  UseInterceptors,
  MaxFileSizeValidator,
  UseGuards,
  Query,
  Delete
} from '@nestjs/common';
import { FilesService } from './files.service';
import {ApiBearerAuth, ApiConsumes, ApiTags, ApiBody} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
//вытаскиваем функцию сохранения файла в папку upload
import { fileStorage } from './storage';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
//определяем идентификатор авторизованного пользователя
import { UserId } from '../decorators/user-id.decorator';
//вытаскиваем типы файлов
import { FileType } from './entities/file.schema';

@Controller('files')
@ApiTags('files')
////проверка авторизации пользователя
@UseGuards(JwtAuthGuard)
////тут хранится информация о токене авторизованного пользователя
@ApiBearerAuth()
export class FilesController {
  constructor(
    private readonly filesService: FilesService
  ) {}

  //запрос на получение файлов, загруженных с диска авторизованным пользователем
  @Get()
  findAll(
    //идентификатор авторизованного пользователя
    @UserId() userId: any, 
    //тип файла
    @Query("type") fileType: FileType
  ) {
    //получаем файлы, загруженные с диска авторизованным пользователем
    return this.filesService.findAll(userId, fileType);
  }

  //запрос на добавление в базу данных полной информации о новом файле, загруженном с диска
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      //функция созранения файла в папке проекта
      storage: fileStorage
    })
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  create(@UploadedFile(
    new ParseFilePipe({
      //файл, загружаемый авторизованным пользователем, должен весить не более пяти мегабайт
      validators: [ new MaxFileSizeValidator ({ maxSize: 1024*1024*5})]
    })
  ) 
    //информация о новом файле авторизованного пользователя
    file: Express.Multer.File,
    //идентификатор авторизованного пользователя
    @UserId() userId: any,
  ) {
    //добавляем в базу данных полную информацию о файле, который загружен с диска авторизованным пользователем
    return this.filesService.create(file, userId);
  }

  //запрос на помещение определенной группы файлов авторизованного пользователя в корзину
  @Delete()
  remove
    //последовательность идентификаторов файлов, которые нужно поместить в корзину
    (@Query('ids') ids: string
  ) {
    //помещаем определенную группу файлов авторизованного пользователя в корзину
    return this.filesService.remove(ids);
  }
}
