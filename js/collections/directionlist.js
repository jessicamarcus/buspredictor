define(["jquery", "backbone", "models/direction"],
    function ($, Backbone, Direction) {
        return Backbone.Collection.extend({
            model: Direction,

            load: function (data) {
                var self = this;
                var content;
                $(data).find("direction").each(function () {
                    content = $(this);
                    var direction = new Direction({
                        tag: content.attr("tag"),
                        title: content.attr("title"),
                        name: content.attr("name")
                    });
                    direction.data = this;
                    self.add(direction);
                });
            }
        })
    }
);