import { getMunicipalities } from '../../http/http';
import lasPalmas from '../../data/postal_codes/ProvinceLasPalmasMunicipality.json';
import tenerife from '../../data/postal_codes/ProvinceTenerifeMunicipality.json';
import { createFolderIfNotExist } from './createFolderIfNotExist';
import { formatString } from '../../formatDataName/formatDataName';
import { LA_GRACIOSA_POPULATION_ENTITIES } from './constants';

const formatAsOutput = (pc) => ({
    island: formatString(pc.island),
    population_name: formatString(pc.population_name),
    postal_code: pc.postal_code,
});

const addPopulationCode = (pc) => ({
    population_name: pc.population_name,
    code: `${pc.province}${pc.municipality_code}`,
    postal_code: pc.postal_code,
});

const generateCanaryPostalCodes = async () => {
    createFolderIfNotExist();

    const municipalities = await getMunicipalities();

    const addIslandName = (pc) => ({
        ...pc,
        island: municipalities.find((m) => m.code === pc.code).island.name,
    });

    const postalCodes = [...lasPalmas, ...tenerife]
        .map(addPopulationCode)
        .map(addIslandName)
        .map(formatAsOutput);

    return [...postalCodes, ...LA_GRACIOSA_POPULATION_ENTITIES].sort(
        (pc1, pc2) => pc1.postal_code - pc2.postal_code,
    );
};
export default generateCanaryPostalCodes;
