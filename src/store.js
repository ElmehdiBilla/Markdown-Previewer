
import {createStore} from 'redux'

const PARSE = 'PARSE';

const defaultState = {
    text:''
}

const parseCreator = (text) => {
    return {
        type:PARSE,
        text:text
    }
}

const parseReducer = (state = defaultState, action) => {
    switch(action.type){
        case PARSE:
            return {
                text: state.text + action.text
            };
        default:
            return state;
    }
}

const store = createStore(parseReducer);

export default store