
const dbService = require('../../service/databaseService');

const widgetGraph = {
    getData: (node, callback) => {
        // Get node labels to display. 
        let query = 'MATCH (n) RETURN distinct labels(n) limit 10';
        this.widgetGraph.nodeData = false;
        // Get the data for a specific node 
        if (node) {
            query = `MATCH (n:${node}) RETURN n limit 5`;
            this.widgetGraph.nodeData = true;
        }
        // TODO: Implement getting data for all nodes.
        // Check if there are edges before rendering
        this.widgetGraph.runQuery(query, (data) => {
            if (!this.widgetGraph.Edges) {
                this.widgetGraph.setEdges(()=>{
                    const templ = this.widgetGraph.renderUI(data);
                    return callback(templ);
                })
            } else {
                const templ = this.widgetGraph.renderUI(data);
                return callback(templ);
            }
        }); 
    },

    setEdges: (callback) => {
        let query = 'MATCH (n:Edges) RETURN n limit 5';
        this.widgetGraph.runQuery(query, (data) => {
            let graphData = data.records;
            const edgesProps= [];
            graphData.forEach(node => {
                edgesProps.push(node._fields[0].properties);
            });
            this.widgetGraph.Edges = edgesProps;
            callback();
        });
    },

    runQuery: (query, callback) => {
        if (!query) {
            console.log ("Error: No Query sent");
            return false;
        }
        dbService.dbService(query, {}, (data) => { 
            return callback(data);
        });
    },
    
    renderUI: (data) => {
        let templ = '';
        if (this.widgetGraph.nodeData) {
            const graphData = data.records;
            const graphDrawNodes= [];
            graphData.forEach(node => {
                graphDrawNodes.push(node._fields[0].properties);
            });
            templ += `<h3>To show Force Graph here.</h3>`;
            templ += `<p>The JSON to display this graph looks as follows. Limited to 20 records for simplicity</p>`
            // TODO: Implement Force 
            templ += `<div class="border">
                        <pre> 
                        { 
                          "nodes": ${JSON.stringify(graphDrawNodes)},
                          "links":  ${JSON.stringify(this.widgetGraph.Edges)}
                        }
                        </pre></div>`;

        } else {
            const graphData = data.records;
            templ ='<div class="list-group">'
            graphData.forEach(node => {
                if (node._fields[0][0] !== "Edges") {
                    templ += `<a href="/?graph=${node._fields[0][0]}" class="list-group-item list-group-item-action" >${node._fields[0][0]}</a>`;
                }
            });
            templ += '</div>';
        }
        return templ;
    }

}

module.exports.widgetGraph = widgetGraph;

