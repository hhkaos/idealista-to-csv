const querystring = require('querystring');
const https = require('https');
const request = require("request");

let tokenOptions = {
    method: 'POST',
    url: 'https://api.idealista.com/oauth/token',
    headers: {
     'Cache-Control': 'no-cache',
     'Content-Type': 'application/x-www-form-urlencoded'
 },
 form: {
     grant_type: 'client_credentials',
     scope: 'read'
 }
};

function getToken(opt){
    return new Promise((resolve, reject) => {

        tokenOptions.headers.Authorization =  'Basic ' + opt.credentials;

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
        'Cache-Control': 'no-cache',
        'Content-Type': 'multipart/form-data;',
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
    }
};

function search(opt){
    return new Promise((resolve, reject) => {
        searchOptions.headers.Authorization = opt.auth;
        searchOptions.formData = opt.searchParams;

        var postData = querystring.stringify(searchOptions.formData);

        var options = {
          hostname: 'api.idealista.com',
          port: 443,
          path: '/3.5/es/search',
          method: 'POST',
          headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
               'Content-Length': postData.length,
               'Authorization': opt.auth
             }
        };

        var req = https.request(options, (res) => {
            const chunks = [];
            res.on('data', data => chunks.push(data))
            res.on('end', () => {
              let body = Buffer.concat(chunks);
              if(res.headers['content-type'].indexOf('application/json') != -1){
                body = JSON.parse(body);
              }
              resolve(body);
          });
        });

        req.on('error', (e) => {
          console.error(e);
        });

        req.write(postData);
        req.end();
    });
};

module.exports = {
    getToken: getToken,
    search: search
}
