import Ember from 'ember';
import moment from 'npm:moment';

export default Ember.Route.extend({
    route: '/year/:year/month/:month',

    model(params) {        
        let year = parseInt(params.year);
        let month = parseInt(params.month) - 1;        

        let start = moment().month(month).startOf('month');
        let end = moment().month(month).endOf('month');        
        
        let weeks = [];

        let currentDate = {
            month: moment().month(month).format('MMMM'),
            year: moment().year(year).format('YYYY')
        };
    
        for(let week = start; week.isSameOrBefore(end); ) {
            let currentWeek = []
            let weekStart = start.startOf('week');
            
            for(let j = 0; j < 7; j++) {
                let otherMonth = start.month() !== month ? 'other-month': '';
                currentWeek.push({
                    dayValue: start.date(),
                    otherMonth
                });
                start = start.add(1, 'day');
            }

            weeks.push(currentWeek);      
        }                

        let adjacentDates = this.calculateAdjacentDates(year, month);

        return {
            weeks,
            currentDate,
            ...adjacentDates
        };        
    },

    calculateAdjacentDates(year, month) {
        let previousDate = {
            month: moment().month(month).subtract(1, 'month').format('MM'),
            year: moment().year(year).subtract(1, 'month').format('YYYY')
        };

        let followingDate = {
            month: moment().month(month).add(1, 'month').format('MM'),
            year: moment().year(year).add(1, 'month').format('YYYY')            
        };
        
        return {
            previousDate,
            followingDate
        }
    }
});
