import { searchProvinces } from '../searchProvinces';
import { searchCommunities } from '../../communities/searchCommunities';
import { searchProvince } from '../../../../http/http';
import { PROVINCES } from '../../mocks/mocks';

jest.mock('../../../../http/http');

searchProvince.mockImplementation(async (communityCode) =>
    communityCode === '05' ? PROVINCES : undefined,
);

jest.mock('../../communities/searchCommunities');

searchCommunities.mockImplementation(() => ['05']);

describe('search provinces number and his name', () => {
    test('search provinces numbers into GEOAPI', async (done) => {
        const PROVINCESCODES = ['35', '38'];
        const province = await searchProvinces();
        expect(province).toEqual(expect.arrayContaining(PROVINCESCODES));
        done();
    });
});
