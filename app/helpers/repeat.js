import Ember from 'ember';

export function repeat(params) {
    let arr = [];

    for(let i = params[0]; i < params[1]; i++) {
        arr.push(i);
    }
    
    return arr;
}

export default Ember.Helper.helper(repeat);
