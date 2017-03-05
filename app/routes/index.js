import Ember from 'ember';
import moment from 'npm:moment';

export default Ember.Route.extend({
    redirect() {        
        let year = moment().year();
        let month = moment().month() + 1;
        this.transitionTo('month', year, month);
    }
});
