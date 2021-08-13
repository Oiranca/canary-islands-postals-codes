import { searchPopulations } from '../../populations/searchPopulations';
import { searchPostalCodes } from '../searchPostalCodes';

import { searchPopulationPostalCode } from '../../../../http/http';
import {
    EXAMPLEPOPULATIONLASPALMAS,
    EXAMPLEPOSTALCODELASPALMAS,
} from '../../mocks/mocks';

jest.mock('../../populations/searchPopulations');

searchPopulations.mockImplementation(async () => EXAMPLEPOPULATIONLASPALMAS);

jest.mock('../../../../http/http');

searchPopulationPostalCode.mockImplementation(
    async (provinceCode, municipalityCode, populationCode) => {
        if (
            provinceCode === '35' &&
            municipalityCode === '001' &&
            populationCode === '0001701'
        ) {
            return EXAMPLEPOSTALCODELASPALMAS;
        }
    },
);

describe('search postal codes into GEOAPI', () => {
    test('return postal codes', async (done) => {
        const POSTALCODE = [
            {
                CPRO: '35',
                CMUM: '001',
                CUN: '0001701',
                CPOS: '35480',
                CVIA: '00040',
            },
            {
                CPRO: '35',
                CMUM: '001',
                CUN: '0001701',
                CPOS: '35489',
                CVIA: '00420',
            },
        ];
        const arePostalCode = await searchPostalCodes();

        expect(arePostalCode).toEqual(expect.arrayContaining(POSTALCODE));
        done();
    });
});
