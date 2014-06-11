define(["backbone", "collections/routelist"],
    function (Backbone, RouteList) {
        //Agency model
        return Backbone.Model.extend({
            defaults: {
                tag: "no tag",
                title: "no title",
                regionTitle: "no regionTitle",
                //not always present:
                shortTitle: ""
            },
            getRoutes: function(callback) {
                if (!this.routes) {
                    //make child collection of routes upon user selection
                    this.routes = new RouteList();
                    this.routes.agencyTag = this.attributes.tag.toLowerCase();
                    this.routes.fetch({reset: true, success: callback });
                }
                else {
                    callback.call(this);
                }
            }
        });
});