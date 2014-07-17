define(["sinon", "jquery", "jasmine-jquery", "m.predictions", "m.direction", "text!test/data/89davis.xml"], function (sinon, $, jasJq, Predictions, Direction, XMLData) {
    describe("sinon", function () {
        var modelUnderTest, mockServer, testURL;

        beforeEach(function () {
            mockServer = sinon.fakeServer.create();
            modelUnderTest = new Predictions({
                agencyTag: "mbta",
                routeTag: "89",
                stopTag: "2729"
            });
            testURL = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=mbta&r=89&s=2729";
        });

        it("lets us load xml into a backbone model", function() {
            var callback = sinon.spy();

            //	Set up server mock
            mockServer.respondWith(
                "GET",
                testURL,
                [ 200, {"Content-Type": "application/xml"}, XMLData ]
            );

            // bind to change event and have it call the sinon.spy() callback
            modelUnderTest.bind("change", callback);

            // Act
            modelUnderTest.fetch({
                dataType: "xml"
            });
            mockServer.respond();

            // Assert
//            console.log(modelUnderTest.url());

            expect(callback.called).toBeTruthy();
            expect(modelUnderTest.attributes.agencyTitle).toBeDefined();
        })
    });

    describe("jasmine-jquery", function () {
        it("works ok", function () {
            //expect($('#dirlist')).toBeInDOM();
        })
    });

    describe("The Predictions Model", function () {
        var modelUnderTest, mockServer, testURL;

        beforeEach(function () {
            mockServer = sinon.fakeServer.create();
            modelUnderTest = new Predictions({
                agencyTag: "mbta",
                routeTag: "89",
                stopTag: "2729"
            });
            testURL = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=mbta&r=89&s=2729";
            //	Set up server mock
            mockServer.respondWith(
                "GET",
                testURL,
                [ 200, {"Content-Type": "application/xml"}, XMLData ]
            );
            modelUnderTest.fetch({
                dataType: "xml"
            });
            mockServer.respond();
        });

        it("accepts agencyTag, routeTag, and stopTag", function () {
            modelUnderTest = new Predictions({
                agencyTag: "mbta",
                routeTag: "89",
                stopTag: "2729"
            });
            expect(modelUnderTest.attributes.agencyTag).toBe("mbta");
            expect(modelUnderTest.attributes.routeTag).toBe("89");
            expect(modelUnderTest.attributes.stopTag).toBe("2729");
        });
        it("generates a url from above attributes", function () {
            expect(modelUnderTest.url()).toBe(testURL);
        });
        it("has a collection named DirectionList", function () {
            expect(modelUnderTest.directions).toBeDefined();
        });

        describe("Predictions DirectionList", function() {

            it("contains at least one direction", function () {
                expect(modelUnderTest.directions.length).toBeGreaterThan(0);
            });
            describe("any direction in the collection", function () {

                xdescribe("has a vehicle predictionlist", function () {
                    xit("which contains at least one prediction", function () {
                        //expect(modelUnderTest.directions.predictions.length).toBeGreaterThan(0);
                    });
                    xit("should have a max of three vehicle predictions", function () {});
                    xit("should get its data updated each minute", function () {});

                    xdescribe("each prediction", function () {
                        xit("has minutes, epochTime, isScheduleBased", function () {});
                        xit("sometimes has delayed and slowness attributes", function () {});
                        xit("should convert epochTime into local 12hr time for the benefit of the user", function () {});
                    })

                })

            })
        })
    })
});