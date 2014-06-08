define(["backbone"],
    function (Backbone) {
        //model: Agency
        return Backbone.Model.extend({
            defaults: {
                tag: "no tag",
                title: "no title",
                regionTitle: "no regionTitle",
                //not always present:
                shortTitle: ""
            }
        });
});