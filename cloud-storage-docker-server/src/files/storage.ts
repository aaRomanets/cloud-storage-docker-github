import { diskStorage} from 'multer';

//функция определения идентификатора файла
const generateId = () => Array(18).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');

//функция определения нового имени файла
const normalizeFileName = (__: any, file: any, callback: any) => {
    const fileExtName = file.originalname.split('.').pop();

    callback(null, `${generateId()}.${fileExtName}`);
};

////функция созданияфайла в папке проекта upload
export const fileStorage = diskStorage({
    destination: './uploads',
    filename: normalizeFileName
})