require.config({
    paths: {
        "jquery": "lib/jquery-2.1.1",
        "underscore": "lib/underscore",
        "backbone": "lib/backbone",
        "text": "lib/text",
        "handlebars": "lib/handlebars-v1.3.0",
        // my app
        "m.agency": "js/models/agency",
        "m.direction": "js/models/direction",
        "m.predictions": "js/models/predictions",
        "m.route": "js/models/route",
        "m.stop": "js/models/stop",
        "m.vehicleprediction": "js/models/vehicleprediction",

        "c.agencylist": "js/collections/agencylist",
        "c.directionlist": "js/collections/directionlist",
        "c.predictionslist": "js/collections/predictionslist",
        "c.routelist": "js/collections/routelist",
        "c.stoplist": "js/collections/stoplist",
        "c.vehiclepredictionlist": "js/collections/vehiclepredictionlist",

        "v.agencylistview": "js/views/agencylistView",
        "v.directionlistview": "js/views/directionlistView",
        "v.routelistview": "js/views/routelistView",
        "v.stoplistview": "js/views/stoplistView",

        "t.agencyTemplate": "js/views/templates/agencyTemplate.html",
        "t.dirTemplate": "js/views/templates/dirTemplate.html",
        "t.routeTemplate": "js/views/templates/routeTemplate.html",
        "t.stopTemplate": "js/views/templates/stopTemplate.html",

        "util.utc_handlers": "util/utc_handlers"
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