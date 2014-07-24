define(["jquery", "backbone", "m.direction", "c.vehiclepredictionlist"],
    function ($, Backbone, Direction, VehiclePredictionList) {
        return Backbone.Collection.extend({
            model: Direction,
            comparator: "name",
            url:"http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=mbta&r=89&s=2729",

            load: function (data) {
                var self = this,
                    content;
                $(data).find("direction").each(function () {
                    content = $(this);

                    var direction = new Direction({ title: content.attr("title") });
                    if (content.tag) {
                        direction.tag = content.attr("tag");
                        direction.name = content.attr("name");
                        direction.route = self.route;
                        // Set direction.data to refer to the xml node containing the direction.
                        direction.$data = content;
                    } else {
                        direction.predictions = new VehiclePredictionList();
                        direction.predictions.load(content);
                    }
                    //and add each direction to collection
                    self.add(direction);
                });
                //tidy up collection (alphabetize by in/outbound)
                self.sort();
            }
        });
    });