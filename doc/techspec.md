Structure of T-Spec
1. Logical Flow
2. Object Model

Intent of T-Spec
? What is called when a specific user action occurs?
        What is the end result of that action?
        What are all the things that happen to create that result?

[ Management Expectations: ]
[ BLOCKING ISSUES: (I can not complete my work without this resolved) ]
[ - Found an error: ]
[       If it's a small issue that you know the solution to... fix it.] 
[       If you do not immediately know the solution, reach out]
[ - Found a gap (missing logic REQUIRED for the feature to work) ]
[       Reach out for discussion with T-Spec Reviewer first! ]
[ NICE TO HAVES: ]
[ - Thought about a new *feature* (exposed to user) that has not been documented]
[       Document it as 'future feature' in FUNCTIONAL SPEC ]
[ - Thought of new logic that has not been documented ]
[       Document it as 'future enhancement' in TECHNICAL SPEC ]
[       OR *IF* this may be required (ie, may be a GAP) ]
[       Reach out and discuss ]


###Actors - describe all actors in the solution
selectedPredictions is an observable array which lives in the view model, BusPredictorViewModel.

###Solution Description / Activity Description / Feature List

Refresh Route Information
##Feature #2 (approved)
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
    getRoutePrediction(callback) - makes ajax call to nextbus to get predictions
DirectionFactory
    build() - creates observable Direction viewmodel

##Feature 3: (Complete)
[ Open issues: ]
[ 1. DONE ensure all "Open Questions" from email answered ]
[ 2. DONE All NextbusService methods should be named with a verbNoun() naming scheme ]
[ 3. DONE Everything in Object Model should be completely described - including: ]
[       all method parameters listed (input parameters should be listed) ]
[       all items should have a description]

##NextbusService object
handles all communication with Nextbus's API

##Object Model
NextbusService
    getAgencyList() - gets list of all agencies available
    getRouteList(agencyTag) - gets list of routes for a given agency
    getRouteConfig(routeTag) - gets directions and stops for a given route
    baseUrl - "http://webservices.nextbus.com/service/publicXMLFeed?command="    
    
BusPredictorViewModel
    allAgencies()[] - observable array of agencyList results
    getPredictionUrl(stop) - generates url for a user-requested prediction, generates REST url for selected stop, and sends result to LoadViewModel()
    ddlAgency_change() - event listener; upon selection in ddlAgency produces or updates routes()[]
    ddlRoutes_change() - event listener; upon selection in ddlRoutes produces or updates directions()[]
    ddlDirections_change() - event listener; upon selection in ddlDirections produces or updates stops()[]
    ddlStops_change() - event listener; upon selection in ddlStops 
agency
    routes()[] - observable array of routes for the agency
route
    stops()[] - observable array of stops for the route
    directions()[] - observable array of directions for the route   
    getStops(direction) - matches up reference stops with definition stops, and returns direction.stops()[] which now contains titles 
    

Select Route for Prediction
Page loads =>
    BuspredictorViewModel.allAgencies[] is created as an observable array and given the value of:
        NextbusService.agencyList() makes ajax call to nextbus server 
            results are stored in BuspredictorViewModel.allAgencies[]
            in view (class: ddlAgency), data-bind foreach: allAgencies, display only agencyTitle

User selects an agency =>
    BuspredictorViewModel.ddlAgency_change()
        for selectedAgency in BuspredictorViewModel.allAgencies
            if routes[] exists do nothing
            if routes[] does not exist
                NextbusService.routeList()
                create new observable array selectedAgency.routes[]
            populate view for ddlRoutes with selectedAgency.routes[]

User selects a route =>
    BuspredictorViewModel.ddlRoutes_change()
        for selectedRoute in selectedAgency.routes[]
            if stops[] exists do nothing
            if stops[] does not exist
                NextbusService.routeConfig()
                    success:
                        create observable array selectedRoute.stops[] - // These are stop DEFINITIONS (ie, the real stop data)
                        create observable array selectedRoute.directions[]
                            fill with directions -
                                each direction should be filled with the reference stops (stop nodes that just have id)
                            if direction titles are duplicated, merge all their stops into one direction
             populate view for ddlDirections with selectedRoute.directions[]

User selects a direction =>
    BuspredictorViewModel.ddlDirections_change()
        for selectedDirection in selectedRoute.directions[]
            route.getStops(direction) 
                if selectedDirection.stops[0] doesn't have a title,
                    getStops(selectedDirection.stops[i]) 
            populate view for ddlStops with selectedDirection.stops.title[]

User selects a stop =>
    BuspredictorViewModel.ddlStops_change()
        get selectedStop from selectedDirection.stops
        BuspredictorViewModel.getPredictionUrl()
            var url = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=" +
                selectedAgency.agencyTitle().toLowerCase() + "&r=" + 
                selectedRoute.tag() + "&s=" + 
                selectedStop.tag()
            LoadViewModel(url)

## Future Enhancements
1. Cache agencyList data
2. NextBusService.UrlBuilder.getPredictionUrl(stop OR existing routePrediction)
3. Include lat/long and other info into stops on direction.