import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../../layout/MainLayout'
import Dashboard from '../../pages/Dashboard'
import Blank from '../../pages/Blank'
import Admin from '../admin/Admin'
import OrderList from '../order-list/OrderList'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { changeAuth } from './../../redux/action';
import CreateOrder from './../create-order/CreateOrder';
import RequireAuth from './../require-auth/RequireAuth';

const MyRouter = () => {
    const {isAuth} = useSelector(state => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
      if(localStorage.getItem('Auth')){
        dispatch(changeAuth(true))
      }
    }, [])
  return (
        isAuth
        ? 
    <Routes>
        <Route path='/admin' element={ <MainLayout/> }>
            <Route index element={ <Dashboard/>  }/>
            <Route path='orders' element={ <Blank/> }/>
            <Route path='products' element={ <Blank /> }/>
            <Route path='customers' element={ <Blank /> }/>
            <Route path='settings' element={ <Blank /> }/>
            <Route path='stats' element={ <Blank /> }/>
        </Route>
        <Route path='orderList' element={ <OrderList/> }/>
        <Route path='/' element={ 
            <RequireAuth>
                <CreateOrder/> 
            </RequireAuth>    
        }/>
    </Routes>
    :
    <Routes>
        <Route path='/' element={ <Admin/> }/>
        <Route path='orderList' element={ <OrderList/> }/>
        <Route path='createOrder' element={ 
            <RequireAuth>
                <CreateOrder/> 
            </RequireAuth>    
        }/>
    </Routes>
  )
}

export default MyRouter