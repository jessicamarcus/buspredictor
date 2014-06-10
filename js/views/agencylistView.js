define(["backbone", "handlebars", "collections/agencylist", "text!views/templates/agencyTemplate.html"],
    function (Backbone, Handlebars, AgencyList, AgencyTemplate) {

    return Backbone.View.extend({
        el: "#agencyList",

        events: {
//            "click select": $("#routes-ddl").removeClass("inactive-ddl")
//            "change #agencyList": this.requestRoutes
        },

        initialize: function () {
            this.$el.change(this.requestRoutes);
            this.collection = new AgencyList();
            //go get data from server
            this.collection.fetch({reset: true});
            this.render();

            this.listenTo(this.collection, "reset", this.render);
        },

        itemTemplate: Handlebars.compile(AgencyTemplate),

        render: function () {
            //each item in collection
            this.collection.each(function (item) {
                //render the item
                this.$el.append(this.itemTemplate(item.toJSON()));
            }, this);
        },

        requestRoutes: function () {
            var routeTag = document.getElementById("agencyList").value;

            console.log(routeTag);
//            selectedAgencyObj.createRoutes(selectedRoute);
//            var result = AgencyList.findWhere({tag: selectedRoute});
//            console.log(result.length);

        }
    });

});