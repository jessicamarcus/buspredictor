define(["jquery", "backbone", "collections/routelist", "views/routeView"],
    function ($, Backbone, RouteList, RouteView) {

        return Backbone.View.extend({
            el: "#routeList",

            initialize: function () {
//                this.collection = new RouteList();
//                this.collection.fetch({reset: true});
                this.render();

                this.listenTo(this.collection, "reset", this.render);
            },

            render: function () {
                //each item in collection
                this.collection.each(function (item) {
                    //render the item
                    this.renderRoute(item);
                }, this);
            },

            renderRoute: function (item) {
                var routeView = new RouteView({
                    model: item
                });

                this.$el.append(routeView.render().el);
            }
        });

    });