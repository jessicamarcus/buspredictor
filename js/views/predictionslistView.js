define(["backbone", "handlebars", "text!views/templates/predictionTemplate.html"],
    function (Backbone, Handlebars, PredictionTemplate) {
        return Backbone.View.extend({
            el: '#busPredictions',
            template: Handlebars.compile(PredictionTemplate),

            render: function () {
                this.collection.each(function (prediction) {
                    this.$el.append(this.template(prediction.toJSON()));
                }, this);
            }
        })
    });