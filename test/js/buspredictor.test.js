define(["sinon", "jquery", "underscore", "m.predictions", "m.direction", "c.directionlist", "c.predictionslist", "text!test/data/89davis.xml", "text!test/data/routeconfig.xml"], function (sinon, $, _, Predictions, Direction, DirectionList, PredictionsList, XMLData, XMLRoute) {
//    describe("sinon", function () {
//        var modelUnderTest, mockServer, testURL;
//
//        beforeEach(function () {
//            mockServer = sinon.fakeServer.create();
//            modelUnderTest = new Predictions({
//                agencyTag: "mbta",
//                routeTag: "89",
//                stopTag: "2729"
//            });
//            testURL = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=mbta&r=89&s=2729";
//        });
//
//        it("lets us load xml into a backbone model", function() {
//            var callback = sinon.spy();
//
//            //	Set up server mock
//            mockServer.respondWith(
//                "GET",
//                testURL,
//                [ 200, {"Content-Type": "application/xml"}, XMLData ]
//            );
//
//            // bind to change event and have it call the sinon.spy() callback
//            modelUnderTest.bind("change", callback);
//
//            // Act
//            modelUnderTest.fetch({
//                dataType: "xml"
//            });
//            mockServer.respond();
//
//            // Assert
////            console.log(modelUnderTest.url());
//
//            expect(callback.called).toBeTruthy();
//            expect(modelUnderTest.attributes.agencyTitle).toBeDefined();
//        })
//    });
    describe("requesting, parsing, and displaying a prediction from NextBus", function () {
        var modelUnderTest,
            mockServer,
            testURL = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=mbta&r=89&s=2729";

        beforeEach(function () {
            mockServer = sinon.fakeServer.create();

            mockServer.respondWith(
                "GET",
                testURL,
                [ 200, {"Content-Type": "application/xml"}, XMLData ]
            );

            modelUnderTest = new Predictions({
                agencyTag: "mbta",
                routeTag: "89",
                stopTag: "2729"
            });

            modelUnderTest.fetch({
                dataType: "xml"
            });
            mockServer.respond();
        });
//        describe("PredictionsList collection", function () {
//
//            it("should create the correct url", function () {
//                modelUnderTest = new PredictionsList({
//                    agencyTag: "mbta",
//                    routeTag: "89",
//                    stopTag: "2729"
//                });
//            expect(modelUnderTest.url()).toBe(testURL);
//        });
//        });

        describe("the Predictions model", function () {
            it("accepts agencyTag, routeTag, stopTag, agencyTitle", function () {
                expect(modelUnderTest.attributes.agencyTag).toBe("mbta");
                expect(modelUnderTest.attributes.routeTag).toBe("89");
                expect(modelUnderTest.attributes.stopTag).toBe("2729");
            });
            it("generates a url from above attributes", function () {
                expect(modelUnderTest.url()).toBe(testURL);
            });
            it("creates a child DirectionList named 'directions'", function () {
                expect(modelUnderTest.directions).toBeDefined();
            });
            it('fills directions into predictions.directions.', function () {
                expect(modelUnderTest.directions.length).toBe(2);
            });
            xit("should update itself every minute", function () {});

        });

        describe("the DirectionList collection", function () {
//            xit("determines if it needs to create a Routes collection, or a Predictions collection on the Direction model", function () {
//                var needRoutes = new DirectionList(XMLRoute);
//                console.log(JSON.stringify(needRoutes.route));
//                expect(needRoutes.name).toBeDefined();
//            });
            it("parses data into child Direction model objects upon its instantiation", function () {
                var direction1 = modelUnderTest.directions.at(0),
                    direction2 = modelUnderTest.directions.at(1);
                expect(direction1.attributes.title).toBe("Davis Square via Broadway");
                expect(direction2.attributes.title).toBe("Clarendon Hill via Broadway");
            });
        });
//
        describe("the Direction model", function () {
            describe("has a method named loadPredictions", function () {
                it("which creates a child VehiclePredictionList collection", function () {
                    var direction = modelUnderTest.directions.at(0);
                    expect(direction.predictions.length).toEqual(2);
                });
            })
        });

        describe("the VehiclePredictionList collection", function () {
            it("parses data into child VehiclePrediction model objects upon its instantiation", function () {
                var predictions = modelUnderTest.directions.at(0).predictions;
                expect(predictions.length).toEqual(2);
                expect(predictions.at(0).attributes.epochTime).toBe("1389204789480");
            });
            xit("should have a max of three vehicle predictions", function () {});
        });
//
//        describe("the VehiclePrediction model", function () {
//            xit("has minutes, epochTime, isScheduleBased", function () {});
//            xit("will display highlighted if delayed and slowness attributes are present", function () {});
//            xit("should convert epochTime into local 12hr time for the benefit of the user", function () {});
//        })

    });
});