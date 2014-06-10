define(["backbone"],
    function (Backbone) {
        //Route model
        return Backbone.Model.extend({
            defaults: {
                tag: "no tag",
                title: "no title"
            }
        });
    });