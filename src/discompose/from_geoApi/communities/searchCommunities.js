import { searchCommunity } from '../../../http/http';

export const searchCommunities = async () => {
    const communityCode = await searchCommunity().then((communityData) =>
        communityData.filter((communityName) => communityName.COM === 'CANARIAS'),
    );
    return communityCode.map((code) => code.CCOM);
};
