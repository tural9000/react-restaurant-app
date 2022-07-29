import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '1.2px solid #eaf5f1de',
  boxShadow: '0 0 5px #333',
  p: 5,
};

export default function TransitionsModal({row}) {
  const data = JSON.parse(localStorage.getItem('orders') || '[]');
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState([]);
  const handleOpen = () => {
    setOpen(true);
    const filter = data.filter(item => item.find(f => f.d === row.d))
    console.log(row);
    setOrder(...filter)
  };
  const handleClose = () => setOpen(false);

  console.log(order);

  return (
    <div>
      <Button 
        onClick={handleOpen}
        style={{textTransform: 'lowercase', background: '#11a775de', color: '#eaf5f1de'}}>Bax</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
                <div className="shopping-cart-table">
                    <div className="top">
                        <h2>Your Order</h2>
                    </div>
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
                        </tr> 
                      </thead>
                      <tbody>
                       {order.map((v, i)=> {
                         return <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>{v.name}</td>
                                  <td>{v.count}</td>
                                  <td>{v.price}AZN</td>
                                  <td>{v.time}</td>
                               </tr> 
                       })}
                      </tbody>
                    </table>  
                    <div style={{textAlign: 'left'}}>
                      Cemi mebleg: <span>{ row.total} AZN</span>
                    </div>
               </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
