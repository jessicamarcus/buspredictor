define(["jquery", "backbone", "handlebars", "v.directionlistview", "v.stoplistview", "text!views/templates/routeTemplate.html"],
    function ($, Backbone, Handlebars, DirListView, StopListView, RouteTemplate) {

        return Backbone.View.extend({
            el: "#routeList",

            initialize: function () {
                var self = this;

                this.$el.change(function () {
                        var routeTag = $("#routeList").val();
                        self.selectedRoute = self.collection.findWhere({tag: routeTag});
                        //if (!self.selectedRoute.routeXml) {  }

                        var dirListView = new DirListView({collection: self.selectedRoute.directions});

                        dirListView.listenTo(self.selectedRoute.directions, 'add sync', dirListView.render);

                        dirListView.on("itembound", function (direction) {
                            var itemElement = this.$el.find('#dir' + direction.attributes.tag);

                            itemElement.click(function () {
                                var stopListView = new StopListView({collection: direction.stops});
                                // if stops have already been loaded...
                                if (direction.stops.length) { return stopListView.render() }
                                // otherwise load
                                stopListView.listenTo(direction.stops, 'change add sync', stopListView.render);
                                direction.loadStops();
                            });
                        }, dirListView);
                        self.selectedRoute.loadConfig();
                    }
                );
            },

            itemTemplate: Handlebars.compile(RouteTemplate),

            render: function () {
                // clear child DOM
                this.$el.empty();
                this.collection.each(function (item) {
                    //render the routes
                    this.$el.append(this.itemTemplate(item.toJSON()));
                }, this);
            }
        });

    });