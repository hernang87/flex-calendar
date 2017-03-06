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
    
        for(let week = start.startOf('week'); week.isSameOrBefore(end); ) {
            let currentWeek = [];
            
            for(let j = 0; j < 7; j++) {
                let otherMonth = start.month() !== month ? 'other-month': '';
                
                currentWeek.push({
                    day: start.date(),
                    month: start.month()+1,
                    year: start.year()+1,
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
        let start = moment().year(year).month(month).startOf('month').subtract(1, 'month');
        let end = moment().year(year).month(month).endOf('month').add(1, 'month');
        
        let previousDate = {
            month: start.format('MM'),
            year: start.format('YYYY')
        };

        let followingDate = {
            month: end.format('MM'),
            year: end.format('YYYY')            
        }; 
        
        return {
            previousDate,
            followingDate
        };
    }
});
