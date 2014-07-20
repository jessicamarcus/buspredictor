define(["backbone", "utilities"],
    function (Backbone, Utilities) {
        return Backbone.Model.extend({
            initialize: function () {
                this.attributes.arrivalTime = Utilities.utcToLocal12hrTime(this.attributes.epochTime);
            }
        })
    }
);