import { searchPopulations } from '../populations/searchPopulations';
import { searchPopulationPostalCode } from '../../../http/http';

export const searchPostalCodes = async () => {
    const arePopulations = await searchPopulations().then((codesPopulation) =>
        codesPopulation?.map((codes) => [codes.CPRO, codes.CMUM, codes.CUN]),
    );
    const postalCodesData = async () => {
        let allPostalCodes = [];
        for (const codesToSite of arePopulations) {
            const zipCodes = await searchPopulationPostalCode(
                codesToSite[0],
                codesToSite[1],
                codesToSite[2],
            ).then((zipCode) => zipCode);
            zipCodes.map((postalCodesData) => allPostalCodes.push(postalCodesData));
        }
        return allPostalCodes;
    };
    return await postalCodesData();
};
