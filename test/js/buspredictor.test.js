define(["sinon", "jquery", "underscore", "m.predictions", "m.direction", "c.directionlist", "c.predictionslist", "c.stoplist", "utilities", "text!test/data/89davis.xml", "text!test/data/agencylist.xml", "text!test/data/routelist.xml", "text!test/data/routeconfig.xml"], function (sinon, $, _, Predictions, Direction, DirectionList, PredictionsList, StopList, Utilities, XMLPrediction, XMLRoute, XMLAgency, XMLRouteList, XMLRouteConfig) {
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
            predictionURL = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=mbta&r=89&s=2729",
            routeConfigURL = "http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=mbta&r=89",
            routeListURL = "http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=mbta",
            agencyListURL = "http://webservices.nextbus.com/service/publicXMLFeed?command=agencyList";

        beforeEach(function () {
            mockServer = sinon.fakeServer.create();

            mockServer.respondWith(predictionURL,
                [ 200, {"Content-Type": "application/xml"}, XMLPrediction ]
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
                expect(modelUnderTest.url()).toBe(predictionURL);
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
            it("parses data into child Direction model objects upon its instantiation", function () {
                var direction1 = modelUnderTest.directions.at(0),
                    direction2 = modelUnderTest.directions.at(1);
                expect(direction1.attributes.title).toBe("Davis Square via Broadway");
                expect(direction2.attributes.title).toBe("Clarendon Hill via Broadway");
            });
        });

        describe("the Direction model", function () {
            describe("has a load method", function () {
                it("which creates a child VehiclePredictionList collection", function () {
                    var direction = modelUnderTest.directions.at(0);
                    expect(direction.predictions.length).toEqual(2);
                });
                xit("or creates a child stopList collection", function () {
                    var direction = modelUnderTest.directions.at(0);
                    expect(direction.stops.length).toBeDefined();
                });
            });
        });

        describe("the VehiclePredictionList collection", function () {
            it("parses data into child VehiclePrediction model objects upon its instantiation", function () {
                var predictions = modelUnderTest.directions.at(0).predictions;
                expect(predictions.length).toEqual(2);
                expect(predictions.at(0).attributes.epochTime).toBe("1389204789480");
            });
        });

        describe("the VehiclePrediction model", function () {
            it("has minutes, epochTime, isScheduleBased", function () {
                var prediction = modelUnderTest.directions.at(0).predictions.at(0);
                expect(prediction.attributes.epochTime).toBe("1389204789480");
                expect(prediction.attributes.minutes).toBe("12");
            });
            it("sets a 'delayed' attribute on itself when needed", function () {
                var prediction = modelUnderTest.directions.at(0).predictions;
                expect(prediction.at(0).attributes.delayed).toBeUndefined();
                expect(prediction.at(1).attributes.delayed).toBeDefined();
            });
            it("should convert epochTime into local 12hr time for the benefit of the user", function () {
                var prediction = modelUnderTest.directions.at(0).predictions.at(0);
                expect(prediction.attributes.arrivalTime).toBe("2:13PM");
            });
        });

    });

    describe("user selects an agency, a route, a direction, and a stop", function () {
//        var modelUnderTest,
//            mockServer,
//            testURL = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=mbta&r=89&s=2729";

//        beforeEach(function () {
//            mockServer = sinon.fakeServer.create();
//
//            mockServer.respondWith(
//                "GET",
//                testURL,
//                [ 200, {"Content-Type": "application/xml"}, XMLRoute ]
//            );
//
//            modelUnderTest = new DirectionList();
//
//            modelUnderTest.fetch({
//                dataType: "xml"
//            });
//
//            mockServer.respond();
//        });
        describe("the DirectionList watches for a tag attribute", function () {
//            it("includes the xml data as direction.$data", function () {
//                expect(modelUnderTest.$data).toBeDefined();
//                console.log(JSON.stringify(modelUnderTest.at(0)));
//            })
        })
    });

    describe("the user experience of selecting a stop/prediction", function () {

        describe("user selects an agency from pulldown", function () {
            xit("route pulldown becomes visible when an agency is selected", function () {});
            xit("focus moves to the route pulldown after agency selection", function () {});
            xit("routelist is reset with new data when user selects a different agency", function () {});
            xit("routelist pulldown vanishes if no agency has been selected", function () {});
        });

        describe("user selects a route from pulldown", function () {
            xit("available directions appear", function () {});
            xit("directions display updated data if route changes", function () {});
            xit("directions disappear if agency changes", function () {});
        });

        describe("user selects a direction", function () {
            xit("list of available stops appear", function () {});
            xit("stoplist updated if direction changes", function () {});
        });

        describe("user selects stop", function () {
            xit("prediction is displayed", function () {});
        });

    });

    describe("the predictions collection", function () {
        xit("contains and displays all user-selected predictions", function () {});
        xit("should allow user to rearrange predictions via drag+drop", function () {});
    });

    describe("a route/stop prediction object", function () {
        xit("is updated every 60 seconds", function () {});
        xit("should show a warning if a bus is delayed", function () {});
        xit("should show a max of three predictions per direction", function () {});
        xit("should have an X to remove itself from predictionslist", function () {});
    });

});