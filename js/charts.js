var ratData = [ 400, 900, 300, 600 ];

var svg = d3.select( "body" )
    .append( "svg" )
    .attr( "width", 500 )
    .attr( "height", 150 );

function drawChart( dataArray ){
    // create a selection and bind data
    var selection = svg.selectAll( "rect" )
        .data( dataArray );

    // create new elements wherever needed
    selection.enter()
        .append( "rect" )
        .attr( "x", function(d,i) {
            return i * 25;
        })};