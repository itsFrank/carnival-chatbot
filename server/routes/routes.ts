import * as express from 'express'

export class Router {

    private static events:CEvent[] = require('../../../test/events.json');
    private static venues:CVenue[] = require('../../../test/venues.json');

    public static bindRoutes(app:express.Application){

        app.get('/cbot/question', (req:express.Request, res:express.Response) => {
            var question = req.query['q'].toLowerCase();
            var event = this.hasEvent(question);

            if (event != null) {
                if (question.indexOf('when') > -1){
                    res.json({
                        message: event.name + " will begin at " + this.timeString(event.start_time) + " on the " + this.dateString(event.start_date) +
                            " and will end at " + this.timeString(event.end_time) + " on the " + this.dateString(event.end_date)
                    });
                    return;
                }

                if (question.indexOf('where') > -1) {
                    let event_venue = this.venues[event.venue_id];
                    res.json({
                        message: event.name + " will be held at " + event_venue.name + " whose address is: " + event_venue.address + 
                        '. Google Maps: http://maps.google.com/maps/place/' + encodeURI(event_venue.address)
                    });
                    return;
                }
            }
            var venue = this.hasVenue(question);
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
            })
            
        })

    }

    private static hasEvent(question:string):CEvent{
        for (var i = 0; i < this.events.length; i++){
            let event = this.events[i];
            for (var j = 0; j < event.aliases.length; j++){
                let alias = event.aliases[j];
                if(question.indexOf(alias) >= 0){
                    return event;
                } 
            }
        }
        return null;
    }

    private static hasVenue(question:string):CVenue{
        for (var i = 0; i < this.venues.length; i++){
            let venue = this.venues[i];
            for (var j = 0; j < venue.aliases.length; j++){
                let alias = venue.aliases[j];
                if(question.indexOf(alias) >= 0){
                    return venue;
                } 
            }
        }
        return null;
    }

    private static timeString(val:number):string {
        var hour = Math.floor(val / 100);
        var minutes:any = val - (hour * 100);
        if (minutes < 10) minutes = '0' + minutes;

        var dayhalf = hour >= 12 ? 'PM' : 'AM';

        if (hour >= 13) hour -= 12;
        else if (hour == 0) hour = 12;

        return hour + ':' + minutes + ' ' + dayhalf;

    }

    private static dateString(val:number):string {
        let s=["th","st","nd","rd"];
        let v=val%100;
        return val + (s[(v-20)%10]||s[v]||s[0]);
    }
}

