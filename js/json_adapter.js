$(document).ready(function () {
    var requestButton = $("#button");


    requestButton.click(function () {
        get();
    });

});

function get() {
    var cityTag = $("#numberOfCities"),
        andyAPI = "http://ac32007.cloudapp.net:8080/Circles/Towns/" + cityTag.val();


    //get JSON and push into array cities
    $.getJSON(andyAPI, function (data) {
        var cities = [];
        $.each(data, function (key, val) {
            // items.push( "<li id='" + JSON.stringify(key) + "'>" + JSON.stringify(val) + "</li>" );
            cities.push(val);
        });

        //print city attributes
        // Town
        // Country
        // Population
        //lat
        //lng

        $.each(cities, function( key, value ) {
            alert( JSON.stringify(key) + ": " + JSON.stringify(value));
        });


        /*        $( "<ul/>", {
         "class": "my-new-list",
         html: items.join( "" )
         }).appendTo( "body" );*/
    });
}