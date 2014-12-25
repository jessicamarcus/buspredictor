define(['v.agencylistview', 'v.predictionslistview'], function (AgencyListView, PredictionsListView) {

    var PageView = (function () {

        var pageView = {};

        pageView.agencyListView = new AgencyListView();
        pageView.predictionsListView = new PredictionsListView();

        return pageView;
    } ());
});