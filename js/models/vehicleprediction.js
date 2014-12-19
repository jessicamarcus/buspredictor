define(["backbone", "utilities"],
    function (Backbone, Utilities) {
        return Backbone.Model.extend({
            // this is an individual bus
            initialize: function () {
                this.attributes.arrivalTime = Utilities.utcToLocal12hrTime(this.attributes.epochTime);
            },
            // this flag is set via vehiclepredictionlist.setAlert()
            isOnAlert: false
        })
    }
);