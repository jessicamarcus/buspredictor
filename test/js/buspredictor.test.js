define(["sinon", "jquery", "underscore", "m.predictions", "m.direction", "m.route", "m.stop", "c.directionlist", "c.predictionslist", "c.stoplist", "c.routelist", "utilities", "text!test/data/89davis.xml", "text!test/data/agencylist.xml", "text!test/data/routelist.xml", "text!test/data/routeconfig.xml"], function (sinon, $, _, Predictions, Direction, Route, Stop, DirectionList, PredictionsList, StopList, RouteList, Utilities, XMLPrediction, XMLAgency, XMLRouteList, XMLRouteConfig) {
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
    var predictionURL = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=mbta&r=89&s=2729",
        routeConfigURL = "http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=mbta&r=89&terse",
        routeListURL = "http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=mbta",
        agencyListURL = "http://webservices.nextbus.com/service/publicXMLFeed?command=agencyList";

    describe("requesting, parsing, and displaying a prediction from NextBus", function () {
        var modelUnderTest,
            mockServer;

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

    describe("Fetch and load routeList from NextBus", function () {
        var collectionUnderTest,
            mockServer;

        beforeEach(function () {
            mockServer = sinon.fakeServer.create();

            mockServer.respondWith(routeListURL,
                [ 200, {"Content-Type": "application/xml"}, XMLRouteList ]
            );

            collectionUnderTest = new RouteList();
            collectionUnderTest.agencyTag = "mbta";

            collectionUnderTest.fetch();

            mockServer.respond();
        });

        it("routeList.url() is correct", function () {
            expect(collectionUnderTest.url()).toBe(routeListURL);
        });
        it("routeList should contain a collection of the correct routes", function () {
            expect(collectionUnderTest.at(0).attributes.title).toBe("1");
            expect(collectionUnderTest.at(0).attributes.tag).toBe("1");
        });
    });

    describe("Fetch routeConfig from NextBus", function () {
        var modelUnderTest,
            routeList,
            mockServer;

        beforeEach(function () {

            mockServer = sinon.fakeServer.create();

            mockServer.respondWith(routeConfigURL,
                [200, {"Content-Type": "application/xml"}, XMLRouteConfig]
            );

            modelUnderTest = new Route({ tag: "89"});
            routeList = new RouteList();
            // add the route to a routelist
            routeList.add(modelUnderTest);
            routeList.agencyTag = "mbta";
        });

        it("has this.attributes.tag set correctly", function () {
            expect(modelUnderTest.attributes.tag).toBe("89");
        });
        it("belongs to the routelist collection", function () {
            expect(modelUnderTest.collection).toBeDefined();
        });
        it("has the correct this.collection.agencyTag", function () {
            expect(modelUnderTest.collection.agencyTag).toBe("mbta");
        });
        it("request url is correct", function () {
            expect(modelUnderTest.url()).toBe(routeConfigURL);
        });

        it("modelundertest creates a stoplist", function () {
            expect(modelUnderTest.stops).toBeDefined();
        });
        it("modelundertest creates a directionlist", function () {
            expect(modelUnderTest.directions).toBeDefined();
        });
        it("fetches correct xml which populates the directionlist", function () {

            modelUnderTest.fetch();
            mockServer.respond();

            expect(modelUnderTest.routeXml).toBeDefined();
            expect(modelUnderTest.directions.length).toBeGreaterThan(0);
            expect(modelUnderTest.directions.at(0).attributes.title).toBe("Clarendon Hill via Broadway & Davis");
        });

    });

    describe("Extract and use data from routeConfig", function () {
        var modelUnderTest, // test route object
            routeList,
            mockServer,
            directionUnderTest; // test direction object

        beforeEach(function () {

            mockServer = sinon.fakeServer.create();

            mockServer.respondWith(routeConfigURL,
                [200, {"Content-Type": "application/xml"}, XMLRouteConfig]
            );

            modelUnderTest = new Route({ tag: "89"});
            routeList = new RouteList();
            // add the route to a routelist
            routeList.add(modelUnderTest);
            routeList.agencyTag = "mbta";
            modelUnderTest.fetch();
            mockServer.respond();

            directionUnderTest = modelUnderTest.directions.at(1); // Davis Square via Broadway
        });
        it("the correct test direction object has been selected", function () {
            expect(directionUnderTest.attributes.tag).toBe("89_0_var1");
        });
        it("builds the stoplist", function () {
            expect(directionUnderTest.route.stops).toBeDefined();
            directionUnderTest.loadStops();

            expect(modelUnderTest.stops.length).toBeGreaterThan(0);
        });
        it("uses a cached stop if one exists", function () {
            // how can I put something in the cache before we test
            // create a new stop, and insert it into stops
            // to verify that it's the one you put into the cache first, change the name on it!
            // if you are looking up stop 2874, create a stop with tag 2874, and a name like "MY TEST NAME"
            // get that stop, and verify it's got your new name on it (and not the correct one)
            //<stop tag="2874" title="Sullivan Station - Upper Busway" lat="42.3839799" lon="-71.07699" stopId="02874"/>
            var TEST_TITLE = "MY TEST TITLE",
                testCachedStop = new Stop({ tag: "2874", title: TEST_TITLE });
            directionUnderTest.route.stops.add(testCachedStop);
            directionUnderTest.loadStops();

            expect(modelUnderTest.stops.at(0).attributes.title).toBe(TEST_TITLE);
        });

        it("add title/lat/lon/stopId to each stop in stoplist", function () {
            directionUnderTest.loadStops();
            var testStop = modelUnderTest.stops.at(0);
            expect(testStop.attributes.title).toBe("Sullivan Station - Upper Busway");
            expect(testStop.attributes.lat).toBe("42.3839799");
            expect(testStop.attributes.stopId).toBe("02874");
        });
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

});