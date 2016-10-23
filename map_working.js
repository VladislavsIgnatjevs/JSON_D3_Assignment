/**
 * Created by vignatjevs on 18/10/2016.
 */

var width = 1000,
    height = 1160,
    centered,
    active = d3.select(null),
    projection = d3.geo.albers()
        .center([0, 55.4])
        .rotate([4.4, 0])
        .parallels([50, 60])
        .scale(800 * 5)
        .translate([width / 2, height / 2]),
    path = d3.geo.path()
        .projection(projection),
    svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);
towns = [];

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", clicked);

var g = svg.append("g"),
    cities = svg.append("cities");


//populating countries to the map SCT, WLS, NIR, ENG, IMN
d3.json("ukCountries.json", function (error, uk) {
    if (error) throw error;

    g.selectAll(".subunit")
        .data(topojson.feature(uk, uk.objects.countries_regions).features)
        .enter().append("path")
        .attr("class", function (d) {
            return "subunit " + d.id;
        })
        .attr("d", path)
        .on("click", clicked);


    g.append("path")
        .datum(topojson.mesh(uk, uk.objects.countries_regions, function (a, b) {
            return a !== b;
        }))
        .attr("class", "mesh")
        .attr("d", path);


});


//zooming
function clicked(d) {
    var x, y, k;

    if (d && centered !== d) {
        var centroid = path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        k = 4;
        centered = d;
    } else {
        x = width / 2;
        y = height / 2;
        k = 1;
        centered = null;
    }

    g.selectAll("path")
        .classed("active", centered && function (d) {
                return d === centered;
            });

    g.transition()
        .duration(750)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
        .style("stroke-width", 1.5 / k + "px");
}
