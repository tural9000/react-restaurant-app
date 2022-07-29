import React from 'react';
import { data } from '../constants';
import SummaryBox  from './../components/summary-box/SummaryBox';
import BasicTable from '../components/table/AdminTable';


const Dashboard = () => {
  return (
        <div className="row">
            <div className="col-8 col-md-12">
                <div className="row">
                    {
                        data.summary.map((item, index) => (
                            <div key={`summary-${index}`} className="col-6 col-md-6 col-sm-12 mb">
                                <SummaryBox item={item} />
                            </div>
                        ))
                    }
                </div>
            </div>
                <BasicTable/>
        </div>
  )
};

export default Dashboard;