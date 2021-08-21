import { searchProvince } from '../../../http/http';
import { searchCommunities } from '../communities/searchCommunities';

export const searchProvinces = async () => {
    const communityData = await searchCommunities();
    return await searchProvince(...communityData)
        .then((provinces) => provinces)
        .then((provinceNumber) => provinceNumber.map((number) => number.CPRO));
};
