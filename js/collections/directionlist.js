define(["jquery", "backbone", "m.direction", "c.vehiclepredictionlist"],
    function ($, Backbone, Direction, VehiclePredictionList) {
        return Backbone.Collection.extend({
            // this collection/obj is dual-purpose: utilized with the series of dropdowns, and then again for a prediction.
            model: Direction,

            load: function (data) {
                var self = this,
                    content;
                $(data).find("direction").each(function () {
                    content = $(this);

                    var direction = new Direction({ title: content.attr("title") });
                    if (content.attr("tag")) {
                        direction.attributes.tag = content.attr("tag");
                        direction.attributes.name = content.attr("name");
                        // Add a reference to the parent route so we have it for later use.
                        direction.route = self.route;
                        direction.agencyTag = self.route.agencyTag;
                        direction.routeTag = self.route.attributes.tag;
                        // Set direction.data to refer to the xml node containing the direction.
                        direction.$data = content;
                    } else {
                        direction.vehiclePredictions = new VehiclePredictionList();
                        direction.vehiclePredictions.load(content);
                    }
                    //and add each direction to collection
                    self.add(direction);
                });
                //tidy up collection (alphabetize by in/outbound)
                //self.sort();
            }
        });
    });