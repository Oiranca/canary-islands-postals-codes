import generateCanaryPostalCodes from './discompose/from_istac_api/generateCanaryPostalCodes';
import fs from 'fs';
import formatDataName from './formatDataName/formatDataName';

// function createdJSON(json, filename) {
//     fs.writeFile(`output/postal_codes/${filename}.json`, JSON.stringify(json), (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('Data written to Canary_Islands_Postal_Code file');
//         }
//     });
// }
//
// // searchIntoGeoApi();
//
// generateCanaryPostalCodes().then((canaryPostalCodes) => {
//     createdJSON(canaryPostalCodes, 'Canary_Postal_Codes');
// });
formatDataName();
