import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuid4 } from 'uuid';
import { unlink } from 'fs';

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
    if (!allowedMimeTypes.includes(file.mimetype)) {
      callback(null, false);
    } else {
      callback(null, true);
    }
  },
};

export const removeFile = (filePath: string) => {
  try {
    unlink(filePath, (err) => {
      console.log(`${filePath} was deleted`);
    });
  } catch (error) {
    console.log('error', error.message);
  }
};
