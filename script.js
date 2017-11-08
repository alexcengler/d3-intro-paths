

var margin = {
  left: 75,
  right: 50,
  top: 50,
  bottom: 75
};


var width = 625 - margin.left - margin.right;
var height = 625 - margin.top - margin.bottom;


d3.queue()
  .defer(d3.json, 'data/fam-w-children-tanf-ratio.json')
  .defer(d3.json, 'data/state_tanf_to_poverty_ratio.json')
  .defer(d3.json, 'data/us-states.json')
  .awaitAll(function (error, results) {
    if (error) { throw error; }
    
    scatter = new DirectedScatterPlot(results[0]);

  });


function DirectedScatterPlot(data) {

  console.log(data);

};

