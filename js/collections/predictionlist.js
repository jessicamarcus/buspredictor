define(["jquery", "backbone", "m.prediction"],
    function ($, Backbone, Prediction) {
        return Backbone.Collection.extend({
            model: Prediction
        })
    });