function hideLoader() {
  $('#loading').hide();
}

// set the dimensions and margins of the graph
var margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#bubbleCourses")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


let courses_url = "http://localhost:3000/top_courses/?max=5&year=2008-2009"
         
d3.json(courses_url, function(error, data) {
    hideLoader(); // hide loading

    console.log(data)

    // TODO: adapt the following data to graph, see console for data

    // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 12000])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([35, 90])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add a scale for bubble size
  var z = d3.scaleLinear()
    .domain([200000, 1310000000])
    .range([ 4, 40]);

  // Add a scale for bubble color
  var myColor = d3.scaleOrdinal()
    .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
    .range(d3.schemeSet2);

  // -1- Create a tooltip div that is hidden by default:
  var tooltip = d3.select("#my_dataviz")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")

  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  var showTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .html("Country: " + d.country)
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var moveTooltip = function(d) {
    tooltip
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var hideTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", "bubbles")
      .attr("cx", function (d) { return x(d.gdpPercap); } )
      .attr("cy", function (d) { return y(d.lifeExp); } )
      .attr("r", function (d) { return z(d.pop); } )
      .style("fill", function (d) { return myColor(d.continent); } )
    // -3- Trigger the functions
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )
});

//Read the data
// IMPORTANT!!!!!!!: we can make query from mongoose to retrieve data (e.g. similar to sql query, we don't need any csv file..eveything was inserted in a database)
// d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv", function(data) {

//   // Add X axis
//   var x = d3.scaleLinear()
//     .domain([0, 12000])
//     .range([ 0, width ]);
//   svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x));

//   // Add Y axis
//   var y = d3.scaleLinear()
//     .domain([35, 90])
//     .range([ height, 0]);
//   svg.append("g")
//     .call(d3.axisLeft(y));

//   // Add a scale for bubble size
//   var z = d3.scaleLinear()
//     .domain([200000, 1310000000])
//     .range([ 4, 40]);

//   // Add a scale for bubble color
//   var myColor = d3.scaleOrdinal()
//     .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
//     .range(d3.schemeSet2);

//   // -1- Create a tooltip div that is hidden by default:
//   var tooltip = d3.select("#my_dataviz")
//     .append("div")
//       .style("opacity", 0)
//       .attr("class", "tooltip")
//       .style("background-color", "black")
//       .style("border-radius", "5px")
//       .style("padding", "10px")
//       .style("color", "white")

//   // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
//   var showTooltip = function(d) {
//     tooltip
//       .transition()
//       .duration(200)
//     tooltip
//       .style("opacity", 1)
//       .html("Country: " + d.country)
//       .style("left", (d3.mouse(this)[0]+30) + "px")
//       .style("top", (d3.mouse(this)[1]+30) + "px")
//   }
//   var moveTooltip = function(d) {
//     tooltip
//       .style("left", (d3.mouse(this)[0]+30) + "px")
//       .style("top", (d3.mouse(this)[1]+30) + "px")
//   }
//   var hideTooltip = function(d) {
//     tooltip
//       .transition()
//       .duration(200)
//       .style("opacity", 0)
//   }

//   // Add dots
//   svg.append('g')
//     .selectAll("dot")
//     .data(data)
//     .enter()
//     .append("circle")
//       .attr("class", "bubbles")
//       .attr("cx", function (d) { return x(d.gdpPercap); } )
//       .attr("cy", function (d) { return y(d.lifeExp); } )
//       .attr("r", function (d) { return z(d.pop); } )
//       .style("fill", function (d) { return myColor(d.continent); } )
//     // -3- Trigger the functions
//     .on("mouseover", showTooltip )
//     .on("mousemove", moveTooltip )
//     .on("mouseleave", hideTooltip )

//   })