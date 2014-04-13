function BuspredictorViewModel() {
    var self = this;
    self.selectedPredictions = ko.observableArray([]);

    self.addRoutePrediction = function(route) {
        self.selectedPredictions.push(route);
    };
    self.removePrediction = function(prediction) {
        self.selectedPredictions.remove(prediction);
    };
}

function GetRoutePrediction(xml) {
    $.ajax({
        type: "GET",
        url: xml,
        dataType: "xml",
        success: function(data) {
            var factory = new RoutePredictionsFactory();
            myModel.addRoutePrediction(factory.build($(data).find("predictions")));
        }
    });
}

function LoadViewModel(xml) {
    GetRoutePrediction(xml);
}

/////factories
function RoutePredictionsFactory() {
    this.build = function($node) {
        var routePredictions = new RoutePredictions($node.attr("agencyTitle"), $node.attr("routeTitle"), $node.attr("stopTitle")),
            directionFactory = new DirectionFactory();

        $node.find("direction").each(function() {
            var dir = directionFactory.build($(this));
            routePredictions.directions.push(dir);
        });
        return routePredictions;
    };
}

function DirectionFactory() {
    this.build = function($node) {
        var direction = new Direction($node.attr("title")),
            vehiclePredictionFactory = new VehiclePredictionFactory();

        $node.find("prediction").each(function() {
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

/////constructors
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

var myModel = new BuspredictorViewModel();

$(document).ready(function() {
    ko.applyBindings(myModel);
});