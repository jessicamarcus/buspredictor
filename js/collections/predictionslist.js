define(["jquery", "backbone", "m.predictions"],
    function ($, Backbone, Predictions) {
        return Backbone.Collection.extend({
            // this collection may contain predictions for multiple routes/stops
            // only one predictionsList instantiated per session
            model: Predictions
        });
    });
