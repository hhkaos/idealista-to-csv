
Create a `config/config.json`:

```
{
    "apiKey": "YOUR_API_KEY",
    "secret": "YOUR_SECRET"
}
```


Change the query `searchParams`.

`node index.js`

Uniformize JSON schema:

`jq 'map({propertyCode,thumbnail,externalReference,numPhotos,floor,price,propertyType,operation,size,exterior,rooms,bathrooms,address,province,municipality,district,country,latitude,longitude,showAddress,url,distance,hasVideo,status,newDevelopment,hasLift,priceByArea,hasPlan,has3DTour,has360,"typology":.detailedType.typology,"subtitle":.suggestedTexts.subtitle,"title":.suggestedTexts.title})' data/pisos\ 2019-08-01_170747.json > data/pisos\ 2019-08-01_170747_clear.json`

Transform JSON to CSV:

`json2csv -i data/pisos\ 2019-08-01_170747_clear.json -o data/pisos\ 2019-08-01_170747.csv`
