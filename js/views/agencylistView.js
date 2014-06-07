define(["jquery", "backbone", "collections/agencylist", "views/agencyView"],
    function($, Backbone, AgencyList, AgencyView) {

    return Backbone.View.extend({
        el: "#agencyList",

        initialize: function (agencyList) {
            //create the collection
            this.collection = new AgencyList(agencyList);
            this.render();
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