import * as api from '../api';
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH } from '../constants/actionTypes';

// action creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data});
    } catch (error) {
        console.error(error.message)
    }
  
}

// get posts by search
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    const {data: {data} } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data});
  } catch (error) {
    console.log(error)
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
      const {data} = await api.createPost(post);
      dispatch({ type: CREATE, payload: data})
  } catch (error) {
    console.error(error.message)
  }
}


export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE,  data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) =>  async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  try {
    await api.deletePost(id,user?.token)
    dispatch({ type: DELETE })
  } catch (error) {
    console.log(error);
  }
}

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};