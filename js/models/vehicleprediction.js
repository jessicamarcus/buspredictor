define(["backbone", "util.utc_handlers"],
    function (Backbone, utcToLocal12hrTime) {
        return Backbone.Model.extend({
            initialize: function () {
               //this.epochTime = utcToLocal12hrTime(this.epochTime);
            }
        })
    }
);