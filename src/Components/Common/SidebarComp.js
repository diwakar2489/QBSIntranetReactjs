import React,{useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
// const navigate = useNavigate()

function SidebarComp() {
    let pathname = window.location.pathname;
    useEffect(() => {
        pathname = window.location.pathname;
    }, [window.location.pathname]);


    const [linkActive, setLinkActive] = useState('Dashboard')
    // const handleActive = (e) => {
    //     e.preventDefault();
    //     const crturl = e.currentTarget.getAttribute("att-url");

    //      setLinkActive(crturl)
    //      alert(linkActive)
    // }
   // alert(linkActive)
    return (
        <div id="sidebar">
            <div className="logo_sidebar">
                <img src="assets/images/logo.png" alt="" />
            </div>
            <nav id="sidebarMenu" className="d-md-block sidebar" data-scrollbar>
                <div className="position-sticky">
                    <ul className="nav flex-column">
                        <li className={`nav-item ${pathname.match('/dashboard') ? 'active' : ''}`}>
                            <span></span>
                            <Link  className="nav-link" att-url='Dashboard' aria-current="page" to="/dashboard">
                                <img src="assets/images/dashboard.png" alt="" /> Dashboard
                            </Link>
                        </li>
                        <li className={`nav-item ${pathname.match('/policies') ? 'active' : ''} ${pathname.match('/addpolicy') ? 'active' : ''}`}>
                            <span></span>
                            <Link className="nav-link"    aria-current="page" to="/policies">
                                <img src="assets/images/documents.png" alt="" /> Policies
                            </Link>
                        </li>
                        <li className={`nav-item ${pathname.match('/forms') ? 'active' : ''} ${pathname.match('/addform') ? 'active' : ''}`}>
                            <span></span>
                            <Link className="nav-link" aria-current="page" to="/forms">
                                <img src="assets/images/attendence.png" alt="" /> Forms
                            </Link>
                        </li>
                        <li className={`nav-item  ${pathname.match('/openinglist') ? 'active' : ''} ${pathname.match('/addopening') ? 'active' : ''}`}>
                            <span></span>
                            <Link className="nav-link" aria-current="page" to="/openinglist">
                                <img src="assets/images/calender.png" alt="" /> Openings
                            </Link>
                        </li>
                        <li className={`nav-item  ${pathname.match('/circularlist') ? 'active' : ''} ${pathname.match('/addcircular') ? 'active' : ''}`}>
                            <span></span>
                            <Link className="nav-link" aria-current="page" to="/circularlist">
                                <img src="assets/images/setting.png" alt="" /> Circulars
                            </Link>
                        </li>



                        {/* <li className="nav-item">
                            <span></span>
                            <a className="nav-link" aria-current="page" href="#">
                                <img src="assets/images/certificate.png" alt="" /> Director
                            </a>
                        </li>
                        <li className="nav-item">
                            <span></span>
                            <a className="nav-link" aria-current="page" href="#">
                                <img src="assets/images/star.png" alt="" /> Salary Slip
                            </a>
                        </li> */}


<li className={`nav-item  ${pathname.match('/bulletinlist') ? 'active' : ''} ${pathname.match('/addbulletin') ? 'active' : ''}`}>
                            <span></span>
                            <Link className="nav-link" aria-current="page" to="/bulletinlist">
                                <img src="assets/images/setting.png" alt="" /> Bulletin
                            </Link>
                        </li>

                        <li className={`nav-item  ${pathname.match('/messagelist') ? 'active' : ''} ${pathname.match('/adddashboardmessage') ? 'active' : ''}`}>
                            <span></span>
                            <Link className="nav-link" aria-current="page" to="/messagelist">
                                <img src="assets/images/dashboard_msg.png" alt="" /> Dashboard Message
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default SidebarComp
