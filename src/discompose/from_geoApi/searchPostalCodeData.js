import {
    searchCommunity,
    searchMunicipality,
    searchPopulation,
    searchProvince,
} from '../../http/http';

export const searchCommunities = async () => {
    return await searchCommunity().then((communityData) =>
        communityData.data.filter((communityName) => communityName.COM === 'CANARIAS'),
    );
};

export const searchProvinces = async () => {
    const communityData = await searchCommunities().then((number) =>
        number.map((communityNumber) => communityNumber.CCOM),
    );
    return await searchProvince(...communityData).then((provinces) => provinces.data);
};

const isProvinceCode = async () => {
    return await searchProvinces().then((provinceNumber) =>
        provinceNumber.map((number) => number.CPRO),
    );
};

export const searchMunicipalities = async () => {
    let allMunicipalities = [];
    const provincesCodes = await isProvinceCode();
    for (const code of provincesCodes) {
        const municipality = await searchMunicipality(code).then(
            (municipalities) => municipalities.data,
        );
        allMunicipalities.push(...municipality);
    }
    return allMunicipalities;
};

export const searchPopulations = async () => {
    const provincesCode = await isProvinceCode();

    const municipalitiesEachProvinces = await searchMunicipalities().then(
        (codes) => codes,
    );

    const populationEachMunicipality = async (provinceCode, municipalities) => {
        let populations = [];
        for (const codeMunicipality of municipalities) {
            const municipalityPopulations = await searchPopulation(
                provinceCode,
                codeMunicipality.CMUM,
            ).then((population) => population.data);
            populations.push(...municipalityPopulations);
        }
        return populations;
    };

    const allMunicipalityPopulations = async () => {
        let allPopulations = [];

        for (const isCodeProvinces of provincesCode) {
            const provincesMunicipalities = municipalitiesEachProvinces.filter(
                (provinceCode) => provinceCode.CPRO === isCodeProvinces,
            );
            const eachPopulations = await populationEachMunicipality(
                isCodeProvinces,
                provincesMunicipalities,
            );

            allPopulations.push(...eachPopulations);
        }

        return allPopulations;
    };
    return allMunicipalityPopulations();
};
