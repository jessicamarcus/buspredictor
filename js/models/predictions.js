define(["backbone", "jquery", "c.directionlist", "utilities"],
    function (Backbone, $, DirectionList, Utilities) {
        return Backbone.Model.extend({
            // this model represents the answer from the server when requesting a prediction
            // it contains at least one [direction] node, each of which contains [prediction] nodes (i.e. vehicleprediction)

            url: function () {
                return "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=" +
                    this.agencyTag + "&r=" + this.routeTag + "&s=" + this.stopTag
            },
            fetch: function (options) {
                options || (options = {});
                options.dataType = "xml";
                Backbone.Collection.prototype.fetch.call(this, options);
            },

            parse: function (data) {
                var parsed = [],
                    content;
                $(data).find("predictions").each(function () {
                    content = $(this);
                    parsed.push({
                        agencyTitle: content.attr("agencyTitle").toLowerCase(),
                        routeTag: content.attr("routeTag"),
                        stopTitle: content.attr("stopTitle"),
                        stopTag: content.attr("stopTag"),
                        direction: []
                    });
                    $(data).find("direction").each(function () {
                        parsed.direction.push({
                            title: content.attr("title"),
                            prediction: []
                        });
                        $(data).find("prediction").each(function () {
                            parsed.direction.prediction.push({
                                arrivalTime: Utilities.utcToLocal12hrTime(content.attr("epochTime")),
                                minutes: content.attr("minutes"),
                                isDeparture: content.attr("isDeparture"),
                                // not always present
                                delayed: content.attr("delayed"),
                                slowness: content.attr("slowness")
                            });
                        });
                    });
                });
                return parsed;
            },
            refresh: function () {
                // every x seconds, call fetch on self
            }
        });
    }
);
//<prediction epochTime="1389208209480" seconds="4140" minutes="69" isDeparture="false" affectedByLayover="true" delayed="true" dirTag="89_0_var0" vehicle="0630" block="G89_16" tripTag="21757874"/>