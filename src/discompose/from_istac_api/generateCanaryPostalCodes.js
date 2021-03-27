import { getMunicipalities } from '../../http/http';
import lasPalmas from '../../data/postal_codes/ProvinceLasPalmasMunicipality.json';
import tenerife from '../../data/postal_codes/ProvinceTenerifeMunicipality.json';
import { createFolderIfNotExist } from './createFolderIfNotExist';

const populizeWithIslandName = (m) =>
    m.populationentities.map((p) => ({
        ...p,
        island: m.island.name,
    }));

const formatAsPostalCodes = (pc) => ({
    population_name: pc.population_name,
    postal_code: pc.postal_code,
});

const generateCanaryPostalCodes = async () => {
    createFolderIfNotExist();

    const LAS_PALMAS_POSTAL_CODES = lasPalmas.map(formatAsPostalCodes);
    const TENERIFE_POSTAL_CODES = tenerife.map(formatAsPostalCodes);

    const formatAsOutput = (m) => ({
        island: m.island,
        population_name: m.name,
        postal_code: [...LAS_PALMAS_POSTAL_CODES, ...TENERIFE_POSTAL_CODES].find(
            (pc) => pc.population_name === m.name,
        )?.postal_code,
    });

    const municipalitiesRaw = await getMunicipalities();

    const municipalities = municipalitiesRaw
        .map(populizeWithIslandName)
        .flat()
        .map(formatAsOutput)
        .filter((m) => m.postal_code && m.population_name !== 'GRACIOSA (LA)');

    municipalities.push({
        island: 'GRACIOSA (LA)',
        postal_code: 35540,
        population_name: 'CALETA DE SEBO',
    });

    municipalities.push({
        island_name: 'GRACIOSA (LA)',
        postal_code: 35540,
        population_name: 'PEDRO BARBA',
    });

    return municipalities;
};
export default generateCanaryPostalCodes;
