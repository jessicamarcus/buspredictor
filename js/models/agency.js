define(["backbone"],
    function (Backbone) {
        //model: Agency
        return Backbone.Model.extend({
            defaults: {
                //routes: [],
                tag: "no tag",
                title: "no title",
                regionTitle: "no regionTitle",
                //not always present:
                shortTitle: ""
            }
        });
});