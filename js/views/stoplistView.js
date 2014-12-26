define(["backbone", "handlebars", "text!views/templates/stopTemplate.html"],
    function (Backbone, Handlebars, StopTemplate) {

        return Backbone.View.extend({
            el: "#stopList",
            template: Handlebars.compile(StopTemplate),

            initialize: function () {
                var self = this;

                function requestPrediction(e) {
                    e.preventDefault();
                    var selectedStop,
                        stopTag = $('#stopList').val();

                    self.selectedStop = self.collection.findWhere({tag: stopTag});
                    console.log(self.selectedStop.attributes.tag);
                    //self.selectedStop.getPrediction();
                }
                function showButton() {
                    $('.go').removeClass('hidden');
                }
                this.$el.change(showButton);
                $('.go').on('click', requestPrediction);
                //this.$el.change(requestPrediction);
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