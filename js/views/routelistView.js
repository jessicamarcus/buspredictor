define(["jquery", "backbone", "handlebars", "v.directionlistview", "text!views/templates/routeTemplate.html"],
    function ($, Backbone, Handlebars, DirListView, RouteTemplate) {

        return Backbone.View.extend({
            el: "#routeList",
            itemTemplate: Handlebars.compile(RouteTemplate),

            initialize: function () {
                var self = this;
                this.$el.removeClass('hidden');

                function loadDirections() {
                    var routeTag = $("#routeList").val();
                    self.selectedRoute = self.collection.findWhere({tag: routeTag});

                    if (!self.dirListView) {
                        self.dirListView = new DirListView({collection: self.selectedRoute.directions});
                        self.selectedRoute.fetch();
                        self.dirListView.parent = self;

                        self.dirListView.listenTo(self.selectedRoute.directions, 'add', self.dirListView.render);

                        // Listen to the 'render' event on the routelistview
                        self.dirListView.listenTo(self, 'render', function () {
                            // We have re-rendered the routeListView, so erase the dirListView because when we re-render there is no selected route
                            self.dirListView.collection.reset();
                            self.dirListView.render();
                        });
                    } else {
                        self.dirListView.collection = self.selectedRoute.directions;
                        self.dirListView.listenTo(self.selectedRoute.directions, 'add', self.dirListView.render);
                        self.selectedRoute.fetch();
                    }
                }
                this.$el.change(loadDirections);
            },

            render: function () {
                // clear child DOM
                this.$el.empty();
                this.$el.append('<option>Select a route:</option>');
                this.collection.each(function (item) {
                    // render the routes
                    this.$el.append(this.itemTemplate(item.toJSON()));
                }, this);

                this.trigger('render');
            }
        });
    });