const path = require('path');
const appConstants =  require('../constants');
const showGraph = require(path.join(appConstants.CONSTANTS.srcRoot, 'widgets/widget-graph/index'));


//widgetGraph.setData();
const init = function(node, callback) {
    showGraph.widgetGraph.getData(node, (templ) => {
        return callback(templ);
    });
};

module.exports.init = init;