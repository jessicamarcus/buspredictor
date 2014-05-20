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
Feature #2
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
[Changes for] Feature 2: (ie, new methods, or modified methods)
BusPredictorViewModel
    selectedPredictions[] - observableArray of RoutePredictions
    refresh() - refreshes each routePrediction in selectedPredictions[]
RoutePrediction
    refresh() - refreshes routePrediction data by calling nextbus service
NextBusService
    getRoutePredictions(callback) - makes ajax call to nextbus to get predictions
DirectionFactory
    build() - creates observable Direction viewmodel

Feature 3:
##NextbusService object

handles all communication with Nextbus's API

###methods required:
* agencyList (gets list of all agencies available)
* routeList (gets list of routes for a given agency)
* directionList (uses routeConfig to get list of available directions for the given route)
* stopList (uses routeConfig command to get list of stops on a given route in one direction)
* getRoutePrediction (uses predictions command to get live prediction data)

###properties:
* baseUrl (http://webservices.nextbus.com/service/publicXMLFeed?command=)



###prediction selection process
* User selects from a list of transit agencies (NextbusService.agencyList) from "agency" dropdown (ddlAgency).
* Selection in dropdown produces related list of routes (NextbusService.routeList), which populates a "routes" dropdown (ddlRoutes).
* User chooses a route from dropdown. User then chooses the available directions (NextbusService.directionList) that appear in "directions" dropdown (ddlDirections).
* Selected "direction" causes the "stops" dropdown (ddlStops) to appear. User chooses a stop, which creates a new RoutePrediction. (myModel.addRoutePrediction)