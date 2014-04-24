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

//    //update VehiclePrediction nodes every 60sec
//    self.updatePredictions = self.setInterval(refreshPredictionData(self.selectedPredictions), 60000);

}
//function refreshPredictionsData() {
//    //for each selectedPredictions[i]
//    for (var i = 0; i < this.selectedPredictions().length; i++) {
//    ///remove "directions" nodes
//        var currentPrediction = this.selectedPredictions[i];
//        //currentPrediction.directions = /*remove directions entirely*/;
//        ///OR can we just build a new directions obj and overwrite the old one??
//    ///ajax request for fresh xml
//        $.ajax({
//            type: "GET",
//            url: /*xml... how do we specify the path? do we need to store it on the predictions obj upon initial creation?*/,
//            dataType: "xml",
//            success: function(data) {
//                var factory = new DirectionFactory();
//                currentPrediction.directions = factory.build($(data).find("predictions"));
//            }
//        });
//    ///run DirectionFactory()?
//    ///insert this new directions obj into selectedPredictions[i]
//    ///if this fails, we need to inform the user that the displayed data has not been updated
//
//    }
//
//}

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

//function nextbusService(xml) {
//    $.ajax({
//        type: "GET",
//        url: xml,
//        dataType: "xml",
//        success: function(data) {
//            var factory = new RoutePredictionsFactory();
//            myModel.addRoutePrediction(factory.build($(data).find("predictions")));
//        }
//    });
//}

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
    this.agencyTitle = ko.observable(agencyTitle);
    this.routeTitle = ko.observable(routeTitle);
    this.routeTag = ko.observable(routeTag);
    this.stopTitle = ko.observable(stopTitle);
    this.stopTag = ko.observable(stopTag);
    this.directions = ko.observableArray();
    this.routeObjKey = routeTag + stopTag;
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
