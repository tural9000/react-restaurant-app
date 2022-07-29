import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router';


import { deleteOrder, getEmployer} from "../../redux/action";

import './order-list.css';
import { getStatus, createOrder } from './../../redux/action';

const OrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, status, employers} = useSelector(state => state.order);
  
  const data = JSON.parse(localStorage.getItem('order') || '[]');
  const employerData = JSON.parse(localStorage.getItem('employer') || '[]');

  const [order, setOrder] = useState(data);  
  const [color, setColor] = useState({});
  const [employer, setEmployer] = useState(employerData)

  useEffect(() => {
    if(orders.length !== 0){
      localStorage.setItem('order', JSON.stringify(orders));  
     
      setEmployer(employers)
      setOrder([...orders])
    }
    // else{
    //   localStorage.setItem('order', JSON.stringify([order]));
    // }
  }, [orders])  

  console.log(order);

  const handleBtn = btnId => e => {
    e.preventDefault();
    setColor(state => ({
      ...state,
      [btnId]: !state[btnId]
    }));
  };


  const finishOrder = (items) => {
    // delete order
    const index = order.findIndex(f => f.find(v => v.date === items[0].date));
    const newOrder = [...order.slice(0, index), ...order.slice(index + 1)];
    localStorage.setItem('order', JSON.stringify(newOrder));  
    setOrder(newOrder)
    dispatch(deleteOrder(items[0].date))

    // update employer
    console.log(employer);
    const idx = employer.findIndex(i => i.total === items[0].total);
    console.log(idx);
    const oldData = {...employer[idx], status: 'Sonlanib'};
    console.log(oldData);
    const update = [
      ...employer.slice(0, idx),
      oldData,
      ...employer.slice(idx + 1)
    ]
    console.log(update);
    localStorage.setItem('employer', JSON.stringify(update));
    dispatch(getEmployer(update))
  }

  console.log(order);

  return (
    <div className="shopping-cart-table">
        <div className="top">
            <h2>Your Order</h2>
            <button className="btn btn-success" 
                    style={{padding: '10px 30px'}}
                    onClick={() => navigate('/')}>
                Yeni sifarish
            </button>
        </div>
         {order.map((items, idx) =>   // [[], [{},{}]]
                  <div style={{width: '75%', margin: 'auto'}} key={idx}>
                  <table className="table" 
                        style={{borderBottom: '1px solid #7ecad4d3', 
                        boxShadow: '0 0 1px #7ecad4d3'}}>
                    <thead >
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Count</th>
                        <th>Price</th>
                        <th>Time</th>
                        <th>Back</th>
                      </tr> 
                    </thead>
          
                  <tbody >
                  {items.map((item, idx ) => {
                    return <tr key={ idx }>
                              <td>{idx + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.count}</td>
                              <td>{`${item.price} AZN`}</td>
                              <td>{`${item.time}`}</td>
                              <td  >
                                  <button
                                      style={{ backgroundColor: color[item.date] ? "#f0f5f3e7" : "#5fc0a0e7", 
                                               font: color[item.name] ? "bold 1rem sans" : "500 .9rem sans", 
                                               color: '#24697ee7',
                                               width: '80px', display: 'inline-block', border: 0}}
                                      className={`btn btn-success px-1`}
                                      onClick={handleBtn(item.date)}>
                                        { Object.values(color).includes(true)? 'geri alindi': 'geri al <--'}
                                  </button>
                              </td>
                            </tr>
                   } )}
                  </tbody>
                    </table>  
                     <div className="total" >
                     Cemi mebleg: <span style={{marginLeft: '5rem'}}>{ items[0].total } AZN</span>
                   </div>
                   <div className="finish">
                       <button className="btn btn-danger" style={{padding: '10px 30px', marginBottom: '1rem'}}
                               onClick={() => finishOrder(items)} >
                           Sonlandir
                       </button>
                   </div>
                   <hr style={{border: '2px solid #7ecad4d3'}}/>
                  </div>
                 )}

    </div>
  );
};


export default OrderList;


