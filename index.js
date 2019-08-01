const config = require('./config/config.json');
const idealista = require("./lib/idealista.js")
const json2csv = require('./lib/save-to-csv.js')
const utils = require('./lib/utils.js')
const btoa =  require('btoa');
const fs = require('fs');

let elements = [];

var getAllResults = async (searchOptions) => {
    var res = await idealista.search(searchOptions);
    var all = res.elementList;

    // Save individual page result
    save({
        name:`./data/busqueda ${utils.now()}_page_${res.actualPage}.json`,
        data: res
    });

    while(res.actualPage < res.totalPages){
        searchOptions.searchParams.numPage = res.actualPage + 1;
        res = await idealista.search(searchOptions);

        save({
            name:`./data/busqueda ${utils.now()}_page_${res.actualPage}.json`,
            data: res
        });

        all = all.concat(res.elementList)
    }

    debugger
    try{
        json2csv.save(all);
    }catch(e){
        console.log("Error: ", e);
    };

    return all
};

let base64_credentials = {
    credentials: btoa(`${config.apiKey}:${config.secret}`)
}

function save(obj){
    const d = utils.now();
    fs.writeFile(obj.name, JSON.stringify(obj.data, null, 2), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log(`The file "${obj.name} was successfully saved!`);
    });
}

idealista.getToken(base64_credentials).then((access_token, err)=>{

    let searchParams = {
        propertyType: 'homes',
        operation: 'sale',
        center: '36.837779,-2.462808',
        distance: '600',
        //locationId: "0-EU-ES-13-02-004-082", // Tomelloso ~700
        //locationId: "0-EU-ES-04-10-001-013-02" // Almería centro ~360
        numPage: 1
    }

    let searchOptions = {
        auth: "Bearer " + access_token,
        searchParams: searchParams
    };

    elements = getAllResults(searchOptions);

    save({
        name:`./data/busqueda ${utils.now()}.json`,
        data: searchParams
    });

})
