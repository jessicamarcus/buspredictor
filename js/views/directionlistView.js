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

                        if (!stopListView) {
                            var stopListView = new StopListView({collection: self.selectedDir.stops});
                            stopListView.listenTo(self.selectedDir.stops, 'add', function () {
                                stopListView.render();
                            });
                        }
                    //self.selectedDir.on('change', stopListView.render, stopListView);
                    self.selectedDir.getStops();

                    }
                );
            },
            render: function () {
                this.$el.empty();
                this.$el.append('<option>Select a direction:</option>');
                //render each direction
                this.collection.each(function (dir) {
                    this.$el.append(this.template(dir.toJSON()));
                }, this);
            },
            updateStops: function () {}

        })
    }
);