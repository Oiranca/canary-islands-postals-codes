/*
*
* lasPalmas.push({
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

De la búsqueda de los códigos postales podemos sacar el CPRO,CMUM,CUN,,CPOS
* Primero tenemos que filtrar por provincia para poder luego hacer un filtrado por CMUN y así no mezclar las dos.

Con el CUN podemos filtrar en poblaciones el NENTSI50

Con el CUM podemos filtar en municipios el DMUN50

* */
import { searchPostalCodes } from './postalCodes/searchPostalCodes';
import { searchPopulations } from './populations/searchPopulations';
import { searchMunicipalities } from './municipalities/searchMunicipalities';

const typeData = {
    province: '',
    municipality: '',
    municipality_code: '',
    population_code: '',
    population_name: '',
    postal_code: '',
};

const hasPostalCodes = [];

export const dataFromGeoApi = async () => {
    const isPostalCode = await searchPostalCodes();
    const isPopulation = await searchPopulations();
    const isMunicipality = await searchMunicipalities();
    hasPostalCodes.push(isPostalCode);
    return hasPostalCodes;
};
