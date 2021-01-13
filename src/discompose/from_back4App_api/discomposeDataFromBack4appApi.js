import {searchItems, searchPostalCode} from "../../http/http";
import fs from 'fs';


const Las_Palmas = {entries: []};
const Tenerife = {entries: []};


const discomposeItemsBack4appApi = async () => {

    const searchApiItems = await searchPostalCode().then(data => data);
    extracted(searchApiItems);


};


const extracted = (searchApiItems) => {
    searchApiItems.results.map((items) => {

        if (items.Admin_Name2 === 'Las Palmas') {
            Las_Palmas.entries.push({
                "postal_code": items.Postal_Code,
                "place": items.Place_Name,
                "province": items.Admin_Name2,
                "location": items.Admin_Name3,


            });

        } else if (items.Admin_Name2 === 'Santa Cruz de Tenerife') {
            Tenerife.entries.push({
                "postal_code": items.Postal_Code,
                "place": items.Place_Name,
                "province": items.Admin_Name2,
                "location": items.Admin_Name3,


            });
        }

    });
    createdJSON();

};

function createdJSON() {
    fs.writeFile('src/data/postal_codes/Las_Palmas_Postal_Code.json', JSON.stringify(Las_Palmas), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Data written to Las_Palmas_Postal_Code file');
        }
    })
    fs.writeFile('src/data/postal_codes/Tenerife_Postal_Code.json', JSON.stringify(Tenerife), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Data written to Tenerife_Postal_Code file');
        }

    })
};

export default discomposeItemsBack4appApi;