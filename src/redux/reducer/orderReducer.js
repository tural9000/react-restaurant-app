import {CREATE_ORDER, GET_EMPLOYER, DELETE_ORDER, 
    GET_TOTAL, FETCH_DATA} from '../types';

const initialState = {
    fetchedData: [],
    employers: [],
    orders: [],
    status: [],
    total: 0
}
export const orderReducer = (state = initialState, action) =>{ 

switch (action.type) {
    case GET_EMPLOYER:
        return {...state, employers: action.payload};
    case CREATE_ORDER:
        const updateData = res => ({...res, total: state.total});
        const data = action.payload.map(updateData)
        return {...state, orders: [...state.orders, data], status: state.employers}
    case DELETE_ORDER:
        const index = state.orders.findIndex(f => f.find(v => v.date === action.payload));
        return { ...state, orders: [...state.orders.slice(0, index), ...state.orders.slice(index + 1)]}
    case GET_TOTAL:
        return { ...state, total: action.payload}
    case FETCH_DATA:
        return {...state, fetchedData: action.payload}
    default:
        return state;
}
}

