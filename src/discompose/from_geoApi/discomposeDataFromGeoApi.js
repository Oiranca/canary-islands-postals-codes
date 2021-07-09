import {
    searchCommunity,
    searchMunicipality,
    searchPopulation,
    searchPopulationPostalCode,
    searchProvince,
} from '../../http/http';
import fs from 'fs';
import generateCanaryPostalCodes from '../from_istac_api/generateCanaryPostalCodes';

const searchCanariansCode = async () =>
    await searchCommunity().then((communityData) =>
        communityData.data.filter((communityName) => communityName.COM === 'CANARIAS'),
    );

const searchIntoGeoApi = async () => {
    let communityNumbers = [];
    let provinceNumber = [];
    let municipalityDataset = [];
    let postalDataset = [];
    let lasPalmas = [];
    let santaCruzDeTenerife = [];
    const populationZipcode = async (populationDatasets) => {
        const c = populationDatasets.map(async (code) => {
            const b = await searchPopulationPostalCode(
                code.CPRO,
                code.CMUM,
                code.CUN,
            ).then((items) => {
                const a = items.data
                    .map((zipcode) => {
                        if (zipcode.CPRO === '35') {
                            municipalityDataset.filter((cod) => {
                                if (cod.CMUM === zipcode.CMUM && cod.CPRO === '35') {
                                    lasPalmas.push({
                                        province: cod.CPRO,
                                        municipality: cod.DMUN50,
                                        municipality_code: cod.CMUM,
                                        population_code: zipcode.CUN,
                                        population_name: code.NENTSI50,
                                        postal_code: zipcode.CPOS,
                                    });
                                }
                            });
                            // createdJSON(lasPalmas);
                        } else if (zipcode.CPRO === '38') {
                            municipalityDataset.filter((cod) => {
                                if (cod.CMUM === zipcode.CMUM && cod.CPRO === '38') {
                                    santaCruzDeTenerife.push({
                                        province: cod.CPRO,
                                        municipality: cod.DMUN50,
                                        municipality_code: cod.CMUM,
                                        population_code: zipcode.CUN,
                                        population_name: code.NENTSI50,
                                        postal_code: zipcode.CPOS,
                                    });
                                }
                            });

                            return lasPalmas;
                        }
                    })
                    .then((d) => console.log(d));
                // return a;
            });
            // return b;
            await generateCanaryPostalCodes(b);
        });
    };

    const municipality = async (codes) => {
        postalDataset = await searchPopulation(codes.CPRO, codes.CMUM).then(
            (populationNumbers) => populationNumbers.data,
        );
        await populationZipcode(postalDataset);
    };

    try {
        communityNumbers = await searchCanariansCode();

        let numberToSearchProvinces = '';
        communityNumbers.map((communityCode) =>
            communityCode.COM === 'Canarias'.toUpperCase()
                ? (numberToSearchProvinces = communityCode.CCOM)
                : numberToSearchProvinces,
        );
        provinceNumber = await searchProvince(
            numberToSearchProvinces,
        ).then((provinceData) =>
            provinceData.data.map((provinceNumbers) => provinceNumbers),
        );

        provinceNumber.map(async (itemsProvincesNumber) => {
            municipalityDataset = await searchMunicipality(
                itemsProvincesNumber.CPRO,
            ).then((items) => {
                items.data.map((code) => municipality(code));
                return items.data;
            });
        });
    } catch (e) {
        console.log(e);
    }
    return lasPalmas;
};

const createdJSONTenerife = (tenerife) => {
    console.log(tenerife);
    fs.writeFile(
        'src/data/postal_codes/ProvinceTenerifeMunicipality.json',
        JSON.stringify(tenerife),
        (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Data written to Canary_Islands_Postal_Code file');
            }
        },
    );
};

export default searchIntoGeoApi;
