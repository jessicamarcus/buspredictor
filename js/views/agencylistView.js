define(["jquery", "backbone", "collections/agencylist", "views/agencyView"],
    function($, Backbone, AgencyList, AgencyView) {

    return Backbone.View.extend({
        el: "#agencyList",

        initialize: function () {
            this.collection = new AgencyList();
            this.collection.fetch({reset: true});
            this.render();

            this.listenTo(this.collection, "reset", this.render);
        },

        render: function () {
            //each item in collection
            this.collection.each(function (item) {
                //render the item
                this.renderAgency(item);
            }, this);
        },

        renderAgency: function (item) {
            var agencyView = new AgencyView({
                model: item
            });

            this.$el.append(agencyView.render().el);
        }
    });

});