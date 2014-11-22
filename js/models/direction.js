define(["jquery", "backbone", "m.stop", "c.stoplist", "c.vehiclepredictionlist"],
    function ($, Backbone, Stop, StopList, VehiclePredictionList) {
        return Backbone.Model.extend({
            stops: new StopList(),

            getStops: function () {
                // check to see if this.stops has any stops in it
                //      if not, call loadStops
                // otherwise return this.stops
            },
            loadStops: function () {
                var self = this;
                // fill this.stops with (real) stops referenced by -
                // get reference stops found in this.data
                self.$data.find("stop").each(function () {
                    var currentStop,
                        stopTag = $(this).attr("tag");

                    // Find the data in the cache, first:       get the actual stop for the reference stop
                    if (self.route.stops.length > 0) {
                        currentStop = self.route.stops.findWhere({ tag: stopTag });
                    }
                    if (!currentStop) {

                        // cache miss
                        var $stopNode = $(self.route.routeXml).children("stop[tag='" + stopTag + "']");
                        // create a stop using the node data that we found in routeXml
                        currentStop = new Stop({
                           // parse the node
                            tag: $stopNode.attr("tag"),
                            title: $stopNode.attr("title"),
                            lat: $stopNode.attr("lat"),
                            lon: $stopNode.attr("lon"),
                            //if present:
                            stopId: $stopNode.attr("stopId"),
                            shortTitle: $stopNode.attr("shortTitle")
                        });
                        // add to cache
                        self.route.stops.add(currentStop);
                        // add to direction's stops
                    }
                    // cache hit
                    // if we have a stop already loaded into this.route.stops (cache)
                    // add it to the direction's stops
                    if (currentStop) self.stops.add(currentStop);
                });
            }
//            loadPredictions: function (data) {
//                var parsed = {},
//                    content = {};
//                $(data).find("prediction").each(function () {
//                    content = $(this);
//                    parsed = {
//                        agencyTitle: content.attr("agencyTitle"),
//                        routeTag: content.attr("routeTag"),
//                        stopTitle: content.attr("stopTitle"),
//                        stopTag: content.attr("stopTag")
//                    };
//                    // have this also load directions, etc.
//                    // instantiate directionlist and pass in data obj
//                });
//                this.predictions = new VehiclePredictionList();
//                this.predictions.load(data);
//
//                return parsed;
//            }
        })
    }
);