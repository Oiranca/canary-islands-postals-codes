import {
    searchCommunity,
    searchMunicipality,
    searchPopulation,
    searchPopulationPostalCode,
    searchProvince,
} from '../../http/http';
import fs from 'fs';

let communityNumbers = [];
let provinceNumber = [];
let municipalityDataset = [];
let postalDataset = [];
let lasPalmas = [];
let santaCruzDeTenerife = [];

const searchIntoGeoApi = async () => {
    const populationZipcode = async (populationDatasets) => {
        populationDatasets.map(async (code) => {
            await searchPopulationPostalCode(code.CPRO, code.CMUM, code.CUN).then(
                (items) => {
                    items.data.map((zipcode) => {
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

                            // createdJSONT(santaCruzDeTenerife,lasPalmas);
                        }
                    });
                },
            );
        });
    };

    const municipality = async (codes) => {
        postalDataset = await searchPopulation(codes.CPRO, codes.CMUM).then(
            (populationNumbers) => populationNumbers.data,
        );
        await populationZipcode(postalDataset);
    };

    try {
        communityNumbers = await searchCommunity().then((communityData) =>
            communityData.data.map((communityCode) => communityCode),
        );

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
