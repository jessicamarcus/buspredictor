define(["backbone", "handlebars", "v.stoplistview", "text!views/templates/dirTemplate.html"],
    function (Backbone, Handlebars, StopListView, DirTemplate) {

        return Backbone.View.extend({
            el: "#dirList",
            template: Handlebars.compile(DirTemplate),

            initialize: function () {
                var self = this;

                function loadStops() {
                    var dirTag = $("#dirList").val();
                    self.selectedDir = self.collection.findWhere({tag: dirTag});

                    if (!self.stopListView) {
                        self.stopListView = new StopListView({collection: self.selectedDir.stops});
                        self.stopListView.parent = self;
                        self.stopListView.listenTo(self.selectedDir.stops, 'add', function () {
                            self.stopListView.render();
                        });
                        self.stopListView.listenTo(self, 'render', function () {
                            self.stopListView.collection.reset();
                            self.stopListView.render();
                        });
                    }
                    self.selectedDir.getStops();
                }
                this.$el.change(loadStops);
            },

            render: function () {
                this.$el.empty();

                if (this.collection.length) {
                    this.$el.closest('li').removeClass('hidden');
                    this.$el.append('<option>Select a direction:</option>');

                    //render each direction
                    this.collection.each(function (dir) {
                        this.$el.append(this.template(dir.toJSON()));
                    }, this);
                } else {
                    this.$el.closest('li').addClass('hidden');
                }
                this.trigger('render');
            }
        })
    }
);