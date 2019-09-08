import * as types from '../constants/ActionTypes';
import { findIndex } from 'lodash';

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case types.SAVE_TASK:
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status ? true : false
            }
            if(!task.id){                   // '', "", null, undefined, 0, false in if return false
                task.id = generateId();
                state.push(task);
            }else{
                index = findIndex(state, item => {
                    return item.id === task.id;
                });
                state[index] = task;
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];

        case types.UPDATE_STATUS_TASK:
            index = findIndex(state, item => {
                return item.id === action.id;
            });
            if (index > -1) {
                state[index] = { ...state[index], status: !state[index].status };
                localStorage.setItem('tasks', JSON.stringify(state));
            }
            return [...state];

        case types.DELETE_TASK:
            index = findIndex(state, item => {
                return item.id === action.id;
            });
            if (index > -1) {
                state.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(state));
            }
            return [...state];

        default:
            return state;
    }
};

var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var generateId = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


export default myReducer;