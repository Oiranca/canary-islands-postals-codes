import { searchMunicipalities } from '../searchMunicipalities';
import { searchProvinces } from '../../provinces/searchProvinces';
import { searchMunicipality } from '../../../../http/http';
import { LAS_PALMAS, TENERIFE } from '../../mocks/mocks';

jest.mock('../../../../http/http');

searchMunicipality.mockImplementation(async (code) =>
    code === '35' ? LAS_PALMAS : TENERIFE,
);

jest.mock('../../provinces/searchProvinces');

searchProvinces.mockImplementation(() => ['35', '38']);

describe('search municipality number and his name', () => {
    test('return las palmas municipalities into GEOAPI', async (done) => {
        const MUNICIPALITIES = [
            {
                CMUM: '006',
                CPRO: '35',
                CUN: '0000000',
                DMUN50: 'ARUCAS',
            },
        ];

        const municipality = await searchMunicipalities();
        expect(municipality).toEqual(expect.arrayContaining(MUNICIPALITIES));
        done();
    });
    test('return tenerife municipalities into GEOAPI', async (done) => {
        const MUNICIPALITIES = [
            {
                CMUM: '048',
                CPRO: '38',
                CUN: '0000000',
                DMUN50: 'VALVERDE',
            },
        ];

        const municipality = await searchMunicipalities();
        expect(municipality).toEqual(expect.arrayContaining(MUNICIPALITIES));
        done();
    });
});
