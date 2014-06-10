define(["jquery", "backbone", "models/route", "models/agency"],
    function ($, Backbone, Route, Agency) {

        //collection: RouteList
        return Backbone.Collection.extend({
            model: Route,
            generatedurl: "http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=" + Agency,
            url: "data/routelist.xml",

            fetch: function (options) {
                console.log(this.generatedurl);
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