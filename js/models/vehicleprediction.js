define(["backbone", "utc"],
    function (Backbone, Utc) {
        return Backbone.Model.extend({
            // this is an individual bus
            initialize: function () {
                this.attributes.arrivalTime = Utc.utcToLocal12hrTime(this.attributes.epochTime);
            },
            // this flag is set via vehiclepredictionlist.setAlert()
            isOnAlert: false
        })
    }
);