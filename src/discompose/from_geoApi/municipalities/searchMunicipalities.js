import { searchMunicipality } from '../../../http/http';
import { searchProvinces } from '../provinces/searchProvinces';

export const searchMunicipalities = async () => {
    let allMunicipalities = [];
    const provincesCodes = await searchProvinces();
    for (const code of provincesCodes) {
        const municipality = await searchMunicipality(code).then(
            (municipalities) => municipalities.data,
        );
        allMunicipalities.push(...municipality);
    }
    return allMunicipalities;
};
