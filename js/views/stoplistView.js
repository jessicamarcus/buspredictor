define(["backbone", "handlebars", "text!views/templates/stopTemplate.html"],
    function (Backbone, Handlebars, StopTemplate) {

        return Backbone.View.extend({
            el: "#stopList",
            template: Handlebars.compile(StopTemplate),

            render: function () {
                this.$el.empty();
                //render each direction
                this.collection.each(function (stop) {
                    this.$el.append(this.template(stop.toJSON()));

                }, this);
            }

        })
    }
);