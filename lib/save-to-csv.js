const fs = require('fs');
const utils = require("./utils");
const jq = require('node-jq')

function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += '"'+array[i][index]+'"';

        }
        line = line.replace(/[\r\n]+/g," ");
        str += line + '\r\n';
    }

    return str;
}

// const filter = '.elementList | map({propertyCode,thumbnail,externalReference,numPhotos,floor,price,propertyType,operation,size,exterior,rooms,bathrooms,address,province,municipality,district,country,latitude,longitude,showAddress,url,distance,hasVideo,status,newDevelopment,hasLift,priceByArea,hasPlan,has3DTour,has360,"typology":.detailedType.typology,"subtitle":.suggestedTexts.subtitle,"title":.suggestedTexts.title})'
const filter = 'map({propertyCode,thumbnail,externalReference,numPhotos,floor,price,propertyType,operation,size,exterior,rooms,bathrooms,address,province,municipality,district,country,latitude,longitude,showAddress,url,distance,hasVideo,status,newDevelopment,hasLift,priceByArea,hasPlan,has3DTour,has360,"typology":.detailedType.typology,"subtitle":.suggestedTexts.subtitle,"title":.suggestedTexts.title})'

const header= `propertyCode,thumbnail,externalReference,numPhotos,floor,price,propertyType,operation,size,exterior,rooms,bathrooms,address,province,municipality,district,country,latitude,longitude,showAddress,url,distance,hasVideo,status,newDevelopment,hasLift,priceByArea,hasPlan,has3DTour,has360,typology,subtitle,title\n`;

const d = utils.now();

const options = {input: 'json'}

function save(json){

    fs.writeFile(`./data/pisos ${d}.json`, json, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });

    // jq.run(filter, json, options).then((output) => {
    //     // console.log(output)
    //     let aux = ConvertToCSV(output)
    //     // console.log(header+aux)
    //     const fs = require('fs');
    //     fs.writeFile(`./data/pisos ${d}.csv`, header+aux, function(err) {
    //         if(err) {
    //             return console.log(err);
    //         }
    //
    //         console.log("The file was saved!");
    //     });
    // })
    // .catch((err) => {
    //     console.error(err)
    // })
}

module.exports = {
    save: save
}
