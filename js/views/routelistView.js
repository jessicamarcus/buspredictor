define(["backbone", "handlebars", "collections/routelist", "text!views/templates/routeTemplate.html"],
    function (Backbone, Handlebars, RouteList, RouteTemplate) {

        return Backbone.View.extend({
            el: "#routeList",

            initialize: function () {
                this.$el.change(this.requestConfig);
//                this.collection = new RouteList();
//                this.collection.fetch({reset: true});
                this.render();

                this.listenTo(this.collection, "reset", this.render);
            },

            itemTemplate: Handlebars.compile(RouteTemplate),

            render: function () {
                //each item in collection
                this.collection.each(function (item) {
                    //render the item
                    this.$el.append(this.itemTemplate(item.toJSON()));
                }, this);
            },

            requestConfig: function () {
                //do stuff
            }

        });

    });