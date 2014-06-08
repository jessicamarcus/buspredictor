define(["backbone", "handlebars", "text!views/templates/agencyTemplate.html"],
    function(Backbone, Handlebars, AgencyTemplate) {

        return Backbone.View.extend({
        tagName: "option",
        template: Handlebars.compile(AgencyTemplate),
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});