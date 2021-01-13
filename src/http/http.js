import fetch from 'node-fetch';
import dotEnv from 'dotenv';

dotEnv.config();

const get = async (url) => {
    return await fetch(url, {method: "GET"});
};

const searchItems = async () => {

    return await get('https://datos.canarias.es/api/estadisticas/callejero/v1.0/municipalities?limit=400&offset=0&orderBy=code%20ASC')
        .then(result => result.json())
        .then(data => data);

}


const searchPostalCode = async () => {

    //Filter by Admin_Code

    const where = encodeURIComponent(JSON.stringify({
        "Admin_Code": "CN"
    }));
    return await fetch(
        `https://parseapi.back4app.com/classes/Spainpostalcode_Spain_Postal_Code?limit=2000&order=Admin_Name2&keys=Place_Name,Postal_Code,Admin_Name2,Admin_Name3&where=${where}`,
        {
            headers: {
                'X-Parse-Application-Id': process.env.APPLICATION_ID, // This is your app's application id
                'X-Parse-REST-API-Key': process.env.REST_API_Key, // This is your app's REST API key
            }
        }
    ).then(response => response.json()).then(data => data);

};

export {searchItems, searchPostalCode};
