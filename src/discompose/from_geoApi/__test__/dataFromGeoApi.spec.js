import {
    EXAMPLEPOPULATIONS,
    EXAMPLEPOSTALCODELASPALMAS,
    LAS_PALMAS,
} from '../mocks/mocks';
import { searchMunicipalities } from '../municipalities/searchMunicipalities';
import { searchPopulations } from '../populations/searchPopulations';
import { searchPostalCodes } from '../postalCodes/searchPostalCodes';

import { dataFromGeoApi } from '../dataFromGeoApi';

jest.mock('../municipalities/searchMunicipalities');
searchMunicipalities.mockImplementation(async () => LAS_PALMAS);

jest.mock('../populations/searchPopulations');
searchPopulations.mockImplementation(async () => EXAMPLEPOPULATIONS);

jest.mock('../postalCodes/searchPostalCodes');
searchPostalCodes.mockImplementation(async () => EXAMPLEPOSTALCODELASPALMAS);

describe('search postal codes into GEOAPI', () => {
    test('return data from GEOAPI', async (done) => {
        const DATAGEOAPI = {
            province: '35',
            municipality: 'AGAETE',
            municipality_code: '001',
            population_code: '0001701',
            population_name: 'AGAETE',
            postal_code: '35480',
        };

        const formDataFromGeoApi = await dataFromGeoApi();

        expect(formDataFromGeoApi).toContainEqual(DATAGEOAPI);
        done();
    });
});
