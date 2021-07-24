import {
    EXAMPLEPOPULATIONLASPALMAS,
    EXAMPLEPOSTALCODELASPALMAS,
    LAS_PALMAS,
    TENERIFE,
} from '../mocks/mocks';
const { dataFromGeoApi } = require('../dataFromGeoApi');
import { searchMunicipalities } from '../municipalities/searchMunicipalities';
import { searchPopulations } from '../populations/searchPopulations';
import { searchPostalCodes } from '../postalCodes/searchPostalCodes';

// jest.mock('.../municipalities/searchMunicipalities');
// searchMunicipalities.mockImplementation(async () => LAS_PALMAS || TENERIFE);
//
// jest.mock('../populations/searchPopulations');
// searchPopulations().mockImplementation(async () => EXAMPLEPOPULATIONLASPALMAS);

jest.mock('../postalCodes/searchPostalCodes');
searchPostalCodes().mockImplementation(async () => EXAMPLEPOSTALCODELASPALMAS);

describe('search postal codes into GEOAPI', () => {
    test('return data from GEOAPI', async (done) => {
        const DATAGEOAPI = [
            {
                province: '35', // Postal code
                municipality: 'AGAETE',
                municipality_code: '001', // Postal Code
                population_code: '0001701', // Population filtrando con el CUN
                population_name: 'AGAETE', //Municipality filtrando con el CMUM
                postal_code: '35480', //Postal Code
            },
        ];
        const formDataFromGeoApi = dataFromGeoApi();

        expect(formDataFromGeoApi).toEqual(expect.arrayContaining(DATAGEOAPI));
        done();
    });
});
