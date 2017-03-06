import Ember from 'ember';
import moment from 'npm:moment';

export default Ember.Component.extend({
    classNames: ['month-week'],
    isShowingModal: false,
    
    init() {
        this._super(...arguments);             
    },

    actions: {
        eventModal(params) {
            if(params) {
                this.startDate = moment().year(params.year).month(parseInt(params.month) - 1).date(params.day);   

                this.startDay = this.startDate.format('DD/MM/YYYY');
                this.startTime = this.startDate.startOf('hour').format('HH:mm');

                this.endDay = this.startDate.format('DD/MM/YYYY');
                this.endTime = moment(this.startDate).add(1, 'hour').startOf('hour').format('HH:mm');
            }

            this.toggleProperty('isShowingModal');
        },

        newEvent() {
            
        }
    }
});
