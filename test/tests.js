test("equal utc", function() {
    equal(utcToLocal12hrTime(1398010490000), "12:14PM", "passed");
    equal(utcToLocal12hrTime(1388971649969), "9:27PM", "passed");
});

// SSR - Subject, Scenario, Result
test("RoutePredictionsFactory.Build - With Predictions Data - Sets Correct Predictions Properties", function(){
    // Arrange
    var xmlDoc = $.parseXML('<body copyright="All data copyright MBTA 2014."><predictions agencyTitle="MBTA" routeTitle="89" routeTag="89" stopTitle="Broadway @ Main St" stopTag="2729"></predictions></body>');
    var factory = new RoutePredictionsFactory();
    var $data = $(xmlDoc).find("predictions");

    // Act
    var testObject = factory.build($data);

    // Assert
    ok(testObject.stopTag() == "2729", "stop tag is correct");
    ok(testObject.routeTag() =="89", "routeTag is correct");
    ok(testObject.routeObjKey == "892729", "routeObjKey is correct");
});

//test("RoutePredictionsFactory.Build - sets correct children", function(){
//    // Arrange
//    var xmlDoc = $.parseXML('<body copyright="All data copyright MBTA 2014."><predictions agencyTitle="MBTA" routeTitle="89" routeTag="89" stopTitle="Broadway @ Main St" stopTag="2729"><direction title="Davis Square via Broadway"><prediction epochTime="1389204789480" seconds="720" minutes="12" isDeparture="false" affectedByLayover="true" dirTag="89_0_var0" vehicle="0630" block="G89_16" tripTag="21757870"/></direction></predictions></body>');
//    var factory = new RoutePredictionsFactory();
//    var $data = $(xmlDoc).find("predictions");
//
//    var testObject = factory.build($data);
//
//    var direction = testObject.direction[0];
//
//    var vehicle = direction.predictions[0];
//
//    // Assert
//    ok(testObject.direction[0] == "Davis Square via Broadway", "direction is correct");
//});

test("DirectionFactory.Build - With Direction Data - Sets Correct Direction Properties", function(){
    // Arrange
    var xmlDoc = $.parseXML('<body copyright="All data copyright MBTA 2014."><predictions agencyTitle="MBTA" routeTitle="89" routeTag="89" stopTitle="Broadway @ Main St" stopTag="2729"><direction title="Davis Square via Broadway"></direction></predictions></body>');
    var factory = new DirectionFactory();
    var $data = $(xmlDoc).find("direction");

    // Act
    var testObject = factory.build($data);

    // Assert
    ok(testObject.title() == "Davis Square via Broadway", "Davis Square via Broadway: correct");
});

test("VehicleFactory.Build - With Vehicle Data - Sets Correct Vehicle Properties", function(){
    // Arrange
    var xmlDoc = $.parseXML('<body copyright="All data copyright MBTA 2014."><predictions agencyTitle="MBTA" routeTitle="89" routeTag="89" stopTitle="Broadway @ Main St" stopTag="2729"><direction title="Davis Square via Broadway"><prediction epochTime="1389204789480" seconds="720" minutes="12" isDeparture="false" affectedByLayover="true" dirTag="89_0_var0" vehicle="0630" block="G89_16" tripTag="21757870"/></direction></predictions></body>');
    var factory = new VehiclePredictionFactory();
    var $data = $(xmlDoc).find("prediction");

    // Act
    var testObject = factory.build($data);

    // Assert
    ok(testObject.epochTime() == utcToLocal12hrTime(1389204789480), "epoch time translated: correct");
    ok(testObject.minutes() == "12", "12 minutes: correct")
});

test("generate Nextbus url from a prediction in selectedPredictions", function(){
    // Arrange
    var xmlDoc = $.parseXML('<body copyright="All data copyright MBTA 2014."><predictions agencyTitle="MBTA" routeTitle="89" routeTag="89" stopTitle="Broadway @ Main St" stopTag="2729"><direction title="Davis Square via Broadway"><prediction epochTime="1389204789480" seconds="720" minutes="12" isDeparture="false" affectedByLayover="true" dirTag="89_0_var0" vehicle="0630" block="G89_16" tripTag="21757870"/></direction></predictions></body>'),
    factory = new RoutePredictionsFactory(),
    $data = $(xmlDoc).find("predictions"),
    predictionUrl = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=";

    // Act
    var myModel = factory.build($data);
    predictionUrl = myModel.getUrl(predictionUrl);

    // Assert
    ok(myModel.agencyTitle() == "MBTA", "check for correct agencyTitle value");
    ok(predictionUrl == "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=mbta&r=89&s=2729", "89 to Davis prediction");
});

test("get list of MBTA routes from nextbus", function(){
    // Arrange
    var NextbusService = {
        baseUrl: "http://webservices.nextbus.com/service/publicXMLFeed?command=",
        agencyTag: "mbta",
        getRoutePrediction: function(url, callback) {
            $.ajax({
                type: "GET",
                url: url,
                dataType: "xml",
                success: callback,
                error: function() { console.log("xml not returned") }
            });
        },
        getRouteList: function(agencyTag) {
            var command = "routeList";
        }
    };
    // Act

    // Assert
    ok(myModel.agencyTitle() == "MBTA", "check for correct agencyTitle value");
});