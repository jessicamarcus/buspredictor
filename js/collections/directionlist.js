define(["jquery", "backbone", "m.direction", "c.vehiclepredictionlist"],
    function ($, Backbone, Direction, VehiclePredictionList) {
        return Backbone.Collection.extend({
            model: Direction,
            comparator: "name",

            load: function (data) {
                var self = this,
                    content;
                $(data).find("direction").each(function () {
                    content = $(this);
//                    var direction = new Direction({
//                        tag: content.attr("tag"),
//                        title: content.attr("title"),
//                        name: content.attr("name")
//                    });
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
            },
            getDirections: function (data) {
                var self = this,
                    content;
                $(data).find("direction").each(function () {
                    content = $(this);
                    var direction = new Direction({ title: content.attr("title") });
                    self.add(direction);
                });

            }
        })
    }
);