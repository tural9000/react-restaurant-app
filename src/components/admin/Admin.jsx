import './admin.css';
import { useState,useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import KeepMountedModal from '../modal/Spring';
import { changeAuth, fetchOrder, showError } from './../../redux/action';
import { useSelector } from 'react-redux';



const Admin = () => {
    const [value, setValue] = useState({employer: '',table: ''});
    const [formInfo, setFormInfo] = useState({ name: "", password: "" });
    const nameRef = useRef();
    const passRef = useRef();
    const selectRef = useRef();

    console.log(value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {fetchedData} = useSelector(state => state.order)
    const {error} = useSelector(state => state.app)

    useEffect(() => {
        dispatch(fetchOrder('/employers'))
      }, [])
      
    const changeInputHandler = e => {
        const {name, value} = e.target;
        setFormInfo(prev => ({...prev, ...{[name]: value}}))
        setValue(prev => ({...prev, ...{[name]: value}}))
    }

    const onSub = (e) => {
        e.preventDefault();
        const { name, password } = formInfo;
        if(name === 'Admin' && password === '123'){
            dispatch(changeAuth(true))
            navigate('/admin')
            localStorage.setItem('Auth', 'true');
            setValue({...value, login: "", password: ""})
        }else{
            if (name === "") {
                nameRef.current.focus();
              }else if (password === "") {
                passRef.current.focus();
    
              }else {
                dispatch(showError('Istifadeci adi duz deyil'))
                setFormInfo({ name: "", password: "" });
              }
        }   
    }
    const { name, password } = formInfo;
    return (
        <div className="container">
             {error && 
             <div class="alert alert-danger" role="alert" style={{position: 'absolute',top: 10, left: 12, zIndex: 1, width: '47%', textAlign: 'center'}}>
                {error}
            </div>}
          <div className="form sign-in-container" >
              <form onSubmit={onSub}>
                  <h1>Sign in</h1>
                  <input type="text" 
                        className='form-control'
                        onChange={changeInputHandler}
                        value = {name}
                        name = 'name'
                        ref={nameRef}/>
                  <input type="password" 
                        className='form-control mt-3'
                        onChange={changeInputHandler} 
                        value={password}
                        name = 'password'
                        ref={passRef}/>
                  <button className='btnn'>Sign In</button>
              </form>
            
          </div>
          <div className="overlay-container">
              <div className="overlay">
                  <div className='select' style={{paddingTop: '9rem'}}>
                      <select className="form-select form-select-lg mb-3" 
                              aria-label=".form-select-lg example"
                              onChange={changeInputHandler}
                              value={value.employer}
                              name= 'employer'
                              ref={selectRef}>
                          <option>Xidmet eden</option>
                          {fetchedData.map(v => 
                            <option key={v.id} value={`${v.name}`}>{v.name}</option>
                          )}
                      </select>
                      <select className="form-select form-select-lg mb-3" 
                              aria-label=".form-select-lg example"
                              onChange={changeInputHandler}
                              value={value.table}
                              name='table'
                              ref={selectRef}>
                          <option>Masa</option>
                          {fetchedData.map(v => 
                            <option key={v.id} value={`${v.table}`}>{v.table}</option>
                          )}
                      </select>
                      <KeepMountedModal value={value} setValue={setValue} 
                                        changeInputHandler={changeInputHandler}
                                        select ={selectRef}/>
                        <div>
                            <button className='btn btn-success' 
                                    onClick={() => navigate('/orderList')}
                                    style={{padding: '.7rem 2rem', fontSize: '1rem'}}>Sifarishler</button>
                        </div>
                    
                  </div>
                  
              </div>
          </div>
      </div>     
    )
}

export default Admin;