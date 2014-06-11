define(["backbone"],
    function (Backbone) {
        //Route model
        var Route = Backbone.Model.extend({
            url: function() {
                return "http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=" + this.collection.agencyTag +
                    "&r=" + this.attributes.tag;
            },
            defaults: {
                tag: "no tag",
                title: "no title"
            },
            loadConfig: function () {
                var url = this.url();
                var xhr = Backbone.sync('read', this, { dataType: "xml" });
            }
        });
        return Route;
    });