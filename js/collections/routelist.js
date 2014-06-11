define(["jquery", "backbone", "models/route"],
    function ($, Backbone, Route) {

        //collection: RouteList
        return Backbone.Collection.extend({
            model: Route,
//            url: "data/routelist.xml",
            url: function() {
                return "http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=" + this.agencyTag
            },

            fetch: function (options) {
                options || (options = {});
                options.dataType = "xml";
                Backbone.Collection.prototype.fetch.call(this, options);
            },

            parse: function (data) {
                var parsed = [],
                    content;
                $(data).find("route").each(function () {
                    content = $(this);
                    parsed.push({
                        tag: content.attr("tag"),
                        title: content.attr("title")
                    });
                });
                return parsed;
            }
        });
    });