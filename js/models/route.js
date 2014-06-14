define(["backbone", "collections/directionlist"],
    function (Backbone, DirectionList) {
        //Route model
        return Backbone.Model.extend({
            url: function() {
                return "http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=" + this.collection.agencyTag +
                    "&r=" + this.attributes.tag + "&terse";
            },
            defaults: {
                tag: "no tag",
                title: "no title"
            },
            loadConfig: function () {
                var self = this;
                return Backbone.sync('read', this, { url: this.url(), dataType: "xml", success: function (data) {
                    self.routeXml = data;
//                    self.getDirections(data);
                }});
            },

            getDirections: function (data) {
                var self = this;
//                if (self.direction) {
//                    self.
//
//                    this.directions = new DirectionList();
//                    this.directions.load(data);
//                    this.directions.route = this;
////                }
            }
        });
    });