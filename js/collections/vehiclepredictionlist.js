define(["jquery", "backbone", "m.vehicleprediction"],
    function ($, Backbone, VehiclePrediction) {
        return Backbone.Collection.extend({
            model: VehiclePrediction,
            load: function (data) {
                var self = this,
                    content;
                $(data).find("prediction").each(function () {
                    content = $(this);
                    var prediction = new VehiclePrediction({
                        epochTime: content.attr("epochTime"),
                        minutes: content.attr("minutes"),
                        isDeparture: content.attr("isDeparture"),
                        //not always present
                        delayed: content.attr("delayed"),
                        slowness: content.attr("slowness")
                    });
                    self.add(prediction);
                });
            }
        });
    });