var app = app || {};

app.AgencyView = Backbone.View.extend({
    tagName: "option",
    className: "agency-item",
    template: Handlebars.compile($("#agency-template").html()),

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});