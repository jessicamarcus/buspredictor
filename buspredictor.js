function BuspredictorViewModel() {
    var self = this;
    self.selectedPredictions = ko.observableArray();

    self.addRoutePrediction = function(routeObj) {
        //always add the first routeObj
        if (self.selectedPredictions().length === 0) {
            self.selectedPredictions.push(routeObj);
        } else {
            //check if this prediction is already in the array
            for (var i = 0; i < self.selectedPredictions().length; i++) {
                var compareRouteObj = self.selectedPredictions()[i];
                if (compareRouteObj.routeObjKey === routeObj.routeObjKey) {
                    //replace old prediction with new
                    self.selectedPredictions[i] = routeObj;
                    return;
                } //else: do nothing and continue iterating through array
            }
            //if this is a new routeObj, add it to the array
            self.selectedPredictions.push(routeObj);
        }
    };

    self.removeRoutePrediction = function(prediction) {
        //removes selected prediction from view and array
        self.selectedPredictions.remove(prediction);
    };

    self.refresh = function() {
        //iterates through selectedPredictions and updates each with fresh data
        var predictions = self.selectedPredictions();
        for (var i = 0; i < predictions.length; i++) {
            predictions[i].refresh();
        }
    };

//    //update VehiclePrediction nodes every 60sec
//    self.updatePredictions = self.setInterval(refreshPredictionData(self.selectedPredictions), 60000);

}

var NextbusService = {
    getRoutePrediction: function(url, callback) { // getRoutePrediction(myroute.getUrl(baseurl), callback)
        $.ajax({
            type: "GET",
            url: url,
            dataType: "xml",
            success: callback,
            error: function() { console.log("xml not returned") }
        });
    }
};


function GetRoutePrediction(xml) {
    $.ajax({
        type: "GET",
        url: xml,
        dataType: "xml",
        success: function(data) {
            var factory = new RoutePredictionsFactory();
            myModel.addRoutePrediction(factory.build($(data).find("predictions")));
        },
        error: function() { console.log("xml not returned") }
    });
}

function LoadViewModel(xml) {
    GetRoutePrediction(xml);
}

function generateURL(routePrediction) {
    return routePrediction.getUrl("http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=");
}

/////factories
function RoutePredictionsFactory() {
    this.build = function($node) {
        var routePredictions = new RoutePredictions($node.attr("agencyTitle"), $node.attr("routeTitle"), $node.attr("routeTag"), $node.attr("stopTitle"), $node.attr("stopTag")),
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
function RoutePredictions(agencyTitle, routeTitle, routeTag, stopTitle, stopTag) {
    var self = this;
    this.agencyTitle = ko.observable(agencyTitle);
    this.routeTitle = ko.observable(routeTitle);
    this.routeTag = ko.observable(routeTag);
    this.stopTitle = ko.observable(stopTitle);
    this.stopTag = ko.observable(stopTag);
    this.directions = ko.observableArray();
    this.routeObjKey = routeTag + stopTag;
    this.baseUrl = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=";
    this.getUrl = function() {
        return this.baseUrl += self.agencyTitle() + "&r=" + self.routeTag() + "&s=" + self.stopTag();
    };
    this.refresh = function() {
        NextbusService.getRoutePrediction(this.getUrl(), this.callback)
    };
    this.callback = function(data) {
//        this.remove(this.directions);
        var factory = new DirectionFactory();
        this.directions = factory.build($(data).find("direction"));
    }
}
//getRoutePrediction(myroute.getUrl(baseurl), callback)
function Direction(title) {
    this.title = ko.observable(title);
    // array of prediction instances
    this.predictions = ko.observableArray();
}

function VehiclePrediction(minutes, isScheduleBased, epochTime, delayed, slowness) {
    this.minutes = ko.observable(minutes);
    this.isScheduleBased = ko.observable(isScheduleBased);
    this.epochTime = ko.observable(utcToLocal12hrTime(epochTime));
    //these last two are not always present
    this.delayed = ko.observable(delayed);
    this.slowness = ko.observable(slowness);
}

var myModel = new BuspredictorViewModel();

$(document).ready(function() {
    ko.applyBindings(myModel);
});