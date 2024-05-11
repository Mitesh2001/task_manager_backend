import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuid4 } from 'uuid';

const validFileExtensions: string[] = ['png', 'jpg', 'jpeg'];
const validMimeTypes: string[] = ['image/png', 'image/jpg', 'image/jpeg'];

export const saveImageToStorage: MulterOptions = {
  storage: diskStorage({
    destination: 'public/task_images',
    filename: (req, file, callback) => {
      const fileExtension: string = path.extname(file.originalname);
      const fileName = uuid4() + fileExtension;
      callback(null, fileName);
    },
  }),
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes: string[] = validMimeTypes;
    callback(
      { name: 'Bad Request', message: 'Invalid File!' },
      allowedMimeTypes.includes(file.mimetype),
    );
  },
};
