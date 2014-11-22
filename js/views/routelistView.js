define(["jquery", "backbone", "handlebars", "v.directionlistview", "text!views/templates/routeTemplate.html"],
    function ($, Backbone, Handlebars, DirListView, RouteTemplate) {

        return Backbone.View.extend({
            el: "#routeList",

            initialize: function () {
                var self = this;

                this.$el.change(function () {
                    var routeTag = $("#routeList").val();
                    self.selectedRoute = self.collection.findWhere({tag: routeTag});

                    var dirListView = new DirListView({collection: self.selectedRoute.directions});

                    dirListView.listenTo(self.selectedRoute.directions, 'add sync', dirListView.render);

                    self.selectedRoute.fetch();
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