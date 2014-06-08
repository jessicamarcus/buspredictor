define(["jquery", "backbone", "collections/agencylist", "views/agencyView", "views/routelistView"],
    function($, Backbone, AgencyList, AgencyView, RouteListView) {

    return Backbone.View.extend({
        el: "#agencyList",

//        events: {
//            "change select": "getRoutes"
//        },

        initialize: function () {
            this.collection = new AgencyList();
            //go get data from server
            this.collection.fetch({reset: true});
            this.render();

            this.listenTo(this.collection, "reset", this.render);
            this.listenTo(this.collection, "reset", this.getRoutes);
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
        },

        getRoutes: function () {
            //each item in collection
            this.collection.each(function (agency) {
                //render the item
                agency.routes = new RouteListView({
                    model: agency
                });
            }, this);
        }
    });

});