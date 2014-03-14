function RoutePredictionsFactory() {
	this.build = function($node) {
		var routePredictions = new RoutePredictions($node.attr("agencyTitle"), $node.attr("routeTitle"), $node.attr("stopTitle"));
		var directionFactory = new DirectionFactory();

		$node.find("direction").each(function() {
			var dir = directionFactory.build($(this));
			routePredictions.directions.push(dir);
		});
		return routePredictions;
	};
}

function DirectionFactory() {
	this.build = function($node) {
		var direction = new Direction($node.attr("title"));
		var vehiclePredictionFactory = new VehiclePredictionFactory();

		$node.find("prediction").each(function(){
			var bus = vehiclePredictionFactory.build($(this));
			direction.predictions.push(bus);
		});
		return direction;
	};
}

function VehiclePredictionFactory() {
	this.build = function($node) {
		var prediction = new VehiclePrediction(
			$node.attr("minutes"),
			$node.attr("isScheduleBased"),
			$node.attr("epochTime"),
			$node.attr("delayed"),
			$node.attr("slowness")
		);
		return prediction;
	};
}

function PredictionsXMLLoadData(predictionsXMLFile) {
	var mbtaService = new NextBusService();
	mbtaService.getRoute(predictionsXMLFile, function (predictionsViewModel) {
		appModel.Routes.push(predictionsViewModel);
		ko.applyBindings(appModel);
	});
}


// View Model
//function AppViewModel () {
//	this.Routes = ko.observableArray();
//	this.SelectedRoutes = ko.observableArray();
//	this.AvailableRoutes = ko.observableArray();
//}

///////// constructors
function RoutePredictions(agencyTitle, routeTitle, stopTitle) {
	this.agencyTitle = ko.observable(agencyTitle);
	this.routeTitle = ko.observable(routeTitle);
	this.stopTitle = ko.observable(stopTitle);
	this.directions = ko.observableArray();
}

function Direction(title) {
	this.title = ko.observable(title);
	this.predictions = ko.observableArray(); // array of prediction instances
}

function VehiclePrediction(minutes, isScheduleBased, epochTime, delayed, slowness) {
	this.minutes = ko.observable(minutes);
	this.isScheduleBased = ko.observable(isScheduleBased);
	this.epochTime = ko.observable(utcToLocal12hrTime(epochTime));
	this.delayed = ko.observable(delayed); //these last two are not always present
	this.slowness = ko.observable(slowness);
}
///////////
// Factory
function CreateViewModel($xml) {
	var factory = new RoutePredictionsFactory(),
		routePredictions = factory.build($xml.find("predictions"));
	return routePredictions;
}

//Create a class - a function - called MBTAService.
//This MBTAService class has the following functions:

//MBTAService.GetRoute(id, callback) - returns a NEW viewmodel predictions
//	make ajax call
//  pass results to factory
// 	factory returns Predictions viewmodel
// callback will do something - in this case, your callback will add the new predictions to the Routes[] observablearray in your main application viewmodel
function NextBusService() {
	this.getRoute = function (url, callback) {
		// call nextbus api and get the route for the id
		$.ajax({
			type: "GET",
			url: url,  // <-- should be the nextbus api
			dataType: "xml",
			success: function(data) {
				var predictionViewModel = CreateViewModel($(data)); //will this function be used for each of the routes? can we have multiple VMs?
				callback(predictionViewModel);
			},
			error: function (jqXHR) {
				alert("Error");
			}
		});
	};
}

// TransportationService superclass - for future use
//function TransportationService () {
	// getRoute(id, callback);

//}



//which returns a viewmodel for that route (ie, makes your ajax call)
//MBTAService.UpdateRoute(route) - which accepts an existing route ('predictions" viewmodel class) and updates the data inside of it, preserving existing but 'updating it'
//So the first one - GetRoute() is your initial load
//the UpdateRoute() is your call that goes and gets updated data and refreshes the viewmodel for existing routes in the viewmodel
//Start by moving your ajax call to GetRoute().

var appModel = new AppViewModel();