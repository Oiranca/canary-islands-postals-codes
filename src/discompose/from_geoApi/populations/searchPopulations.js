import { searchMunicipalities } from '../municipalities/searchMunicipalities';
import { searchPopulation } from '../../../http/http';

export const searchPopulations = async () => {
    const isCodeMunicipality = await searchMunicipalities().then((municipality) =>
        municipality.map((code) => [code.CMUM, code.CPRO]),
    );

    const population = async () => {
        let populationItems = [];
        for (const codeMunicipality of isCodeMunicipality) {
            const municipalityPopulations = await searchPopulation(
                codeMunicipality[1],
                codeMunicipality[0],
            ).then((population) => population);

            municipalityPopulations?.map((population) =>
                populationItems.push(population),
            );
        }
        return populationItems;
    };
    return population();
};
