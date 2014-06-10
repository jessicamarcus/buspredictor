define(["jquery", "backbone", "models/agency"],
    function ($, Backbone, Agency) {

        //collection: AgencyList
        return Backbone.Collection.extend({
            model: Agency,
            //url: "http://webservices.nextbus.com/service/publicXMLFeed?command=agencyList",
            url: "data/agencylist.xml",

            fetch: function (options) {
                options || (options = {});
                options.dataType = "xml";
                Backbone.Collection.prototype.fetch.call(this, options);
            },

            parse: function (data) {
                var parsed = [],
                    content;
                $(data).find("agency").each(function () {
                    content = $(this);
                    parsed.push({
                        tag: content.attr("tag"),
                        title: content.attr("title"),
                        regionTitle: content.attr("regionTitle"),
                        shortTitle: content.attr("shortTitle")
                    });
                });
                return parsed;
            },

            getRoutes: function (agency) {
//                run createRoutes on agency in collection
            }
    });
});