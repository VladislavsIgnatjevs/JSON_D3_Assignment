$(document).ready(function () {
    var requestButton = $("#button"),
        cityTag = $("#numberOfCities");
    requestButton.click(function () {
        getCities(cityTag.val());
    });

});

//get cities from api
function getCities(numberOfCities) {
    //erase all towns from map to allow refresh
    g.selectAll(".town_icos").remove();
    g.selectAll(".town_icos_text").remove();
    var lng = '',
        lat = '',
        name = '',
        population = '',
        country = '';
//populating cities to the map async
    d3.json("http://ac32007.cloudapp.net:8080/Circles/Towns/" + numberOfCities, function (data) {
        //alert(JSON.stringify(data));
        $.each(data, function (key, val) {
            /* JSON object attributes
             Town
             Country
             Population
             lat
             lng */

            //attrs
            lat = val['lat'];
            lng = val['lng'];
            name = val['Town'];
            population = val['Population'];
            country = val['Country'];

            // add town to map
            var coordinates = projection([lng, lat]);
            g.append("svg:image")
                .attr("x", coordinates[0])
                .attr("y", coordinates[1])
                .attr('width', 8)
                .attr('height', 8)
                .attr("xlink:href", "town_ico.png")
                .attr("class", 'town_icos')
                .append("svg:title")
                .text(name);


            //add title

            g.append("text")
                .attr("class", 'town_icos_text')
                .attr("dx", coordinates[0])
                .attr("dy", coordinates[1] - 2)
                .style("font-size", "2px")
                .text(name);

        });
    });


}