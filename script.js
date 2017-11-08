

var margin = {
  left: 75,
  right: 50,
  top: 50,
  bottom: 75
};


var width = 625 - margin.left - margin.right;
var height = 625 - margin.top - margin.bottom;

// 
d3.queue()
  .defer(d3.json, 'data/fam-w-children-tanf-ratio.json')
  .defer(d3.json, 'data/state_tanf_to_poverty_ratio.json')
  .defer(d3.json, 'data/us-states.json')
  .awaitAll(function (error, results) {
    if (error) { throw error; }
    
    scatter = new DirectedScatterPlot(results[0]);
    scatter.update(results[0]);

    d3.select('#restart').on('click', function () {

      scatter.update(results[0]);

    });
  });


function DirectedScatterPlot(data) {

  var chart = this;

  chart.svg = d3.select("#chart1")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

  chart.g = d3.select("svg")
    .append("g")
    .attr("transform", function(){ return "translate(" + margin.left + "," + margin.top + ")" });

  chart.xScale = d3.scaleLinear()
    .domain([4500000,7500000])
    .range([0, width])
    .nice();

  chart.yScale = d3.scaleLinear()
      .domain([1500000, 4500000])
    .range([height, 0]);

  chart.xAxis = d3.axisBottom(chart.xScale).ticks(5, "s");
  chart.yAxis = d3.axisLeft(chart.yScale).ticks(5, "s");

  chart.g.append("g")
    .attr("transform", function(){ return "translate(0," + height + ")" })
    .attr("class", "axis")
    .call(chart.xAxis);

  chart.g.append("g")
    .attr("class", "axis")
    .call(chart.yAxis);

};




DirectedScatterPlot.prototype.update = function (data) {

    var chart = this;
    var full = data.slice();

    chart.g.selectAll(".circ")
      .data(full, function(d){ return d.year }).enter()
      .append("circle")
      .attr("class", "circ")
      .attr("cx", function(d){ return chart.xScale(d.fam_child_pov) })
      .attr("cy", function(d){ return chart.yScale(d.tanf_fam) })
      .attr("r", 8);

};  
