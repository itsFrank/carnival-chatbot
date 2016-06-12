"use strict";
var Router = (function () {
    function Router() {
    }
    Router.bindRoutes = function (app) {
        var _this = this;
        app.get('/cbot/question', function (req, res) {
            var question = req.query['q'].toLowerCase();
            var event = _this.hasEvent(question);
            if (event != null) {
                if (question.indexOf('when') > -1) {
                    res.json({
                        message: event.name + " will begin at " + _this.timeString(event.start_time) + " on the " + _this.dateString(event.start_date) +
                            " and will end at " + _this.timeString(event.end_time) + " on the " + _this.dateString(event.end_date)
                    });
                    return;
                }
                if (question.indexOf('where') > -1) {
                    var event_venue = _this.venues[event.venue_id];
                    res.json({
                        message: event.name + " will be held at " + event_venue.name + " whose address is: " + event_venue.address +
                            '. Google Maps: http://maps.google.com/maps/place/' + encodeURI(event_venue.address)
                    });
                    return;
                }
            }
            var venue = _this.hasVenue(question);
            if (venue != null) {
                if (question.indexOf('where') > -1) {
                    res.json({
                        message: venue.name + 'is located at: ' + venue.address +
                            '. Google Maps: http://maps.google.com/maps/place/' + encodeURI(venue.address)
                    });
                    return;
                }
            }
            res.json({
                message: "Sorry, i did not understand that question"
            });
        });
    };
    Router.hasEvent = function (question) {
        for (var i = 0; i < this.events.length; i++) {
            var event_1 = this.events[i];
            for (var j = 0; j < event_1.aliases.length; j++) {
                var alias = event_1.aliases[j];
                if (question.indexOf(alias) >= 0) {
                    return event_1;
                }
            }
        }
        return null;
    };
    Router.hasVenue = function (question) {
        for (var i = 0; i < this.venues.length; i++) {
            var venue = this.venues[i];
            for (var j = 0; j < venue.aliases.length; j++) {
                var alias = venue.aliases[j];
                if (question.indexOf(alias) >= 0) {
                    return venue;
                }
            }
        }
        return null;
    };
    Router.timeString = function (val) {
        var hour = Math.floor(val / 100);
        var minutes = val - (hour * 100);
        if (minutes < 10)
            minutes = '0' + minutes;
        var dayhalf = hour >= 12 ? 'PM' : 'AM';
        if (hour >= 13)
            hour -= 12;
        else if (hour == 0)
            hour = 12;
        return hour + ':' + minutes + ' ' + dayhalf;
    };
    Router.dateString = function (val) {
        var s = ["th", "st", "nd", "rd"];
        var v = val % 100;
        return val + (s[(v - 20) % 10] || s[v] || s[0]);
    };
    Router.events = require('../../../test/events.json');
    Router.venues = require('../../../test/venues.json');
    return Router;
}());
exports.Router = Router;
//# sourceMappingURL=routes.js.map