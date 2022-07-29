import './create-order.scss'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import KeepMountedModal from '../modal/Spring';
import { Link } from 'react-router-dom';


const CreateOrder= () => {
    const [value, setValue] = useState({employer: '', table: ''});
    const navigate = useNavigate();
      
    const changeInputHandler = e => {
        const{name, value} = e.target
        setValue(prev => ({...prev, ...{[name]: value}}))
    }
    return (
    <div>
        <div style={{position: 'absolute', top: 40, left: 30}}>
           
                <div >
                    <Link to={'/orderList'} style={{ fontSize: '2rem'}}>
                        <i className='bx bx-arrow-back' ></i>
                    </Link>
                </div>
        
        </div>
        <div className="container"  style={{marginTop: '6rem'}}>
            <div className="overlay-containerr">
                <div className="overlay" >
                    <div className='selectt' style={{paddingTop: '9rem'}}>
                        <select className="form-select form-select-lg mb-3 sl" 
                                aria-label=".form-select-lg example"
                                onChange={changeInputHandler}
                                value={value.employer}
                                name= 'employer'>
                            <option>Xidmet eden</option>
                            <option value="tural">tural</option>
                            <option value="emin">emin</option>
                            <option value="revane">revane</option>
                        </select>
                        <select className="form-select form-select-lg mb-3 sl" 
                                aria-label=".form-select-lg example"
                                onChange={changeInputHandler}
                                value={value.table}
                                name='table'>
                            <option>Masa</option>
                            <option value="1b">1b</option>
                            <option value="2b">2b</option>
                            <option value="3b">3b</option>
                        </select>
                        <KeepMountedModal value={value} setValue={setValue} 
                                            changeInputHandler={changeInputHandler}/>
                            <div>
                                <button className='btn btn-success' 
                                        onClick={() => navigate('/admin')}>Admin</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     
    )
}

export default CreateOrder;