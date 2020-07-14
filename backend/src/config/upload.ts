import path from 'path'; // tratar a variavel de ambiente nos diversos ambiemtes (so).
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp'); // pasta destino dos arquivos de img

export default {
    directory: tmpFolder,

    storage: multer.diskStorage({
        destination: tmpFolder,

        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('HEX'); // string de criptografia em hexadecimal
            const fileName = `${fileHash}-${file.originalname}`; // nome final do arquivo de img

            return callback(null, fileName);
        },
    }),
};
