import dotEnv from 'dotenv';
import axios from 'axios';

dotEnv.config();

const searchCommunity = async () => {
    return await axios
        .get(
            `https://apiv1.geoapi.es/comunidades?JSON&key=${process.env.GEO_API}&sandbox=0`,
            { responseType: 'json' },
        )
        .then((response) => response.data.data);
};

const searchProvince = async (communityCode) => {
    return await axios
        .get(
            `https://apiv1.geoapi.es/provincias?CCOM=${communityCode}&type=JSON&key=${process.env.GEO_API}&sandbox=0`,
            { responseType: 'json' },
        )
        .then((response) => response.data.data);
};

const searchMunicipality = async (provinceCode) => {
    return await axios
        .get(
            `https://apiv1.geoapi.es/municipios?CPRO=${provinceCode}&type=JSON&key=${process.env.GEO_API}&sandbox=0`,
            { responseType: 'json' },
        )
        .then((response) => response.data.data);
};
const searchPopulation = async (provinceCode, municipalityCode) => {
    return await axios
        .get(
            `https://apiv1.geoapi.es/poblaciones?CPRO=${provinceCode}&CMUM=${municipalityCode}&type=JSON&key=${process.env.GEO_API}&sandbox=0`,
            { responseType: 'json' },
        )
        .then((response) => response.data.data);
};
const searchPopulationPostalCode = async (
    provinceCode,
    municipalityCode,
    populationCode,
) => {
    return await axios
        .get(
            `https://apiv1.geoapi.es/cps?CPRO=${provinceCode}&CMUM=${municipalityCode}&CUN=${populationCode}&type=JSON&key=${process.env.GEO_API}&sandbox=0`,
            { responseType: 'json' },
        )
        .then((response) => response.data.data);
};

const getMunicipalities = async () => {
    try {
        return await axios
            .get(
                `https://datos.canarias.es/api/estadisticas/callejero/v1.0/municipalities/~all?limit=800&offset=0&orderBy=code%20ASC`,
                { responseType: 'json' },
            )
            .then((response) => response.data.data)
            .then((data) => data.municipalities);
    } catch (e) {
        console.error(`Error retrieving municipalities (${e.statusCode})`, e);

        return getMunicipalities();
    }
};

export {
    searchCommunity,
    searchProvince,
    searchMunicipality,
    searchPopulation,
    searchPopulationPostalCode,
    getMunicipalities,
};
