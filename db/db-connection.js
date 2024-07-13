const mysql = require('mysql')

let connection;

function getconnection() {

    if (!connection) {

        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'registration'
          })
    }

    return connection;
}

module.exports=getconnection();