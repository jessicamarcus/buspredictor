var app = app || {};

$(function(){
    var agencyList = [
        { tag: "test1", title: "First Agency", regionTitle: "Region"},
        { tag: "test2", title: "Second Agency", regionTitle: "Region"},
        { tag: "test3", title: "Third Agency", regionTitle: "Region"}
    ];

    new app.ListView(agencyList);
});