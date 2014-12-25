define(["backbone", 'c.predictionslist'],
    function (Backbone, PredictionsList) {
        return Backbone.Model.extend({

            getPrediction: function () {
                var properties = {
                    agencyTag: this.attributes.agencyTag,
                    routeTag: this.attributes.routeTag,
                    stopTag: this.attributes.tag
                    };
                console.log(properties);
                //this.predictionsList.addPrediction(properties);
            }
        })
    }
);