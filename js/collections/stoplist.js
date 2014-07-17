define(["jquery", "backbone", "m.stop"],
    function ($, Backbone, Stop) {

        //collection: RouteList
        return Backbone.Collection.extend({
            model: Stop,

            parse: function (data) {
                var parsed = [],
                    content;
                $(data).find("stop").each(function () {
                    content = $(this);
                    parsed.push({
                        tag: content.attr("tag"),
                        title: content.attr("title"),
                        lat: content.attr("lat"),
                        lon: content.attr("lon"),
                        //if present:
                        stopId: content.attr("stopId"),
                        shortTitle: content.attr("shortTitle")
                    });
                });
                return parsed;
            }
        });
    });