define(["jquery", "backbone", "models/direction"],
    function ($, Backbone, Direction) {
        return Backbone.Collection.extend({
            model: Direction,
            comparator: "name",

            load: function (data) {
                var self = this,
                    content;
                $(data).find("direction").each(function () {
                    content = $(this);
                    var direction = new Direction({
                        tag: content.attr("tag"),
                        title: content.attr("title"),
                        name: content.attr("name")
                    });
                    // Set direction.data to refer to the xml node containing the direction.
                    direction.$data = content;
                    direction.route = self.route;
                    //add each direction to collection
                    self.add(direction);
                });
                //tidy up collection (alphabetize by in/outbound)
                self.sort();
            }
        })
    }
);