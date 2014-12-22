define(["backbone", "c.directionlist", "c.stoplist"],
    function (Backbone, DirectionList, StopList) {
        //Route model
        return Backbone.Model.extend({
            url: function () {
                return "http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=" + this.collection.agencyTag +
                    "&r=" + this.attributes.tag + "&terse";
            },
            initialize: function () {
                // the routeConfig cmd returns an xml doc that contains all of the data for both directions and stops
                // create the empty collections, and then pass a reference to this route to each
                this.directions = new DirectionList();
                this.directions.route = this;
                this.stops = new StopList();
                this.stops.route = this;
            },

            parse: function (data) {
                var parsed = {},
                    content;
                if ( data.title ) return data;
                $(data).find("route").each(function () {
                    content = $(this);
                    parsed = {
                        tag: content.attr("tag"),
                        title: content.attr("title")
                    };
                });
                return parsed;
            },
            fetch: function (options) {
                options || (options = {});
                options.dataType = "xml";
                options.success = function (model, data, options) {
                   // when called for the route from RouteList's parse - data will be just { tag: "blah", title: "blah" }
                    // when called from the route's own parse - data will be the routeConfig xml
                    model.routeXml = $(data).find("route").first();
                    model.directions.load(data);
                };
                Backbone.Model.prototype.fetch.call(this, options);
            }
        });
    });