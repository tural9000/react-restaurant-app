import { SHOW_LOADER,SHOW_ERROR, HIDE_ERROR, CHANGE_AUTH} from "../types"
const initialState = {
    loading: false,
    error: null,
    isAuth: null
}

export const appReducer = (state = initialState, action) => {
    // console.log(action.payload);
  switch (action.type) {
    case SHOW_LOADER:
        return {...state, loading: true}
    case SHOW_ERROR:
        return {...state, error: action.payload}
    case HIDE_ERROR:
        return {...state, error: null}
    case CHANGE_AUTH:
        return {...state, isAuth: action.payload}
    
    default:
        return state
  }
}
