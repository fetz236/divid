let default_state = {
    selected_items: {items: [], fitness_name: ''}
}

let cart_reducer = (state = default_state, action) => {
    switch (action.type){
        case 'ADD_TO_CART': {
            let new_state = {...state}; 
            new_state.selected_items = {
                items: [...new_state.selected_items.items, action.payload],
                fitness_name: action.payload.fitness_name,
            }; 
            return new_state;
        }
        default: return state;
    }
};

export default cart_reducer;