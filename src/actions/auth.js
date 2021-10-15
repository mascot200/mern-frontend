import * as api from '../api';
import { AUTH } from '../constants/actionTypes';


export const signIn = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signin(formData);
        dispatch({ type: AUTH,  data})
        history.push('/')
    } catch (error) {
        console.log(error.message)
    }
}

export const signUp = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signup(formData);
        dispatch({ type: AUTH, data})
       history.push('/')
    } catch (error) {
        console.log(error.message)
    }
}

