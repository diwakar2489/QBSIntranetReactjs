import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
function HeaderComp(props) {
    const [user, setUser] = useState();
    const usenavigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem('key');
        localStorage.clear();
        usenavigate('/login');
    }
    useEffect(() => {
        const gettoken = localStorage.getItem('key');
        const token_data = jwt_decode(gettoken);
        const name = token_data.name
        setUser(name)
    }, [])

    return (
        <header className="p-3 mb-3 border-bottom">
            <div className="d-flex flex-wrap align-items-left">
                <div className="pagetitle nav me-lg-auto mb-2 justify-content-center mb-md-0">
                    <a href="#" className="toggle_button">
                        <img src="assets/images/menu.png" alt="desc" />
                    </a>
                    {props.header_title ? props.header_title : ''}
                </div>

                <div className="text-end notification_blk">
                    <a href="#"><img src="assets/images/notification.png" alt="desc" /><span>2</span></a>
                </div>
                <div className="dropdown user_wrp text-end">
                    <a href="#" className="dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="assets/images/user.png" alt="desc" className="rounded-circle" />
                        <div className="user_blk">
                            <span className="username">{user ? user : ''}</span>
                        </div>
                    </a>
                    <ul className="dropdown-menu user_dropdown shadow" aria-labelledby="dropdownUser2" >
                        <li><Link className="dropdown-item" to={'/userprofile'}>Profile</Link></li>
                        <li><a className="dropdown-item" href="#">Change Password</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item" type="button" onClick={logOut}>Logout</button></li>
                    </ul>
                </div>
                <div className="logout text-end"><button type="button" onClick={logOut}><img src="assets/images/logout.png" className="mr05" alt="desc" /> Logout</button></div>
            </div>
        </header>
    )
}

export default HeaderComp
