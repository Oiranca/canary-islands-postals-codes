import { geoApiMocks } from './mock-data/Geo_API_Mocks';
import {
    searchCommunities,
    searchMunicipalities,
    searchPopulations,
    searchProvinces,
} from '../src/discompose/from_geoApi/searchPostalCodeData';

describe('search community number and his name', () => {
    test('search canarian community number into GEOAPI', async (done) => {
        const searchCommunity = await searchCommunities();
        expect(searchCommunity).toContainEqual(geoApiMocks.COMMUNITY);
        done();
    });
    test('search provinces numbers into GEOAPI', async (done) => {
        const province = await searchProvinces();
        expect(province).toEqual(expect.arrayContaining(geoApiMocks.PROVINCES));
        done();
    });
    test('search las palmas mulicipality into GEOAPI', async (done) => {
        const municipality = await searchMunicipalities();
        expect(municipality).toContainEqual(
            expect.arrayContaining(geoApiMocks.MUNICIPALITY.TENERIFE),
        );
        expect(municipality).toContainEqual(
            expect.arrayContaining(geoApiMocks.MUNICIPALITY.LASPALMAS),
        );
        done();
    });

    test('search population into GEOAPI', async (done) => {
        const population = await searchPopulations();
        expect(population).toContainEqual(
            expect.objectContaining(...geoApiMocks.POPULATION),
        );
        done();
    });
});
