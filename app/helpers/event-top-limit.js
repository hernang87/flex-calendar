import Ember from 'ember';
import Moment from 'npm:moment';
import MomentRange from 'npm:moment-range';

const moment = MomentRange.extendMoment(Moment);

export function eventTopLimit(params) {
    if(!params[0]) return '';
    if(!params[1]) return '';

    let event = params[0];
    let startOfday = moment().year(params[1].year).month(params[1].month-1).date(params[1].day).startOf('day');
    let endOfDay = moment().year(params[1].year).month(params[1].month-1).date(params[1].day).endOf('day');

    let range = moment.range(startOfday, endOfDay);                                     

    if(!range.contains(event.end)) {        
        return '→';
    }

    return event.end.format('HH:mm');
}

export default Ember.Helper.helper(eventTopLimit);
