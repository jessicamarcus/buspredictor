define(["backbone", "handlebars", "v.predictionsview"],
    function (Backbone, Handlebars, PredictionsView) {
        return Backbone.View.extend({
            el: '#busPredictions',

            initialize: function () {
                // I believe this is usually handled by things that create the view & apply model to it
                this.listenTo(this.collection, 'add', this.render);
            },

            render: function () {
                this.$el.empty();
                this.collection.each(function (routePrediction) {
                    var newView = new PredictionsView({model: routePrediction});
                    this.$el.append(newView.el);
                }, this);
            }
        })
    });