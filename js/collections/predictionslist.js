define(["jquery", "backbone", "m.predictions"],
    function ($, Backbone, Predictions) {

        //collection: RouteList
        return Backbone.Collection.extend({
            model: Predictions,

            url: function () {
                return "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=" +
                    this.agencyTag + "&r=" + this.routeTag + "&s=" + this.stopTag
            },

            // todo: research way to set a default options.dataType = "xml", so fetch does not need to be overridden
            fetch: function (options) {
                options || (options = {});
                options.dataType = "xml";
                Backbone.Collection.prototype.fetch.call(this, options);
            },

            parse: function (data) {
                var parsed = [],
                    content;
                $(data).find("predictions").each(function () {
                    content = $(this);
                    parsed.push({
                        agencyTitle: content.attr("agencyTitle"),
                        routeTag: content.attr("routeTag"),
                        stopTitle: content.attr("stopTitle"),
                        stopTag: content.attr("stopTag")
                    });
                });
                return parsed;
            }
        });
    });