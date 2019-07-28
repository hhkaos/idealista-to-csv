var idealista = require('./download-query.js')

idealista.download({
    center: '36.837779,-2.462808',
    propertyType: 'homes',
    distance: '600',
    operation: 'sale',
    numPage: 2
});
