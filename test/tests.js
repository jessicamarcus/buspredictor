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

test("DirectionFactory.Build - With Direction Data - Sets Correct Direction Properties", function(){
    // Arrange
    var xmlDoc = $.parseXML('<body copyright="All data copyright MBTA 2014."><direction title="Davis Square via Broadway"><predictions agencyTitle="MBTA" routeTitle="89" routeTag="89" stopTitle="Broadway @ Main St" stopTag="2729"></predictions></direction></body>');
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