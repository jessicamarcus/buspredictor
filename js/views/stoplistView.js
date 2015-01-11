define(["backbone", "handlebars", "pagecontroller", "text!views/templates/stopTemplate.html"],
    function (Backbone, Handlebars, PageController, StopTemplate) {
        return Backbone.View.extend({
            el: "#stopList",
            template: Handlebars.compile(StopTemplate),

            initialize: function () {
                var self = this;

                this.$el.change(function () {
                    $('.go').removeClass('hidden');
                });

                $('.go').on('click', function (e) {
                    var selectedStop,
                        stopTag = $('#stopList').val();

                    e.preventDefault();

                    selectedStop = self.collection.findWhere({tag: stopTag});

                    // Raise a 'stopSelected' event on the AgencyListView
                    // This is UGLY but has to be done since these cascading views leave the top-level view
                    // with no knowledge of sub-views, and we need to listen to this event from whatever creates the AgencyListView
                    // self.dirlistview.routelistview.agencylistview.trigger...
                    self.parent.parent.parent.trigger('stopSelected', selectedStop);
                });
            },

            render: function () {
                this.$el.empty();

                if (this.collection.length) {
                    this.$el.closest('li').removeClass('hidden');
                    this.$el.append('<option>Select a stop:</option>');

                    this.collection.each(function (stop) {
                        this.$el.append(this.template(stop.toJSON()));
                    }, this);
                } else {
                    this.$el.closest('li').addClass('hidden');
                    $('.go').addClass('hidden');
                }
            }
        });
    }
);