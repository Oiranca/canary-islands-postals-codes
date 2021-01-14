import fs from "fs";
import {searchItems} from "../../http/http";

const canaryProvince = {provinces: []};
const canaryIsland = {islands: []};
const municipalitiesLasPalmas = {municipalities: []};
const municipalitiesTenerife = {municipalities: []};


const discomposeItemsIstacApi = async () => {

    const searchApiItems = await searchItems().then(data => data);

    extracted(searchApiItems);


};


const extracted = (apiItems) => {
    let itemsExist = [];

    apiItems.municipalities.map((items) => {

        if (!itemsExist.includes(items.province.code)) {
            itemsExist.push(items.province.code);
            canaryProvince.provinces.push({'code': items.province.code, 'name': items.province.name});

        } else if (!itemsExist.includes(items.island.code)) {
            itemsExist.push(items.island.code);
            canaryIsland.islands.push({'province_code':items.province.code,'code': items.island.code, 'name': items.island.name});

        }
        if (items.code.substring(0, 2) === '35') {
            municipalitiesLasPalmas.municipalities.push({
                'code': items.code,
                'name': items.name
            });
        } else if (items.code.substring(0, 2) === '38') {
            municipalitiesTenerife.municipalities.push({
                'code': items.code,
                'name': items.name
            });

        }
    });
    createdJSON();
}

const createdJSON = () => {
    let canaryProvinces = JSON.stringify(canaryProvince);
    let canaryIslands = JSON.stringify(canaryIsland);
    let municipalitiesProvinceLasPalmas = JSON.stringify(municipalitiesLasPalmas);
    let municipalitiesProvinceTenerife = JSON.stringify(municipalitiesTenerife);

    fs.writeFile('src/data/provinces/Provinces.json', canaryProvinces, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Data written to Provinces file');
        }
    })
    fs.writeFile('src/data/islands/Islands.json', canaryIslands, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Data written to Island file');
        }
    })
    fs.writeFile('src/data/municipalities/Municipalities_Las_Palmas.json', municipalitiesProvinceLasPalmas, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Data written to Municipalities_Las_Palmas file');
        }
    })
    fs.writeFile('src/data/municipalities/Municipalities_Tenerife.json', municipalitiesProvinceTenerife, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Data written to Municipalities_Tenerife file');
        }
    })
}

export default discomposeItemsIstacApi;