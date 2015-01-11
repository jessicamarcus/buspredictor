define(["backbone"],
    function (Backbone) {
        return Backbone.Model.extend({
            getPredictionParameters: function () {
                return {
                    agencyTag: this.attributes.agencyTag,
                    routeTag: this.attributes.routeTag,
                    stopTag: this.attributes.tag
                    };
            }
        })
    }
);