import * as fs from 'fs';
import {
    FOLDER_PATH,
    POSTAL_CODE_FOLDER_NAME,
} from '../src/discompose/from_istac_api/constants';
import { createFolderIfNotExist } from '../src/discompose/from_istac_api/createFolderIfNotExist';

const POSTAL_CODE_FOLDER_PATH = `${FOLDER_PATH}/${POSTAL_CODE_FOLDER_NAME}`;

test('Must create postal codes folder', () => {
    createFolderIfNotExist();

    expect(fs.existsSync(POSTAL_CODE_FOLDER_PATH)).toBeTruthy();
});
