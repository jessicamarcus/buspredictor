define(["underscore", "backbone"],
    function(_, Backbone) {
        return Backbone.Model.extend({
            defaults: {
                tag: "no tag",
                title: "no title",
                regionTitle: "no regionTitle"
            }
        });
});