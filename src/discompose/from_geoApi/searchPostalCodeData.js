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
        allMunicipalities.push(
            await searchMunicipality(code).then((municipalities) => municipalities.data),
        );
    }
    return allMunicipalities;
};

export const searchPopulations = async () => {
    const provincesCode = await isProvinceCode();

    const areMunicipalities = await searchMunicipalities().then((codes) => {
        let allMunicipalities = [];
        codes.map((eachMunicipalities) => allMunicipalities.push(...eachMunicipalities));
        return allMunicipalities;
    });

    const isaPopulation = async (eachProvincesCode, eachProvincesPopulation) => {
        let population = [];
        for (const codeMunicipality of eachProvincesPopulation) {
            const provincePopulations = await searchPopulation(
                eachProvincesCode,
                codeMunicipality.CMUM,
            ).then((population) => population.data);
            population.push(...provincePopulations);
        }
        return population;
    };

    const arePopulations = async () => {
        let allPopulation = [];

        for (const isCode of provincesCode) {
            const eachProvincesPopulation = areMunicipalities.filter(
                (populations) => populations.CPRO === isCode,
            );
            const eachPopulations = await isaPopulation(isCode, eachProvincesPopulation);

            allPopulation.push(...eachPopulations);
        }
        areMunicipalities.map(async (codeMunicipality) => {
            await searchPopulation(codeMunicipality.CPRO, codeMunicipality.CMUM).then(
                (population) => {
                    population.map((items) => {
                        allPopulation.push({
                            CPRO: items.CPRO,
                            CMUM: items.CMUM,
                            CUN: items.CUN,
                            NENTSI50: items.NENTSI50,
                        });
                    });
                },
            );
        });
        return allPopulation;
    };
    return arePopulations();
};
