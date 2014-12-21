define(["backbone", "handlebars", "text!views/templates/stopTemplate.html"],
    function (Backbone, Handlebars, StopTemplate) {

        return Backbone.View.extend({
            el: "#stopList",
            template: Handlebars.compile(StopTemplate),

            render: function () {
                this.$el.empty();

                if (this.collection.length) {
                    this.$el.removeClass('hidden');
                    this.$el.append('<option>Select a stop:</option>');

                    this.collection.each(function (stop) {
                        this.$el.append(this.template(stop.toJSON()));
                    }, this);
                } else {
                    this.$el.addClass('hidden');
                }
            }

        });
    }
);