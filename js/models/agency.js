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
            createRoutes: function (agencyTag) {
                this.routes = new RouteList(agencyTag.toLowerCase());
                console.log("createRoutes fired");
            }
        });
});