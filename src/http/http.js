import fetch from 'node-fetch';
import dotEnv from 'dotenv';
import axios from 'axios';

const getToAxios = (url) => {
    axios.get(url, { method: 'get', timeout: 12000 });
};

dotEnv.config();

const get = (url) => {
    return fetch(url, { method: 'GET' });
};

const searchItems = async () => {
    return await get(
        'https://datos.canarias.es/api/estadisticas/callejero/v1.0/municipalities?limit=400&offset=0&orderBy=code%20ASC',
    )
        .then((result) => result.json())
        .then((data) => data);
};

const searchPostalCode = async () => {
    //Filter by Admin_Code

    const where = encodeURIComponent(
        JSON.stringify({
            Admin_Code: 'CN',
        }),
    );
    return await fetch(
        `https://parseapi.back4app.com/classes/Spainpostalcode_Spain_Postal_Code?limit=2000&order=Admin_Name2&keys=Place_Name,Postal_Code,Admin_Name2,Admin_Name3&where=${where}`,
        {
            headers: {
                'X-Parse-Application-Id': process.env.APPLICATION_ID, // This is your app's application id
                'X-Parse-REST-API-Key': process.env.REST_API_Key, // This is your app's REST API key
            },
        },
    )
        .then((response) => response.json())
        .then((data) => data);
};
const searchCommunity = async () => {
    return await axios
        .get(
            `https://apiv1.geoapi.es/comunidades?JSON&key=${process.env.GEO_API}&sandbox=0`,
            { responseType: 'json' },
        )
        .then((response) => response.data);
};
// const searchCommunity = async () => {
//     return await get(
//         `https://apiv1.geoapi.es/comunidades?JSON&key=${process.env.GEO_API}&sandbox=0`,
//     )
//         .then((response) => response.json())
//         .then((community) => console.log(community.data));
// };

const searchProvince = async (communityCode) => {
    return await axios
        .get(
            `https://apiv1.geoapi.es/provincias?CCOM=${communityCode}&type=JSON&key=${process.env.GEO_API}&sandbox=0`,
            { responseType: 'json' },
        )
        .then((response) => response.data);
    // return await get(
    //     `https://apiv1.geoapi.es/provincias?CCOM=${communityCode}&type=JSON&key=${process.env.GEO_API}&sandbox=0`,
    // )
    //     .then((response) => response.json())
    //     .then((province) => province.data);
};
// const searchProvince = async (communityCode) => {
//     return await get(
//         `https://apiv1.geoapi.es/provincias?CCOM=${communityCode}&type=JSON&key=${process.env.GEO_API}&sandbox=0`,
//     )
//         .then((response) => response.json())
//         .then((province) => province.data);
// };

const searchMunicipality = async (provinceCode) => {
    return await axios
        .get(
            `https://apiv1.geoapi.es/municipios?CPRO=${provinceCode}&type=JSON&key=${process.env.GEO_API}&sandbox=0`,
            { responseType: 'json' },
        )
        .then((response) => response.data);
    // return await get(
    //     `https://apiv1.geoapi.es/municipios?CPRO=${provinceCode}&type=JSON&key=${process.env.GEO_API}&sandbox=0`,
    // )
    //     .then((response) => response.json())
    //     .then((municipality) => municipality.data);
};
// const searchMunicipality = async (provinceCode) => {
//     return await get(
//         `https://apiv1.geoapi.es/municipios?CPRO=${provinceCode}&type=JSON&key=${process.env.GEO_API}&sandbox=0`,
//     )
//         .then((response) => response.json())
//         .then((municipality) => municipality.data);
// };
const searchPopulation = async (provinceCode, municipalityCode) => {
    return await axios
        .get(
            `https://apiv1.geoapi.es/poblaciones?CPRO=${provinceCode}&CMUM=${municipalityCode}&type=JSON&key=${process.env.GEO_API}&sandbox=0`,
            { responseType: 'json' },
        )
        .then((response) => response.data);
    // return await get(
    //     `https://apiv1.geoapi.es/poblaciones?CPRO=${provinceCode}&CMUM=${municipalityCode}&type=JSON&key=${process.env.GEO_API}&sandbox=0`,
    // )
    //     .then((response) => response.json())
    //     .then((population) => population.data);
};
// const searchPopulation = async (provinceCode, municipalityCode) => {
//     return await get(
//         `https://apiv1.geoapi.es/poblaciones?CPRO=${provinceCode}&CMUM=${municipalityCode}&type=JSON&key=${process.env.GEO_API}&sandbox=0`,
//     )
//         .then((response) => response.json())
//         .then((population) => population.data);
// };
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
        .then((response) => response.data);
    // return await get(
    //     `https://apiv1.geoapi.es/cps?CPRO=${provinceCode}&CMUM=${municipalityCode}&CUN=${populationCode}&type=JSON&key=${process.env.GEO_API}&sandbox=0`,
    // )
    //     .then((response) => response.json())
    //     .then((population) => population.data);
};
// const searchPopulationPostalCode = async (
//     provinceCode,
//     municipalityCode,
//     populationCode,
// ) => {
//     return await get(
//         `https://apiv1.geoapi.es/cps?CPRO=${provinceCode}&CMUM=${municipalityCode}&CUN=${populationCode}&type=JSON&key=${process.env.GEO_API}&sandbox=0`,
//     )
//         .then((response) => response.json())
//         .then((population) => population.data);
// };
const getMunicipalities = async () => {
    try {
        return await axios
            .get(
                `https://datos.canarias.es/api/estadisticas/callejero/v1.0/municipalities/~all?limit=800&offset=0&orderBy=code%20ASC`,
                { responseType: 'json' },
            )
            .then((response) => response.data)
            .then((data) => data.municipalities);
    } catch (e) {
        console.error(`Error retrieving municipalities (${e.statusCode})`, e);

        return getMunicipalities();
    }
};

export {
    searchItems,
    searchPostalCode,
    searchCommunity,
    searchProvince,
    searchMunicipality,
    searchPopulation,
    searchPopulationPostalCode,
    getMunicipalities,
};
