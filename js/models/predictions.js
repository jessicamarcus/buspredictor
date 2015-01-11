define(["backbone", "jquery", "c.directionlist"],
    function (Backbone, $, DirectionList) {
        return Backbone.Model.extend({
            // this model accepts the server response from requesting a prediction
            // i.e. it can be considered a route/stop prediction
            // it contains at least one [direction] node, each of which contains [prediction] nodes (i.e. vehicleprediction)

            url: function () {
                return "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=" +
                    this.attributes.agencyTag + "&r=" + this.attributes.routeTag + "&s=" + this.attributes.stopTag
            },
            fetch: function (options) {
                options || (options = {});
                options.dataType = "xml";
                Backbone.Model.prototype.fetch.call(this, options);
            },

            parse: function (data) {
                var parsed = [],
                    content,
                    directions = new DirectionList();
                $(data).find("predictions").each(function () {
                    content = $(this);
                    parsed.push({
                        agencyTitle: content.attr("agencyTitle").toLowerCase(),
                        routeTag: content.attr("routeTag"),
                        stopTitle: content.attr("stopTitle"),
                        stopTag: content.attr("stopTag"),
                        directions: directions
                    });
                    directions.load(content);
                });
                return parsed;
            //},
            //refresh: function () {
            //    // every x seconds, call fetch on self
            }
        });
    }
);
//<prediction epochTime="1389208209480" seconds="4140" minutes="69" isDeparture="false" affectedByLayover="true" delayed="true" dirTag="89_0_var0" vehicle="0630" block="G89_16" tripTag="21757874"/>