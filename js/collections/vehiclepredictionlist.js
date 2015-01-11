define(["jquery", "backbone", "m.vehicleprediction"],
    function ($, Backbone, VehiclePrediction) {
        return Backbone.Collection.extend({
            model: VehiclePrediction,

            load: function (data) {
                var parsed = [],
                    content;
                $(data).find("prediction").each(function () {
                    content = $(this);
                    parsed.push({
                        epochTime: content.attr("epochTime"),
                        minutes: content.attr("minutes"),
                        isDeparture: content.attr("isDeparture"),
                        // not always present
                        delayed: content.attr("delayed"),
                        slowness: content.attr("slowness")
                    });
                });
                this.reset(parsed);
            },

            setAlert: function () {
                //todo: set alarm / alert on one of the vehiclepredictions
            }
        });
    });