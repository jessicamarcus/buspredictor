define(["backbone", "models/agency"],
    function(Backbone, Agency) {

        return Backbone.Collection.extend({
            model: Agency
    //    url: "data/agencylist.xml",
    //
    //    parse: function(data) {
    //
    //    }
        });
});