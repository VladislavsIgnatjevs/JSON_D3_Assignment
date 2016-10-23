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
    g.selectAll(".town_icon").remove();
    g.selectAll(".town_icon_text").remove();
    var lng = '',
        lat = '',
        name = '',
        population = '',
        country = '';

    //prevent unexpected results
    if (numberOfCities == '') {
        numberOfCities = 0;
    }
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
            country = val['County'];

            // add town to map
            var coordinates = projection([lng, lat]),
                //show random icon for city when appening - to make map more colorful, add more icos to the project and
                //add filenames in the array below
                icosArray = ['town_ico.png','town_ico1.png'],
                rand = icosArray[Math.floor(Math.random() * icosArray.length)];
            g.append("svg:image")
                .attr("x", coordinates[0])
                .attr("y", coordinates[1])
                .attr('width', 8)
                .attr('height', 8)
                .attr("xlink:href", rand)
                .attr("class", 'town_icon')
                .append("svg:title")
                //adding title that will be used by modal later on 
                .html('<b>Town name:</b> ' + name + ' <br>' + '<b>County:</b> ' + country + ' <br>' + '<b>Population:</b> ' + +population);


            //add title
            g.append("text")
                .attr("class", 'town_icon_text')
                .attr("dx", coordinates[0])
                .attr("dy", coordinates[1] - 2)
                .style("font-size", "2px")
                .text(name);

        });
    });


}