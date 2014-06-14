define(["backbone", "handlebars", "collections/directionlist", "text!views/templates/dirTemplate.html"],
    function (Backbone, Handlebars, DirList, DirTemplate) {

        return Backbone.View.extend({
            el: "#dirList",

            template: Handlebars.compile(DirTemplate),

            render: function () {
//                this.$el.empty();

                this.collection.each(function (item) {
                    //render the item
                    this.$el.append(this.template(item.toJSON()));
                }, this);
            }

        })
    }
);