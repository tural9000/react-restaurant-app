import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import  Button  from '@mui/material/Button';
import './table.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TransitionsModal from '../modal/Detail';

function createData(id, table, name, status, total, date, d) {
  return { id, table, name, status, total, date, d};
}

export default function BasicTable() {
  const navigate = useNavigate();
  const { employers} = useSelector(state => state.order);
  const data = JSON.parse(localStorage.getItem('employer') || '[]')
  const [employer, setEmployer] = React.useState(data);  // []
  console.log(employers);
  console.log(data);

  

  // employers status
  React.useEffect(() => {
     if(employers.length !== 0){
        setEmployer(employers) 
     }
  }, [employers])

  const rows = employer.map(function(item,idx){
    const{table, employer, status, total, date, d} = item;
    return createData( idx + 1, table, employer, status, total, date, d)
  })

console.log(rows);
  return (
    <div className='table'>
          <div className='d-flex justify-content-between align-items-center'>
              <h3 style={{margin: '0 0 20px 20px'}}>Orders</h3>
             <Button onClick={() => navigate('/orderList')}>Sifarishler</Button>
          </div>
        <TableContainer component={Paper} className='table'>
        <Table sx={{ minWidth: 500 }} aria-label="simple table" >
            <TableHead>
            <TableRow >
                <TableCell>ID</TableCell>
                <TableCell align="right">Masa</TableCell>
                <TableCell align="right">Xidmet eden</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Mebleg</TableCell>
                <TableCell align="right">Sonlanma tarixi</TableCell>
                <TableCell align="right">Etrafli</TableCell>
            </TableRow>
            </TableHead>
            <TableBody >
            {rows.map((row) => {
                console.log(row);
                const clazz = row.status === 'Sonlanib'? 'text-danger': '';
                const date = clazz? "--": row.date
               return  <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                          <TableCell component="th" scope="row">
                              {row.id}
                          </TableCell>
                          <TableCell align="right" className={clazz}>{row.table}</TableCell>
                          <TableCell align="right" className={clazz}>{row.name}</TableCell>
                          <TableCell align="right" className={clazz}>{row.status}</TableCell>
                          <TableCell align="right" className={clazz}>{row.total}</TableCell>
                          <TableCell align="right" className={clazz}>{date}</TableCell>
                          <TableCell align="right"> <TransitionsModal  row = {row}/>{row.more}</TableCell>
                        </TableRow>
              })}
            </TableBody>
        </Table>
       
        </TableContainer>

    </div>
  );
}
