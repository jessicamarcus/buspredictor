var app = app || {};

app.ListView = Backbone.View.extend({
    el: "#agencyList",

    initialize: function(agencyList) {
        //create the collection
        this.collection = new app.AgencyList(agencyList);
        this.render();
    },

    render: function() {
        //each item in collection
        this.collection.each(function(item) {
            //render the item
            this.renderAgency(item);
        }, this);
    },

    renderAgency: function(item) {
        //create new listView
        var agencyView = new app.AgencyView({
            //pass it the item's parameters
            model: item
        });
        //append the element it renders to the list's element
        this.$el.append(agencyView.render().el);
    }
});