define(["backbone", "handlebars", "text!views/templates/dirTemplate.html"],
    function (Backbone, Handlebars, DirTemplate) {

        return Backbone.View.extend({
            el: "#dirList",
            template: Handlebars.compile(DirTemplate),

            render: function () {
                this.$el.empty();
                //render each direction
                this.collection.each(function (dir) {
                    this.$el.append(this.template(dir.toJSON()));
                    // add itembound event
                    this.trigger("itembound", dir);
                }, this);
            }

        })
    }
);