import * as React from 'react';
import { useDispatch, useSelector} from "react-redux"
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { createOrder, getEmployer, getTotal} from '../../redux/action';
import { showError } from './../../redux/action';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function KeepMountedModal({value, setValue, select}) {
  const data = JSON.parse(localStorage.getItem('employer') || '[]');
  const orderData = JSON.parse(localStorage.getItem('orders') || '[]');
  const {fetchedData} = useSelector(state => state.order)
  const {error} = useSelector(state => state.app);

  console.log(fetchedData);

  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState({name: '', count: 0, price: 0})
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState([]);
  const foodRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(values.name === '');
  useEffect(() => {
    if(values.name){
      const pri = fetchedData.filter(item => item.food === values.name)[0].price;
      setValues({...values, price: pri})
    }
  
  }, [values.name])


  useEffect(() => {
    setTotal(prev => prev + values.price * values.count)
  }, [values.price, values.count])
  

  const handleOpen = () => {
    setOpen(true);
    if(value.employer === "" || value.table === ''){
      setOpen(false);
      select.current.focus()
    };
 
  };

  const handleClose = () => {
    setOpen(false)
    setValues({name: '' , count: ''})
  };

  const changeInputHandlers = e => {
    const {name, value} = e.target
    setValues(prev => ({...prev, ...{ [name]: value }}))
  }
  console.log(values.name === "");
  const addOrder = () => {
    const d = new Date();
    const newOrder = {
      d: Date.now(),
      name: values.name,
      count: values.count,
      price: values.price,
      time: `${d.getHours()}:${d.getMinutes()}`
    }
    setOrder([...order, newOrder])
    setValues({name: "", count: "", price: ""})
    if(values.name === ""){
      foodRef.current.focus()
    }else if(values.count === ""){
      foodRef.current.focus()
    }
    setValue({employer: "", table: ""})
  }
  
  
  const setAllOrder = () => {
    const today = new Date().toLocaleString()
    const date = today;
    const newOrder = {
        d: order[0].d,
        total,
        date,
        status: 'Sonlanmayib',
        employer: value.employer,
        table: value.table
      }
    localStorage.setItem('employer', JSON.stringify([...data, newOrder]));
    localStorage.setItem('orders', JSON.stringify([...orderData, order]));
    dispatch(getEmployer([...data, newOrder]));

    dispatch(getTotal(total))
    dispatch(createOrder(order));
    navigate('/orderList');
    
  }

  return (
    <div>
      <Button onClick={handleOpen} 
              className='btn btn-success'
              style={{padding: '.7rem 1rem', fontSize: '.9rem', background: '#198754', color: '#fff'}}>
                Sifarisi yarat
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        >
        <Box sx={style} style={{boxShadow: '0 0 2px #d1e6e3e8', width: '60%', height: '65vh', border: '1px solid #d9e2e0e8'}}>
            
            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            <select className="form-select form-select-lg mb-3" 
                    aria-label=".form-select-lg example"
                    onChange={changeInputHandlers}
                    value={values.name}
                    name= 'name'
                    ref={foodRef} >
                <option >Sifarisi sec</option>
                {fetchedData.map(v => 
                      <option value={`${v.food}`} key={v.id}>{v.food}</option>
                    )}
                <option value="dolma">dolma</option>
            </select>
            </Typography>
                <Box style={{display: 'flex', marginTop: '2rem'}}>
                    <h4 >Miqdari</h4>
                    <div style={{marginLeft: '12rem'}}>
                        <h4>Qiymeti</h4>
                    </div>
                </Box>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 1 }}>
                <Box style={{display: 'flex'}}>
                     <input style={{width: '50%'}} 
                            className='form-control'
                            onChange={changeInputHandlers} 
                            name='count'
                            value={values.count}
                            ref={foodRef}
                           /> 
                     <h3 style={{margin: '.5rem 0 0 4rem'}}>{values.price} AZN</h3>
                </Box>
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                <Box style={{display: 'flex', margin: '4rem 0 1rem ', justifyContent: 'space-between'}}>
                    <Button 
                        style={{ background: '#90ddb9d8', fontSize: '1rem', boxShadow: '0 0 1.5px #725dd1d8'}} 
                        onClick={addOrder}>Elave et
                    </Button>
                    <Button 
                        style={{padding: '15px 25px', background: '#8a8ae7ee',color: '#c4e3f5ee',  fontSize: '1rem', boxShadow: '0 0 1.5px #725dd1d8'}} 
                        onClick={setAllOrder}>Sifarisin hamsini
                    </Button>
                </Box>
            </Typography>
        </Box>
      </Modal>
    </div>
  );
}
