function BuspredictorViewModel() {
    var self = this;
    self.selectedPredictions = ko.observableArray();
    self.allAgencies = ko.observableArray();

    self.selectedAgency = ko.observable();
    self.selectedRoute = ko.observable();
    self.selectedDirection = ko.observable();
    self.selectedStop = ko.observable();

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

//    //todo: update VehiclePrediction nodes every 60sec
//    self.updatePredictions = self.setInterval(refreshPredictionData(self.selectedPredictions), 60000);

    self.ddlAgencies_change = function(e) {
//        var selectedAgencyTag = $(e.target).val(),
//            a = self.allAgencies,
//            agency = {};
//
//        for (var i = 0; i < a().length; i++) {
//            agency = a()[i];
//            if (selectedAgencyTag === agency.tag()) {
//                self.selectedAgency = agency;
//
//                if (!agency.routes().length > 0) {
//                    NextbusService.getRouteList(agency);
//                }
//                return;
//            }
//        }
        NextbusService.getRouteList(self.selectedAgency());
        console.log(self.selectedAgency().tag());
    };

    NextbusService.getAgencyList(); //produces initial selection dropdown
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
    },
    getAgencyList: function() {
        $.ajax({
            type: "GET",
//            url: "http://webservices.nextbus.com/service/publicXMLFeed?command=agencyList",
            url: "./data/agencylist.xml",
            dataType: "xml",
            success: function(data) {
                $(data).find("agency").each(function(index, value) {
                    var currentAgency = new AgencyFactory(),
                        agency = currentAgency.build($(value));
                    myModel.allAgencies.push(agency);
                    });
                },
            error: function() { console.log("xml not returned") }
        });
    },
    getRouteList: function(agency) {
        $.ajax({
            type: "GET",
            url: "http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=" + agency.tag().toLowerCase(),
//          url: "./data/routelist.xml",
            dataType: "xml",
            success: function(data) {
                console.log("http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=" + agency.tag().toLowerCase());
                $(data).find("route").each(function(index, value) {
                    var currentRoute = new RouteFactory(),
                        route = currentRoute.build($(value));
                    myModel.selectedAgency.routes.push(route);
                });
            },
            error: function() { console.log("xml not returned") }
        });
    }
};

function GetRoutePrediction(url) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "xml",
        success: function(data) {
            var factory = new RoutePredictionsFactory();
            myModel.addRoutePrediction(factory.build($(data).find("predictions")));
        },
        error: function() { console.log("xml not returned") }
    });
}

function LoadViewModel(url) {
    GetRoutePrediction(url);
}

/////factories
function RoutePredictionsFactory() {
    this.build = function($node) {
        var routePredictions = new RoutePredictions({agencyTitle: $node.attr("agencyTitle"), routeTitle: $node.attr("routeTitle"), routeTag: $node.attr("routeTag"), stopTitle: $node.attr("stopTitle"), stopTag: $node.attr("stopTag")}),
            directionFactory = new DirectionFactory();

        $node.find("direction").each(function() {
            var dir = directionFactory.build($(this));
            routePredictions.directions.push(dir);
        });
        return routePredictions;
    }
}

function DirectionFactory() {
    this.build = function($node) {
        var direction = new Direction({ title: $node.attr("title")}),
            vehiclePredictionFactory = new VehiclePredictionFactory();

        $node.find("prediction").each(function() {
            var bus = vehiclePredictionFactory.build($(this));
            direction.predictions.push(bus);
        });
        return direction;
    }
}

function VehiclePredictionFactory() {
    this.build = function($node) {
        return new VehiclePrediction({
                minutes: $node.attr("minutes"), isScheduleBased: $node.attr("isScheduleBased"), epochTime: utcToLocal12hrTime($node.attr("epochTime")), delayed: $node.attr("delayed"), slowness: $node.attr("slowness")});
    };
}

function AgencyFactory() {
    this.build = function($node) {
        return new Agency({ tag: $node.attr("tag"), title: $node.attr("title"), regionTitle: $node.attr("regionTitle"), shortTitle: $node.attr("shortTitle")});
    }
}

function RouteFactory() {
    this.build = function($node) {
        return new Route({ tag: $node.attr("tag"), title: $node.attr("title")});
    }
}

/////constructors
var RoutePredictions = Backbone.Model.extend({
//    initialize: {
//        directions = [];
//routeObjKey = routeTag + stopTag;
//baseUrl = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=";
//},
    getUrl: function() {
            return self.baseUrl + self.agencyTitle().toLowerCase() + "&r=" + self.routeTag() + "&s=" + self.stopTag();
    },
    refresh: function() {
            NextbusService.getRoutePrediction(self.getUrl(), self.callback);
    },
    callback: function(data) {
        var factory = new DirectionFactory();
        self.directions.removeAll();
        $(data).find("direction").each(function() {
            var dir = factory.build($(this));
            self.directions.push(dir);
        });
    }
});

var Direction = Backbone.Model.extend({
    constructor: function (title) {
        this.title = title;
        // array of prediction instances
        this.predictions = [];
    }
});

var VehiclePrediction = Backbone.Model.extend();

var Agency = Backbone.Model.extend();

var Route = Backbone.Model.extend ();

//// Router
//var BPRouter = Backbone.Router.extend({
//    routes: {
//        "": "predictor"
//    }
//});
//
//var myBPRouter = new BPRouter();
//
//Backbone.history.start;

var allAgencies = Backbone.Collection.extend({
    model: Agency,
    url: "./data.agencylist.xml",
    parse: function (data) {
        var parsed = [];
        $(data).find("agency").each(function(index, value) {
            var currentAgency = new AgencyFactory(),
                agency = currentAgency.build($(value));
            parsed.push(agency);
        });
        return parsed;
    },
    fetch: function (options) {
        options = options || {};
        options.dataType = "xml";
        return Backbone.Collection.prototype.fetch.call(this, options);
    }
});

var selectedPredictions = Backbone.Collection.extend({
    model: RoutePredictions
});

var testItem = new allAgencies();
testItem.fetch();

var myModel = new BuspredictorViewModel();

$(document).ready(function() {
    ko.applyBindings(myModel);

    ///// listeners
    $("#ddl_agencies").change(myModel.ddlAgencies_change);
    $("#ddl_routes").change(myModel.ddlRoutes_change);
    $("#ddl_stops").change(myModel.ddlStops_change);

});
