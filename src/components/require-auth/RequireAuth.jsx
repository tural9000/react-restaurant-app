import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { changeAuth } from './../../redux/action';

const RequireAuth = ({children}) => {
  const {isAuth} = useSelector(state => state.app);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if(localStorage.getItem('Auth')){
  //     dispatch(changeAuth(true))
  //   }
  // }, [])

    if(!isAuth){
        return <Navigate to = '/'/>
    }

  return children;
}

export default RequireAuth;