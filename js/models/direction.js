define(["jquery", "backbone"],
    function ($, Backbone) {
        return Backbone.Model.extend({
            defaults: {
                tag: "no tag",
                title: "no title",
                name: "no name"
            },
            getStops: function () {
                // check to see if this.stops has any stops in it
                //      if not, call loadStops
                // otherwise return this.stops
            },
            loadStops: function () {
                // fill this.stops with info from this.data -
                //  HOWEVER
                //  this.data will only contain the reference stops -
                //  you need the data from this.collection.route.routeXml

                //  ------
                // Iterate over reference stops (in this.data)
                //      for each refStop
                //          stop = routeXml.find(stop with tag = refStop.id)
                //          add stop to direction.stops
            }
        })
    }
);