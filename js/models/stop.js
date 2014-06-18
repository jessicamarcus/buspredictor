define(["backbone"],
    function (Backbone) {
        return Backbone.Model.extend({
            defaults: {
                tag: "no tag",
                title: "no title",
                lat: "",
                lon: "",
                //not always present:
                stopId: "",
                shortTitle: ""
            }
        })
    }
);