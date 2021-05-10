const express = require('express');

const path = require('path');
const appConstants =  require('../constants');
const router = express.Router();
const startApp = require(path.join(appConstants.CONSTANTS.srcRoot, 'index'));



router.get('/', function (req, res) {
    // Query the graph db using get params else render ui to list all nodes
    // TODO: Fix to POST if need be.
    const node = (req.query && req.query.graph) ? req.query.graph : null;
    console.log(node);
    startApp.init(node, function(resp) {
            res.render('index', { content: resp });
    });

});

router.use('*',function(req, res){
    res.send('Error 404: Page not found!');
});

module.exports = router;