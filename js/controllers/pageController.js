define(['v.agencylistview', 'm.predictions', 'c.predictionslist', 'v.predictionslistview'],
    function (AgencyListView, Predictions, PredictionsList, PredictionsListView) {

        // Rename this to something that makes it clear that this is the user's viewed predictions
        var predictionsList = new PredictionsList();

        var pageController = {
            // Actions
            initialize: function () {

                this.agencyListView = new AgencyListView();
                this.agencyListView.on('stopSelected', this.showPredictions);

                this.predictionsListView = new PredictionsListView({collection: predictionsList});
            },
            showPredictions: function (stop) {
                var params = stop.getPredictionParameters();
                var pred = new Predictions(params);

                // Add the prediction to the current app state once it is loaded (will render the view)
                predictionsList.listenToOnce(pred, 'sync', function () {
                    predictionsList.add(pred);
                });
                pred.fetch({reset: true});
            }
        };

        return pageController;
});