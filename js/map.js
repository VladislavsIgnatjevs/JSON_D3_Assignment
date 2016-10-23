/**
 * Created by vignatjevs on 18/10/2016.
 */

//this code was partially written with the help  of following tutorials: https://bl.ocks.org/mbostock
//https://bost.ocks.org/mike/map/


var width = $(window).width() * 0.7,
    height = $(window).height() * 0.75,
    active = d3.select(null),
    projection = d3.geo.albers()
        .center([0, 55.4])
        .rotate([4.4, 0])
        .parallels([50, 60])
        .scale(1000 * 5)
        .translate([width / 2, height / 2]),
    zoom = d3.behavior.zoom()
        .translate([0, 0])
        .scale(1)
        .scaleExtent([1, 8])
        .on("zoom", zoomed),
    path = d3.geo.path()
        .projection(projection),

    //map
    svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .on("click", stopped, true),
    towns = [];

//bg
svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", reset);

var g = svg.append("g");

svg
    .call(zoom) //free zoom
    .call(zoom.event);

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


    g.selectAll(".subunit-label")
        .data(topojson.feature(uk, uk.objects.countries_regions).features)
        .enter().append("text")
        .attr("class", function (d) {
            return "subunit-label " + d.id;
        })
        .attr("transform", function (d) {
            return "translate(" + path.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .attr("dx", "-2em")
        .text(function (d) {
            return d.properties.name;
        });
});

//functions

//zooming
function clicked(d) {
    if (active.node() === this) return reset(d);
    active.classed("active", false);
    active = d3.select(this).classed("active", true);

    var bounds = path.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height))),
        translate = [width / 2 - scale * x, height / 2 - scale * y];

    svg.transition()
        .duration(750)
        .call(zoom.translate(translate).scale(scale).event);

    //hiding label only if its element is defined to prevent error
    if (typeof d !== 'undefined') {
        g.selectAll(".subunit-label." + d.id)
            .attr("visibility", "hidden");
    }
}
//zoom reset
function reset(d) {
    active.classed("active", false);
    active = d3.select(null);

    svg.transition()
        .duration(750)
        .call(zoom.translate([0, 0]).scale(1).event);

    //showing label only if its element is defined to prevent error
    if (typeof d !== 'undefined') {
        g.selectAll(".subunit-label." + d.id)
            .attr("visibility", "visible");
    }
}

//in zoom
function zoomed() {
    g.style("stroke-width", 1.5 / d3.event.scale + "px");
    g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

// If the drag behavior prevents the default click,
// also stop propagation so we don’t click-to-zoom.
function stopped() {
    if (d3.event.defaultPrevented) d3.event.stopPropagation();
}


$('body').on('click', 'image', function () {
    var text = $(event.target).children().html();
    $('.modal-title').html('City Details');
    $('.modal-body').html(text);
    $('#townDetailsModal').modal('show');
});


