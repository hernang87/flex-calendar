import Ember from 'ember';
import moment from 'npm:moment';
import uuid from 'npm:uuid/v4';

export default Ember.Component.extend({
    classNames: ['month-week'],
    store: Ember.inject.service(),

    isShowingModal: false,

    required: ['title', 'start', 'end'],
    currentEvent: Ember.Object.create({
        title: null,
        address: null,
        start: {
            day: null,
            time: null
        },
        end: {
            day: null,
            time: null
        }   
    }),    

    events: [],
    
    init() {
        this._super(...arguments);             
    },

    getDate(params) {
        return moment(`${params.date} ${params.time}`, 'DD/MM/YYYY HH:mm');                
    },

    clearForm() {
        this.set('currentEvent', Ember.Object.create({
            title: null,
            address: null,
            start: {
                day: null,
                time: null
            },
            end: {
                day: null,
                time: null
            }   
        }));
    },

    formSubmit: Ember.computed('currentEvent.title', function() {
        let ev = this.get('currentEvent');
 
        if(Ember.isEmpty(ev.title)) {
            return 'disabled';
        }

        return 'enabled';
    }),

    actions: {
        eventModal(params) {         
            if(params) {                  
                let startDate = moment().year(params.year).month(parseInt(params.month) - 1).date(params.day);   
                
                this.set('currentEvent.start.day', startDate.format('DD/MM/YYYY'));
                this.set('currentEvent.start.time', startDate.startOf('hour').format('HH:mm'));

                this.set('currentEvent.end.day', startDate.format('DD/MM/YYYY'));
                this.set('currentEvent.end.time', moment(startDate).add(1, 'hour').startOf('hour').format('HH:mm'));
            } else {
                this.clearForm();
            }
        
            this.toggleProperty('isShowingModal');
        },

        newEvent(day) {
            let start = this.getDate({ 
                date: this.get('currentEvent.start.day'),
                time: this.get('currentEvent.start.time')
            });

            let end = this.getDate({
                date: this.get('currentEvent.end.day'),
                time: this.get('currentEvent.end.time')              
            });

            let event = this.get('store').createRecord('event', {
                id: uuid(),
                title: this.get('currentEvent.title'),
                address: this.get('currentEvent.address'),
                start,
                end
            });

            this.propertyWillChange('events');
            this.get('events').push(event);
            this.propertyDidChange('events');
            
            this.toggleProperty('isShowingModal');                     

            this.clearForm();
        }
    }
});
