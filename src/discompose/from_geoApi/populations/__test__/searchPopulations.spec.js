import { searchMunicipalities } from '../../municipalities/searchMunicipalities';
import { searchPopulations } from '../searchPopulations';
import { searchPopulation } from '../../../../http/http';
import { EXAMPLEPOPULATIONLASPALMAS, LAS_PALMAS, TENERIFE } from '../../mocks/mocks';
// Todo mirar como hacer recursiva para que me mire más de un valor
jest.mock('../../municipalities/searchMunicipalities');

searchMunicipalities.mockImplementation(async () => LAS_PALMAS || TENERIFE);

jest.mock('../../../../http/http');

searchPopulation.mockImplementation(async (provincesCode, municipalityCode) => {
    if (provincesCode === '35' && municipalityCode === '001') {
        return EXAMPLEPOPULATIONLASPALMAS;
    }
});

describe('search population number and his name', () => {
    test('return Las Palmas populations into GEOAPI', async (done) => {
        const POPULATION = {
            CPRO: '35',
            CMUM: '001',
            CUN: '0006999',
            NENTSI50: 'LLANOS (LOS)',
        };

        const populations = await searchPopulations();
        expect(populations).toContainEqual(POPULATION);
        done();
    });
});
