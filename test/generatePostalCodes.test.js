import POSTAL_CODES_MOCK from './mock-data/Canary_Postal_Codes.json';
import generateCanaryPostalCodes from '../src/discompose/from_istac_api/generateCanaryPostalCodes';

describe('Postal Codes generator', () => {
    it('Must Canary Postal Codes', async (done) => {
        const postalCodes = await generateCanaryPostalCodes();

        expect(postalCodes.sort()).toEqual(POSTAL_CODES_MOCK.sort());

        done();
    });
});
