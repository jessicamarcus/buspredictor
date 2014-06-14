define(["backbone", "handlebars", "collections/routelist", "views/directionlistView", "text!views/templates/routeTemplate.html"],
    function (Backbone, Handlebars, RouteList, DirView, RouteTemplate) {

        return Backbone.View.extend({
            el: "#routeList",

            initialize: function () {
                var self = this;

                this.$el.change(function () {
                        var routeTag = $("#routeList").val();
                        self.selectedRoute = self.collection.findWhere({tag: routeTag});
                        if (!self.routeXml) { self.selectedRoute.loadConfig() }

                        self.selectedRoute.getDirections();
                        self.dirView = new DirView();
                    }
                );
            },

//            //when user makes selection on this dropdown, request given agency's routes
//            self.selectedAgency.getRoutes(function () {
//
//                //and display route dropdown with self.selectedAgency.routes
//                if (self.routeListView) {
//                    self.routeListView.collection = self.selectedAgency.routes;
//                }
//                else {
//                    self.routeListView = new RouteListView({collection: self.selectedAgency.routes});
//                }
//                self.routeListView.render();
//            });


            itemTemplate: Handlebars.compile(RouteTemplate),

            render: function () {
                // clear child DOM
                this.$el.html('');
                //each item in collection
                this.collection.each(function (item) {
                    //render the item
                    this.$el.append(this.itemTemplate(item.toJSON()));
                }, this);
            },

            requestConfig: function () {

                //do stuff
                console.log("requestConfig fired");
            }

        });

    });