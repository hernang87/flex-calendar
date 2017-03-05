import Ember from 'ember';
import moment from 'npm:moment';

export default Ember.Route.extend({
    model() {
        let year = moment().year();
        let month = 3;
        let jsMonth = month - 1;

        let start = moment().month(jsMonth).startOf('month');
        let end = moment().month(jsMonth).endOf('month');        
        
        let weeks = [];

        let currentDate = {
            month: moment().month(jsMonth).format('MMMM'),
            year: moment().year(year).format('YYYY')
        };
        
        for(let i = start.week(); i <= end.week(); i++) {
            let currentWeek = []
            let weekStart = start.startOf('week');
            
            for(let j = 0; j < 7; j++) {
                let otherMonth = start.month() !== jsMonth ? 'other-month': '';
                currentWeek.push({
                    dayValue: start.date(),
                    otherMonth
                });
                start = start.add(1, 'day');
            }

            weeks.push(currentWeek);      
        }
        
        return {
            weeks,
            currentDate
        };        
    }
});
