var Agency = Backbone.Model.extend();

function AgencyFactory() {
    this.build = function($node) {
        return new Agency({ tag: $node.attr("tag"), title: $node.attr("title"), regionTitle: $node.attr("regionTitle"), shortTitle: $node.attr("shortTitle")});
    }
}

var allAgencies = Backbone.Collection.extend({
    model: Agency,
    url: "./data/agencylist.xml",

    fetch: function (options) {
        options || (options = {});
        options.dataType = "xml";
        Backbone.Collection.prototype.fetch.call(this, options);
    },

    parse: function (data) {
        var parsed = [],
            agencyTitle;
        $(data).find("agency").each(function(index, value) {
//            agencyTitle = new AgencyFactory();
            agencyTitle = $(this).attr("title");
            parsed.push({title: agencyTitle});
//            parsed.push(agencyTitle);
        });
        return parsed;
    }
});

var allAgenciesView = Backbone.View.extend({
    el: $('#agencyList'),
    render: function () {
            var handSource = $("#agency-template").html(),
            handTemplate = Handlebars.compile(handSource);
            this.$el.html(handTemplate(this.collection.toJSON()));
        return this;
    }
});
$(document).ready(function () {
    var testItem = new allAgencies();
    var myView = new allAgenciesView({
        collection: testItem
    });
    myView.listenTo(testItem, "sync", function () {
        myView.render();
    });
    testItem.fetch();
});