define(["jquery", "backbone", "models/agency", "collections/agencylist", "views/agencyView"],
    function($, Backbone, Agency, AgencyList, AgencyView) {

    return Backbone.View.extend({
        el: "#agencyList",

        events: {
//            "click select": $("#routes-ddl").removeClass("inactive-ddl")
            "change select": this.requestRoutes
        },

        initialize: function () {
//            this.$el.change(this.requestRoutes);
            this.collection = new AgencyList();
            //go get data from server
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
        },

        requestRoutes: function () {
            var selectedRoute = $(this).val();
            console.log(selectedRoute);
//            selectedAgencyObj.createRoutes(selectedRoute);
            console.log(AgencyList.length);
            var result = AgencyList.findWhere({tag: selectedRoute});
            console.log(result.length);


            //each item in collection
//            this.collection.each(function (agency) {
//                //render the item
//                agency.routes = new RouteList();
//            }, this);
//        },
//        testFind: function () {
//            if (this.collection.contains(this.collection.models, "554")) {
//                console.log("contains, true")
//            }
        }
    });

});