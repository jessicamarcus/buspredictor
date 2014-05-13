##NextbusService object

handles all communication with Nextbus's API

###methods required:
* agencyList (gets list of all agencies available)
* routeList (gets list of routes for a given agency)
* stopList (uses routeConfig command to get list of stops on a given route)
* getRoutePrediction (uses predictions command to get live prediction data)
