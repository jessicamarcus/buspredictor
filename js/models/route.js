define(["backbone", "c.directionlist", "c.stoplist"],
    function (Backbone, DirectionList, StopList) {
        //Route model
        return Backbone.Model.extend({
            url: function () {
                return "http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=" + this.collection.agencyTag +
                    "&r=" + this.attributes.tag + "&terse";
            },
            directions: new DirectionList(),
            stops: new StopList(),

            //request routeConfig from nextbus; store xml and generate list of route's directions
//            loadConfig: function () {
//                var self = this;
//                self.directions.route = self;
//                return Backbone.sync("add read", this, { url: this.url(), dataType: "xml", success: function (data) {
//                    // ensure that routeXml is the route node in routeConfig
//                    self.routeXml = $(data).find("route").first();
//                    //clear & update displayed collection
//                    self.directions.reset(self.directions.load(data));
//                }});
//            },

            fetch: function (options) {
                options || (options = {});
                options.dataType = "xml";
                options.success = function (model, data, options) {
                    // when called for the route from RouteList's parse - data will be just { tag: "blah", title: "blah" }
                    // when called from the route's own parse - data will be the routeConfig xml
                    var parsed,
                        content;
                    var self = this;
                    self.routeXml = $(data).find("route").first();
                    //clear & update displayed collection
                    self.directions.reset(self.directions.load(data));
                    content = self.routeXml;
                    parsed = {
                        tag: content.attr("tag"),
                        title: content.attr("title")
                    };

                    return parsed;
                };
                Backbone.Model.prototype.fetch.call(this, options);
            }
        });
    });