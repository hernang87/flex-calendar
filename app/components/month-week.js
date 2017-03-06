import Ember from 'ember';
import moment from 'npm:moment';
import uuid from 'npm:uuid/v4';

export default Ember.Component.extend({
    classNames: ['month-week'],
    
    isShowingModal: false,
    store: Ember.inject.service(),
    
    init() {
        this._super(...arguments);             
    },

    getDate(params) {
        return moment(`${params.date} ${params.time}`, 'DD/MM/YYYY HH:mm');                
    },

    generateUUID() {
        
    },

    actions: {
        eventModal(params) {
            if(params) {
                let startDate = moment().year(params.year).month(parseInt(params.month) - 1).date(params.day);   

                this.startDay = startDate.format('DD/MM/YYYY');
                this.startTime = startDate.startOf('hour').format('HH:mm');

                this.endDay = startDate.format('DD/MM/YYYY');
                this.endTime = moment(startDate).add(1, 'hour').startOf('hour').format('HH:mm');
            }

            this.toggleProperty('isShowingModal');
        },

        newEvent() {
            let start = this.getDate({ 
                date: this.startDay,
                time: this.startTime
            });

            let end = this.getDate({
                date: this.endDay,
                time: this.endTime                
            });

            let event = this.get('store').createRecord('event', {
                id: uuid(),
                title: this.title,
                address: this.address,
                start,
                end
            });                        
        }
    }
});
