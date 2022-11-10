import { combineReducers } from 'redux';
import cart_reducer from './cartReducer';

let reducers = combineReducers({
    cart_reducer: cart_reducer,
});

const root_reducer = (state, action) => {
    return reducers(state,action)
};

export default root_reducer;