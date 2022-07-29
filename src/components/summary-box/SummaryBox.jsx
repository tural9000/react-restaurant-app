import './summary-box.scss';
import Box from './../box/Box';
import {colors} from '../../constants';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';


const SummaryBox = ({ item }) => {
  return (
    <Box>
        <div className='summary-box'>
            <div className='summary-box__info'>
                <div className='summary-box__info__title'>
                        <div>{item.title}</div>
                        <span>{item.subtitle}</span>
                </div>
                <div className='summary-box__info__value'>
                        {item.value}
                </div>
            </div>
            <div className='summary-box__chart'>
                <CircularProgressbarWithChildren
                    value={item.percent}
                    strokeWidth={10}
                    styles={buildStyles({
                        pathColor: item.percent < 50 ? colors.red: colors.purple,
                        trailColor: 'transparent',
                        strokeLinecap: 'round'
                    })}
                >
                    <div className='summary-box__chart__value'>
                        {item.percent}%
                    </div>  
                </CircularProgressbarWithChildren>
            </div>
        </div>
    </Box>
   
  )
}

export default SummaryBox;
