import * as api from '../api';
import { FETCH_ALL, FETCH_SINGLE_POST, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from '../constants/actionTypes';

// action creators
export const getPosts = (page) => async (dispatch) => {
    try {
      dispatch({type: START_LOADING})
        const { data } = await api.fetchPosts(page);
        dispatch({ type: FETCH_ALL, payload: data});
      dispatch({type: END_LOADING})
    } catch (error) {
        console.error(error.message)
    }
  
}

// get posts by search
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING})
    const { data } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data});
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error)
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
      dispatch({type: START_LOADING})
        const {data} = await api.createPost(post);
      dispatch({ type: CREATE, payload: data})
      dispatch({type: END_LOADING})
  } catch (error) {
    console.error(error.message)
  }
}


export const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING})
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE,  data });
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) =>  async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  try {
    dispatch({type: START_LOADING})
    await api.deletePost(id,user?.token)
    dispatch({ type: DELETE })
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error);
  }
}

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    dispatch({type: START_LOADING})
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE, payload: data });
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async(dispatch) => {
  try {
    dispatch({type: START_LOADING})
    const { data } = await api.fetchSinglePost(id);
    dispatch({ type: FETCH_SINGLE_POST, payload: data})
    dispatch({ type: END_LOADING})
  } catch (error) {
    console.log(error);
  }
}