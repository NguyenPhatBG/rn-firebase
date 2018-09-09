import { MESSAGE_RECIVED, FETCHING_MESSAGE } from '../actions/actionTypes';

const INITIAL_STATE = {
    fetching: false,
    messages: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCHING_MESSAGE:
            return { INITIAL_STATE, fetching: true };
        case MESSAGE_RECIVED:
            return { ...state, fetching: false, messages: action.payload };
        default: 
            return state;
    }
}