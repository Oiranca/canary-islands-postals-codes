import { searchCommunities } from '../searchCommunities';
import { searchCommunity } from '../../../../http/http';
import { COMMUNITIES } from '../../mocks/mocks';

jest.mock('../../../../http/http');
searchCommunity.mockImplementation(async () => COMMUNITIES);

jest.mock('../searchCommunities');

searchCommunities.mockImplementation(() => ['05']);

jest.mock('axios');
describe('search community number and his name', () => {
    test('return canarian community number into GEOAPI', async (done) => {
        const COMMUNITYCODE = ['05'];
        const searchCommunity = await searchCommunities();
        expect(searchCommunity).toEqual(COMMUNITYCODE);
        done();
    });
});
