define(["backbone", "handlebars", "text!views/templates/predictionTemplate.html"],
    function (Backbone, Handlebars, PredictionTemplate) {
        return Backbone.View.extend({
            className: 'route-prediction',
            template: Handlebars.compile(PredictionTemplate),

            initialize: function () {
                this.render();
            },

            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
            }
        })
    });