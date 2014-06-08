define(["backbone"],
    function (Backbone) {
        //model: Route
        return Backbone.Model.extend({
            defaults: {
                tag: "no tag",
                title: "no title"
            }
        });
    });