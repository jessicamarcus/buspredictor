define(["backbone", "c.routelist"],
    function (Backbone, RouteList) {
        //Agency model
        return Backbone.Model.extend({
            getRoutes: function (callback) {
                if (!this.routes) {
                    //if this agency has not been selected yet, make child collection of routes
                    this.routes = new RouteList();
                    this.routes.agencyTag = this.attributes.tag.toLowerCase();
                    this.routes.fetch({reset: true, success: callback});
                } else {
                    //otherwise, use extant obj/collection
                    callback.call(this);
                }
            }
        });
});