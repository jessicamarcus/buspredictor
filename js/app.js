require.config({
    paths: {
        "jquery": "lib/jquery-1.11.1",
        "underscore": "lib/underscore",
        "backbone": "lib/backbone",
        "text": "lib/text",
        "handlebars": "lib/handlebars-v1.3.0"
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

        new AgencyListView();
    });

});