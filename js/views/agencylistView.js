define(["jquery", "backbone", "handlebars", "underscore", "c.agencylist", "v.routelistView", "text!t.agencyTemplate"],
    function ($, Backbone, Handlebars, _, AgencyList, RouteListView, AgencyTemplate) {

    return Backbone.View.extend({
        el: "#agencyList",

        events: {
//            "click select": $("#routes-ddl").removeClass("inactive-ddl")
//            "change #agencyList": this.requestRoutes
        },

        initialize: function () {
            var self = this;

            this.$el.change(function () {
                var agencyTag = $("#agencyList").val();
                self.selectedAgency = self.collection.findWhere({tag: agencyTag});

                //when user makes selection on this dropdown, request selected agency's routes
                if (self.selectedAgency) {

                    self.selectedAgency.getRoutes(function () {
                        //display self.selectedAgency.routes
                        if (self.routeListView) {
                            self.routeListView.collection = self.selectedAgency.routes;
                            //or create it if needed
                        } else {
                            self.routeListView = new RouteListView({collection: self.selectedAgency.routes});
                        }
                        self.routeListView.render();
                    });
                    //unless they choose the default "select an agency" option
                } else {
                    //$("#dirlist").empty();
                }
            });
            this.collection = new AgencyList();
            //go get data from server
            this.collection.fetch({reset: true});
            this.render();
            this.listenTo(this.collection, "reset", this.render);
        },

        itemTemplate: Handlebars.compile(AgencyTemplate),

        render: function () {
            //each agency in collection
            this.collection.each(function (item) {
                //render the agency
                this.$el.append(this.itemTemplate(item.toJSON()));
            }, this);
        }
    });

});