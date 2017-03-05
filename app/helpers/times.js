import Ember from 'ember';

export function times(params) {
    let arr = [];

    for(let i = 0; i < params[0]; i++) {
        arr.push(i);
    }
    
    return arr;
}

export default Ember.Helper.helper(times);
