import { CREATE_ORDER, GET_EMPLOYER, DELETE_ORDER, GET_TOTAL, CHANGE_AUTH, GET_STATUS,
         FETCH_DATA, SHOW_LOADER, SHOW_ERROR, HIDE_ERROR} from './types';

export const createOrder = (payload) => ({type: CREATE_ORDER, payload});
export const getEmployer = (payload) => ({type: GET_EMPLOYER, payload});
export const deleteOrder = (payload) => ({type: DELETE_ORDER, payload});
export const getTotal = (payload) => ({type: GET_TOTAL, payload});
export const getStatus = (payload) => ({type: GET_STATUS, payload});



export const changeAuth = (payload) => ({type: CHANGE_AUTH, payload});
export const showLoader = () => ({type: SHOW_LOADER});
export const hideError = () => ({type: HIDE_ERROR});
export const showError = (text) => {
    return dispatch => {
        dispatch({type: SHOW_ERROR, payload: text})
        setTimeout(() => {
            dispatch(hideError()) 
        }, 1500);
    }
};

export const fetchOrder = () => {
    return async dispatch => { //
        try {
            dispatch(showLoader())
            const res = await fetch(`http://localhost:3004/orders`);
            const json = await res.json();
            dispatch({type: FETCH_DATA, payload: json});
        } catch (error) {
            dispatch(showError('Sorgu zamani problem bash verdi'));  // 
        }
    }
}