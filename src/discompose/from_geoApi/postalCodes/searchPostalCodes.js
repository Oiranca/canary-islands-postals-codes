import { searchPopulations } from '../populations/searchPopulations';
import { searchPopulationPostalCode } from '../../../http/http';

// const arePopulations = async () => {
//     return await searchPopulations().then((codesPopulation) =>
//         codesPopulation.map((codes) => [codes.CPRO, codes.CMUM, codes.CUN]),
//     );
// };

export const searchPostalCodes = async () => {
    const arePopulations = searchPopulations().then((codesPopulation) =>
        codesPopulation?.map((codes) => [codes.CPRO, codes.CMUM, codes.CUN]),
    );
    const postalCodesData = async () => {
        let allPostalCodes = [];
        for (const codesToSite of await arePopulations) {
            const data = await searchPopulationPostalCode(
                codesToSite[0],
                codesToSite[1],
                codesToSite[2],
            ).then((zipCode) => zipCode);
            data?.map((postalCodesData) => allPostalCodes.push(...postalCodesData));
        }
        return allPostalCodes;
    };
    return await postalCodesData();
};
