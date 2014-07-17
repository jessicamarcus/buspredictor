define(["backbone", "jquery", "c.directionlist"],
    function (Backbone, $, DirectionList) {
        return Backbone.Model.extend({

            url: function () {
                return "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=" +
                    this.attributes.agencyTag + "&r=" + this.attributes.routeTag + "&s=" + this.attributes.stopTag
            },

            parse: function (data) {
                var parsed = {},
                    content = {};
                $(data).find("predictions").each(function () {
                    content = $(this);
                    parsed = {
                        agencyTitle: content.attr("agencyTitle"),
                        routeTag: content.attr("routeTag"),
                        stopTitle: content.attr("stopTitle"),
                        stopTag: content.attr("stopTag")
                    };
                    // have this also load directions, etc.
                    // instantiate directionlist and pass in data obj
                });
                this.directions = new DirectionList();
                this.directions.getDirections(data);
                return parsed;
            }
        });
    }
);