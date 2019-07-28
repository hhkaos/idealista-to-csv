var request = require("request");
var btoa =  require('btoa');


var tokenOptions = {
    method: 'POST',
    url: 'https://api.idealista.com/oauth/token',
    headers: {
     'Cache-Control': 'no-cache',
     'Content-Type': 'application/x-www-form-urlencoded',
     Authorization: 'Basic ' + btoa("<Apikey>:<secret>")
 },
 form: {
     grant_type: 'client_credentials',
     scope: 'read'
 }
};


function getToken(){
    return new Promise((resolve, reject) => {
        request(tokenOptions, function (error, response, body) {
          if (error) throw new Error(error);

          var res = JSON.parse(response.body)
          if(res.access_token){
              resolve(res.access_token);
          }else{
              reject("Error:", res);
          }
        });
    })
}

var searchOptions = {
    method: 'POST',
    url: 'https://api.idealista.com/3.5/es/search',
    headers: {
        'Postman-Token': '00bf1381-fe17-4c8c-bf9d-899057ef966f',
        'Cache-Control': 'no-cache',
        'Content-Type': 'multipart/form-data;',
        // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJyZWFkIl0sImV4cCI6MTU2NDI2OTA5NywiYXV0aG9yaXRpZXMiOlsiUk9MRV9QVUJMSUMiXSwianRpIjoiNzgyZjdiNDAtODZmMy00MjcwLTg4M2QtZTk4NjZiNTMxNGQ0IiwiY2xpZW50X2lkIjoiOHpoeGduNnduY2J1OGJnZ3Bmamc1MWd0djI4Zzd6MzcifQ.jG6-xK4KU7LLL0g1vtYGDjCH2DA-nRgbDQh9G1UpPic',
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
    }//,
    // formData: {
    //     center: '36.837779,-2.462808',
    //     propertyType: 'homes',
    //     distance: '600',
    //     operation: 'sale',
    //     numPage: 1
    // }
};

function search(){

    //Todo: promise
    request(searchOptions, function (error, response, body) {
      if (error) throw new Error(error);
      debugger
      //body totalPages
      console.log(body);
    });
};

module.exports = {
    getToken: getToken,
    search: search
}
