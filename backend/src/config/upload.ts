import path from 'path'; // tratar a variavel de ambiente nos diversos ambiemtes (so).
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp'); // pasta destino dos arquivos de img

interface IUploadConfig {
    driver: 's3' | 'disk';

    tmpFolder: string;
    uploadsFolder: string;

    multer: {
        storage: StorageEngine;
    };

    config: {
        disk: {};
        s3: {
            bucket: string;
        };
    };
}

export default {
    driver: process.env.STORAGE_DRIVER,

    tmpFolder,
    uploadsFolder: path.resolve(tmpFolder, 'uploads'),

    multer: {
        storage: multer.diskStorage({
            destination: tmpFolder,

            filename(request, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('HEX'); // string de criptografia em hexadecimal
                const fileName = `${fileHash}-${file.originalname}`; // nome final do arquivo de img

                return callback(null, fileName);
            },
        }),
    },

    config: {
        disk: {},
        s3: {
            bucket: 'ester-gobarber',
        },
    },
} as IUploadConfig;
