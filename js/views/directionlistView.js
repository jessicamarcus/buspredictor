define(["backbone", "handlebars", "v.stoplistview", "text!views/templates/dirTemplate.html"],
    function (Backbone, Handlebars, StopListView, DirTemplate) {

        return Backbone.View.extend({
            el: "#dirList",
            template: Handlebars.compile(DirTemplate),

            initialize: function () {
                var self = this;

                this.$el.change(function () {
                        var dirTitle = $("#dirList").val();
                        self.selectedDir = self.collection.findWhere({title: dirTitle});

                        var stopListView = new StopListView({collection: self.selectedDir.stops});
                        stopListView.listenTo(self.selectedDir.stops, 'add sync', function () {
                            stopListView.render();
                        });

                        self.selectedDir.loadStops();

                    }
                );
            },

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