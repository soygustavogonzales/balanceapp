var mysql = require('mysql'),

/*
//Hay errores cuando se intenta conectar con el host de mysql remotamente
aparece lo sgte. en la consola del servidor: getaddrinfo ENOTFOUND

connection  = mysql.createConnection({
    host:'mysql.hostinger.es',//'',
    user:'u960541651_user1',
    password:'matadorg1',
    database:'u960541651_divis'
})
*/
connection  = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'matadorg1',
    database:'divercity',
    PORT:'3306'
})

module.exports = connection;