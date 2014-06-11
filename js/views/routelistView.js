define(["backbone", "handlebars", "collections/routelist", "text!views/templates/routeTemplate.html"],
    function (Backbone, Handlebars, RouteList, RouteTemplate) {

        return Backbone.View.extend({
            el: "#routeList",

            initialize: function () {
                var self = this;
                this.$el.change(function () {
                        var routeTag = $("#routeList").val();
                        self.selectedRoute = self.collection.findWhere({tag: routeTag});
                        self.selectedRoute.loadConfig();
                    }
                );
//                this.collection = new RouteList();
//                this.collection.fetch({reset: true});
                //this.render();

            },

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