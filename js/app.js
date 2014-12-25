require.config({
    paths: {
        "jquery": "../bower_components/jquery/dist/jquery",
        "underscore": "../bower_components/underscore/underscore",
        "backbone": "../bower_components/backbone/backbone",
        "text": "../bower_components/text/text",
        "handlebars": "../bower_components/handlebars/handlebars",
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
        "v.predictionslistview": "views/predictionslistView",
        "utilities": "util/utc_handlers",
        "pageview": "pageView"
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

//require(["jquery", "views/agencylistView", "views/predictionslistView", "pageView"], function ($, AgencyListView, PredictionsListView, PageView) {
require(["jquery", "pageView"], function ($, PageView) {
    $(function () {

        var PageView = PageView;
//        var pageView = {};
//
//        pageView.agencyListView = new AgencyListView();
//        pageView.predictionsListView = new PredictionsListView();
//
    });
});