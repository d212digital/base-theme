import {
    UPDATE_SEARCH_BAR,
    UPDATE_SEARCH_LOAD_STATUS,
    CLEAR_SEARCH_RESULTS
} from './SearchBar.action';

const initialState = {
    products: {},
    isLoading: false
};

const SearchBarReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_SEARCH_BAR:
        const { result: { products } } = action;

        return {
            ...state,
            products
        };

    case UPDATE_SEARCH_LOAD_STATUS:
        const { isLoading } = action;

        return {
            ...state,
            isLoading
        };

    case CLEAR_SEARCH_RESULTS:
        return {
            ...state,
            products: {}
        };

    default:
        return state;
    }
};

export default SearchBarReducer;
