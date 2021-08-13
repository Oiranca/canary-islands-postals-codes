import { searchMunicipalities } from './municipalities/searchMunicipalities';
import { searchPopulations } from './populations/searchPopulations';
import { searchPostalCodes } from './postalCodes/searchPostalCodes';

const getPopulations = async (values) => {
    let populations = [];
    await searchPopulations().then((population) =>
        population?.data.map((value) =>
            values.map((codes) => {
                if (codes.CPRO === value.CPRO && codes.CMUM === value.CMUM) {
                    populations.push({
                        province: codes.CPRO,
                        municipality: codes.DMUN50,
                        municipality_code: codes.CMUM,
                        population_code: value.CUN,
                        population_name: value.NENTSI50,
                    });
                }
                return populations;
            }),
        ),
    );
    return populations;
};

const getZipCodes = async (populationValue) => {
    let postalCodes = [];
    await searchPostalCodes().then((zipCodes) =>
        zipCodes?.data.map((value) =>
            populationValue.filter((codes) => {
                if (
                    codes.province === value.CPRO &&
                    codes.population_code === value.CUN
                ) {
                    postalCodes.push({
                        ...codes,
                        postal_code: value.CPOS,
                    });
                }
                return postalCodes;
            }),
        ),
    );
    return postalCodes;
};

export const dataFromGeoApi = async () => {
    return await searchMunicipalities()
        .then((municipality) => municipality?.data)
        .then(async (values) => {
            return await getPopulations(values);
        })
        .then(async (populationValue) => {
            return await getZipCodes(populationValue);
        });
};
