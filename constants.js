const path = require('path');
const CONSTANTS = {
    appRoot : path.resolve(__dirname),
    srcRoot : path.resolve(__dirname + '/src/'),
    // TODO: To implement this in src/service/databaseService/index.js
    // Please update the credentials in the above for now
    dbCredentials : {
        uri : 'neo4j://localhost:7687',
        user : 'neo4j',
        password: 'qazwsx'
    }
}

module.exports.CONSTANTS = CONSTANTS