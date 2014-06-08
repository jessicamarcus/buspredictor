define(["jquery", "backbone", "models/route"],
    function ($, Backbone, Route) {

        //collection: RouteList
        return Backbone.Collection.extend({
            model: Route,
            //url: "http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=" + agency.tag().toLowerCase()",
            url: "data/routelist.xml",

            fetch: function (options) {
                options || (options = {});
                options.dataType = "xml";
                Backbone.Collection.prototype.fetch.call(this, options);
            },

            parse: function (data) {
                var parsed = [],
                    content;
                $(data).find("route").each(function (index) {
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