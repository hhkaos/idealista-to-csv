var request = require("request");
var btoa =  require('btoa');
var idealista = require("./lib/idealista.js")

let access_token;



let download = function (searchParams){

    idealista.getToken(tokenOptions).then((access_token, err)=>{
        searchOptions.headers.Authorization = "Bearer " + access_token;
        searchOptions.formData = searchParams;
        //search idealista.search(searchOptions).then();
    })



};

module.exports = {
    download:download
}
