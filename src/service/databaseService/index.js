const neo4j = require('neo4j-driver');

//TODO: To get the credentials from constants.js in the root dir
const uri = 'neo4j://localhost:7687';
const user = 'neo4j'
const password = 'qazwsx';

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();
const dbService = (query, params, callback) => {
    return session.run(query, params).then(result => { callback (result); 
                                                        //session.close();
                                                        //driver.close(); 
                                                    })
                                      .catch((e) => {console.log(e)});
    
};


module.exports.dbService =  dbService;