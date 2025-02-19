var mysql = require('mysql2');

var connection = mysql.createConnection({
    host:'localhost', // IP of database server
    port: '3306', // port of database server
    user:'root', // user of database server
    password:'adev', // password of database server
    // database: 'restaurant_review'
    database: 'e-commerce'
    });
    

connection.connect(err => { // test out connection and if there is error console.log the error
    if (err) throw err;
    console.log('Connected To DB');
    });
    // Export the connection so that it can be used
    // by others script
    module.exports = connection;
    