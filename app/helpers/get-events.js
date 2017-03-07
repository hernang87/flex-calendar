import Ember from 'ember';
import Moment from 'npm:moment';
import MomentRange from 'npm:moment-range';

const moment = MomentRange.extendMoment(Moment);

export function getEvents(params) {
    let day = params[0];
    let events = params[1];
  
    if(day && events.length > 0) {               
        let currentDay = moment().year(day.year).month(day.month-1).date(day.day);
        
        let currentEvents = events.filter(ev => {
            let range = moment.range(ev.start, ev.end);                                 
            return range.contains(currentDay);
        });

        return currentEvents;
    }

    return [];
}

export default Ember.Helper.helper(getEvents);
