define(["backbone", "handlebars", "text!views/templates/routeTemplate.html"],
    function(Backbone, Handlebars, RouteTemplate) {

        return Backbone.View.extend({
            tagName: "option",
            template: Handlebars.compile(RouteTemplate),
            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            }
        });
    });