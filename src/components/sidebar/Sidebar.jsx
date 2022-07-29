import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { images } from './../../constants';
import sidebarNav from '../../configs/sidebarNav';
import './sidebar.scss';
import { changeAuth } from './../../redux/action';

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const curPath = location.pathname.split('/')[1];
        const activeItem = sidebarNav.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0? 0: activeItem)
    }, [location])

    const closeSidebar = () => {
        document.querySelector('.main__content').style.transform = 'scale(1) translateX(0)'
        setTimeout(() => {
            document.body.classList.remove('sidebar-open')
            document.querySelector('.main__content').style = ''
        }, 500);
    }
    const closeAdmin = () => {
        localStorage.removeItem('Auth')
        dispatch(changeAuth(false));
        navigate('/')
    }

  return (
    <div className="sidebar">
        <div className="sidebar__logo">
            <img src={images.logo} alt="" />
            <div className="sidebar-close" onClick={closeSidebar}>   
                <i className="bx bx-x"></i>
            </div>
        </div>
        <div className="sidebar__menu">
            {sidebarNav.map((nav, index) => (
                <Link to={nav.link} key={`nav-${index}`} className={`sidebar__menu__item ${ 
                    activeIndex === index && 'active'}`}>
                    <div className="sidebar__menu__item__icon">
                            {nav.icon}
                    </div>
                    <div className="sidebar__menu__item__text">
                            {nav.text}
                    </div>
                </Link>
            ))}
        </div>
        <div className="sidebar__menu__item" style={{marginTop: '2rem'}}>
            <div className="sidebar__menu__item__icon">
                <i className="bx bx-log-out"></i>
            </div>
            <div className="sidebar__menu__item__text" >
                <span 
                onClick={closeAdmin} 
                style={{cursor: 'pointer'}}>Logout</span>
            </div>
        </div>
    </div>
  )
}

export default Sidebar