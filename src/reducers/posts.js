import { FETCH_ALL,FETCH_SINGLE_POST, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING} from '../constants/actionTypes';
// these post state is an object with isLoading state and post object, 
// The initial state of isLoading for post is false 
export default (state = { isLoading: true, posts: []}, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }

        case FETCH_ALL:
            return {
                ...state, 
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload.data }
        case CREATE:
            return { ...state, posts: [ ...state.posts, action.payload] }
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))};

        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload._id)}
        case LIKE:
                return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))};
        case FETCH_SINGLE_POST:
            return { ...state, post: action.payload}
        default:
            return state;
    }
}