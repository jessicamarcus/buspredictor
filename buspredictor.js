// Utility Functions

function convertUTC(epoch) {
	var utcSeconds = epoch;
}

function RoutePredictionsFactory() {
	this.build = function($node) {
		var routePredictions = new RoutePredictions($node.attr("agencyTitle"), $node.attr("routeTitle"));


		routePredictions.stopTitle = ko.observable($node.attr("stopTitle"));

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
		var direction = new Direction();
		direction.title = ko.observable($node.attr("title"));

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
		var prediction = new VehiclePrediction();
		prediction.minutes = ko.observable($node.attr("minutes"));
		prediction.isScheduleBased = ko.observable($node.attr("isScheduleBased"));
		prediction.delayed = ko.observable($node.attr("delayed"));
		prediction.slowness = ko.observable($node.attr("slowness"));

		return prediction;
	};
}

function PredictionsXMLLoadData(predictionsXMLFile) {
	var self = this;

	var mbtaService = new NextBusService();
	mbtaService.getRoute(predictionsXMLFile, function (predictionsViewModel) {
		appModel.Routes.push(predictionsViewModel);
		ko.applyBindings(appModel);
	});
}




// View Model
function AppViewModel () {
	this.Routes = ko.observableArray();
	this.SelectedRoutes = ko.observableArray();
	this.AvailableRoutes = ko.observableArray();
}

function RoutePredictions(agencyTitle, routeTitle) {
	var self = this;
	self.agencyTitle = ko.observable(agencyTitle);
	self.routeTitle = ko.observable(routeTitle);

	self.directions = ko.observableArray();
}

function Direction() {
	this.predictions = ko.observableArray(); // array of prediction instances
}

function VehiclePrediction() {

}

// Factory
function CreateViewModel($xml) {
	var self = this,
		factory = new RoutePredictionsFactory(),
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