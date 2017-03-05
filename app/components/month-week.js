import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['month-week'],
    isShowingModal: false,
    
    init() {
        this._super(...arguments);             
    },

    actions: {
        eventModal(params) {
            this.toggleProperty('isShowingModal');
        }
    }
});
