define(["jquery", "backbone", "handlebars", "v.directionlistview", "text!views/templates/routeTemplate.html"],
    function ($, Backbone, Handlebars, DirListView, RouteTemplate) {

        return Backbone.View.extend({
            el: "#routeList",
            itemTemplate: Handlebars.compile(RouteTemplate),

            initialize: function () {

                this.$el.change(this.changeDdl);
            },

            render: function () {
                // clear child DOM
                this.$el.empty();
                this.$el.append('<option>Select a route:</option>');
                this.collection.each(function (item) {
                    //render the routes
                    this.$el.append(this.itemTemplate(item.toJSON()));
                }, this);
            },

            changeDdl: function () {

                var routeTag = $("#routeList").val();
                //var routeTag = $(this).val();
                this.selectedRoute = this.collection.findWhere({tag: routeTag});

                if (this.dirListView) {
                    this.dirListView.collection = this.selectedRoute.directions;
                    //or create it if needed
                } else {
                    self.dirListView = new DirListView({collection: this.selectedRoute.directions});
                }
                this.dirListView.render();

                this.dirListView.listenTo(this.selectedRoute.directions, 'add sync', this.dirListView.render);

                this.selectedRoute.fetch();
            }
        });

    });