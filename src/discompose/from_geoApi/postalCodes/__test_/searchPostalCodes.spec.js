import { searchPopulations } from '../../populations/searchPopulations';
import { searchPostalCodes } from '../searchPostalCodes';

import { searchPopulationPostalCode } from '../../../../http/http';
import {
    EXAMPLEPOPULATIONLASPALMAS,
    EXAMPLEPOSTALCODELASPALMAS,
} from '../../mocks/mocks';

jest.mock('../../populations/searchPopulations');

searchPopulations.mockImplementation(async (provincesCode, municipalityCode) => {
    if (provincesCode === '35' && municipalityCode === '001') {
        return EXAMPLEPOPULATIONLASPALMAS;
    }
});

jest.mock('../../../../http/http');

searchPopulationPostalCode.mockImplementation(
    (provinceCode, municipalityCode, populationCode) => {
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
        const arePostalCode = await searchPostalCodes();
        expect(arePostalCode).toEqual(expect.arrayContaining(EXAMPLEPOSTALCODELASPALMAS));
        done();
    });
});
