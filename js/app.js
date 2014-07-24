require.config({
    paths: {
        "jquery": "lib/jquery-2.1.1",
        "underscore": "lib/underscore",
        "backbone": "lib/backbone",
        "text": "lib/text",
        "handlebars": "lib/handlebars-v1.3.0",
        // my app
        "m.agency": "models/agency",
        "m.direction": "models/direction",
        "m.predictions": "models/predictions",
        "m.route": "models/route",
        "m.stop": "models/stop",
        "m.vehicleprediction": "models/vehicleprediction",

        "c.agencylist": "collections/agencylist",
        "c.directionlist": "collections/directionlist",
        "c.predictionslist": "collections/predictionslist",
        "c.routelist": "collections/routelist",
        "c.stoplist": "collections/stoplist",
        "c.vehiclepredictionlist": "collections/vehiclepredictionlist",

        "v.agencylistview": "views/agencylistView",
        "v.directionlistview": "views/directionlistView",
        "v.routelistview": "views/routelistView",
        "v.stoplistview": "views/stoplistView",

        "utilities": "util/utc_handlers"
    },
    shim: {
        "underscore": { exports: "_" },
        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        "handlebars": { exports: "Handlebars" }
    }
});

require(["jquery", "views/agencylistView"], function ($, AgencyListView) {

    $(function () {
//        var agencyList = [
//            { tag: "test1", title: "First Agency", regionTitle: "Region"},
//            { tag: "test2", title: "Second Agency", regionTitle: "Region"},
//            { tag: "test3", title: "Third Agency", regionTitle: "Region"}
//        ];

        var view = new AgencyListView();
    });

});