define(["backbone", "collections/directionlist", "collections/stoplist"],
    function (Backbone, DirectionList, StopList) {
        //Route model
        return Backbone.Model.extend({
            url: function () {
                return "http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=" + this.collection.agencyTag +
                    "&r=" + this.attributes.tag + "&terse";
            },
            defaults: {
                tag: "no tag",
                title: "no title"
            },
            directions: new DirectionList(),
            stops: new StopList(),
            //request routeConfig from nextbus; store xml and generate list of route's directions
            loadConfig: function () {
                var self = this;
                self.directions.route = self;
                return Backbone.sync('read', this, { url: this.url(), dataType: "xml", success: function (data) {
                    // ensure that routeXml is the route node in routeConfig
                    self.routeXml = $(data).find('route').first();
                    //clear & update displayed collection
                    self.directions.reset(self.directions.load(data));
                }});
            }

        });
    });