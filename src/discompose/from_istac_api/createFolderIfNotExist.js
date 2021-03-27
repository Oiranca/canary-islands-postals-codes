import { FOLDER_PATH, POSTAL_CODE_FOLDER_NAME } from './constants';
import * as fs from 'fs';

export const createFolderIfNotExist = () => {
    const postalCodeFolderPath = `${FOLDER_PATH}/${POSTAL_CODE_FOLDER_NAME}`;

    if (!fs.existsSync(postalCodeFolderPath)) {
        fs.mkdirSync(postalCodeFolderPath);
    }
};
