Structure of T-Spec
1. Logical Flow
2. Object Model

Intent of T-Spec
? What is called when a specific user action occurs?
        What is the end result of that action?
        What are all the things that happen to create that result?

##Actors - describe all actors in the solution
selectedPredictions is an observable array which lives in the view model, BusPredictorViewModel.

##Solution Description / Activity Description / Feature List

Refresh Route Information

User clicks button =>
    BusPredictorViewModel.refresh() action loops over BusPredictorViewModel.selectedPredictions
        Calls RoutePrediction.refresh() on each routePrediction
            Calls NextbusService.getRoutePrediction(callback) to get updated predictions data
                get url from prediction.getUrl()
                make ajax call to service
                do callback(data)
            Callback for GetRoutePrediction is:
                clear the directions array on current routeprediction
                load data.find("directions") into new Direction (ie, call directionfactory.build(data)) and load each into Directions[]

##Object Model
BusPredictorViewModel
    selectedPredictions[] - observableArray of RoutePredictions
    refresh() - refreshes each routePrediction in selectedPredictions[]
RoutePrediction
    refresh() - refreshes routePrediction data by calling nextbus service
NextBusService
    getRoutePredictions(callback) - makes ajax call to nextbus to get predictions
DirectionFactory
    build() - creates observable Direction viewmodel