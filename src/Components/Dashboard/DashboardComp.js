import React, { useEffect, useState, useRef } from 'react'

import ReactPaginate from "react-paginate";
import { compareAsc, format } from 'date-fns'
import { Link } from 'react-router-dom';

import fileDownload from 'js-file-download';
import downloadjs from 'downloadjs';

function DashboardComp() {
    let SERVER_URL = process.env.REACT_APP_BASE_URL;
    let FORM_URL = process.env.REACT_APP_BASE_URL_FORM;
    let token = JSON.parse(localStorage.getItem('key'));
    // alert(FORM_URL)
    const pagination = useRef();
    const [opnperPage, setOpnperPage] = useState();
    const [opnlist, setOpnlist] = useState([]);
    const [opntotalitem, setTotalitem] = useState();

    const formpagination = useRef();
    const [formlistPerPage, setFormlistPerPage] = useState();
    const [formlist, setFormlist] = useState([]);
    const [formlistTotalitem, setFormlistTotalitem] = useState();


    const setPageopening = ({ selected }) => {
        getOpening(selected + 1);
    }
    const setPageform = ({ selected }) => {
        getForm(selected + 1);
    }
    useEffect(() => {
        getOpening()
        getForm()
        getCircular()
    }, [])
    const getCircular = async () => {
        // const response = await fetch(SERVER_URL + `api/dashboard_forms?page=${pagenumber}`,
        //     {
        //         method: 'GET',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json',
        //             'authorization': `bearer ${token.value}`
        //         },
        //     })
    }
    const getForm = async (pagenumber) => {
        const response = await fetch(SERVER_URL + `api/dashboard_forms?page=${pagenumber}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token.value}`
                },
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setFormlist(data.result)
                setFormlistTotalitem(data.nbPages);
                setFormlistPerPage(data.limit)
            });
    }

    const getOpening = async (pagenumber) => {


        const response = await fetch(SERVER_URL + `api/dashboard_opening?page=${pagenumber}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token.value}`
                },
            })
            .then(res => res.json())
            .then(data => {
                setOpnlist(data.result)
                setTotalitem(data.nbPages);
                setOpnperPage(data.limit)
            });
    }
    const downloadImage = async (downloadPath) => {
        alert(downloadPath);
        let SERVER_URL = process.env.REACT_APP_BASE_URL;
        let token = JSON.parse(localStorage.getItem('key'));


        const response = await fetch(SERVER_URL + `api/download_files`,
            //  console.log(response);
            {
                method: 'GET',
                resposType: 'blob',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token.value}`
                }
            }).then(res => {
                // const blob =  res.blob();
                console.log(res);
                downloadjs('1670406957087_1.png');
            })




    }

    return (
        <div className="row-bg">
            <div className="row">
                <div className="col-lg-7">
                    <div className="white_box active">
                        <img src="assets/images/user1.png" alt="" />
                        <div className="greet_blk">
                            <span className="greet_name">Greetings, Mr Sachin</span>
                            <span className="greet_date">Today is Wednesday, Nov 9th, 2022</span>
                        </div>
                    </div>

                    <div className="white_box">
                        <img src="assets/images/img1.png" alt="" className="float-end ml15" />
                        <h3>Message From Management</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. </p>
                        <div className="user_profile_detail">
                            <img src="assets/images/user1.png" alt="" />
                            <div className="user_name">Sophie Kowalski</div>
                            <div className="user_detail">Creative Director</div>
                        </div>
                    </div>

                    <div className="white_box">
                        <nav className="wishes_nav">
                            <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-birthday-tab" data-bs-toggle="tab" data-bs-target="#nav-birthday" type="button" role="tab" aria-controls="nav-birthday" aria-selected="true">Birthday</button>
                                <button className="nav-link" id="nav-service-tab" data-bs-toggle="tab" data-bs-target="#nav-service" type="button" role="tab" aria-controls="nav-service" aria-selected="false">Service</button>
                                <button className="nav-link" id="nav-wedding-tab" data-bs-toggle="tab" data-bs-target="#nav-wedding" type="button" role="tab" aria-controls="nav-wedding" aria-selected="false">Wedding</button>
                            </div>
                        </nav>
                        <h3>Wishes & Greetings</h3>
                        <div className="tab-content wishes_nav_tab" id="nav-tabContent">
                            <div className="tab-pane fade active show" id="nav-birthday" role="tabpanel" aria-labelledby="nav-birthday-tab">
                                <ul className="wishes_listing_wrp">
                                    <li className="wishes_listing_blk">
                                        <img src="assets/images/1.png" alt="" />
                                        <div className="employe_name">Prabal Singh</div>
                                        <div className="employe_post">Frontend Developer</div>
                                        <div className="wishes_date">
                                            <div className="wishes_date_icon">
                                                <img src="assets/images/birthday_icon.png" alt="" />
                                            </div>
                                            <div className="wishesdate">12 November</div>
                                        </div>
                                        <button className="btn_style1">Send Wishes</button>
                                    </li>
                                    <li className="wishes_listing_blk">
                                        <img src="assets/images/2.png" alt="" />
                                        <div className="employe_name">Rahul Sharma</div>
                                        <div className="employe_post">Ui Designer</div>
                                        <div className="wishes_date">
                                            <div className="wishes_date_icon">
                                                <img src="assets/images/birthday_icon.png" alt="" />
                                            </div>
                                            <div className="wishesdate">12 November</div>
                                        </div>
                                        <button className="btn_style1">Send Wishes</button>
                                    </li>
                                    <li className="wishes_listing_blk">
                                        <img src="assets/images/3.png" alt="" />
                                        <div className="employe_name">David Hale</div>
                                        <div className="employe_post">Layout Designer</div>
                                        <div className="wishes_date">
                                            <div className="wishes_date_icon">
                                                <img src="assets/images/birthday_icon.png" alt="" />
                                            </div>
                                            <div className="wishesdate">12 November</div>
                                        </div>
                                        <button className="btn_style1">Send Wishes</button>
                                    </li>
                                    <li className="wishes_listing_blk">
                                        <img src="assets/images/4.png" alt="" />
                                        <div className="employe_name">Sarah Chh</div>
                                        <div className="employe_post">Quality Controller</div>
                                        <div className="wishes_date">
                                            <div className="wishes_date_icon">
                                                <img src="assets/images/birthday_icon.png" alt="" />
                                            </div>
                                            <div className="wishesdate">12 November</div>
                                        </div>
                                        <button className="btn_style1">Send Wishes</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-pane fade" id="nav-service" role="tabpanel" aria-labelledby="nav-service-tab">
                                <ul className="wishes_listing_wrp">
                                    <li className="wishes_listing_blk">
                                        <img src="assets/images/1.png" alt="" />
                                        <div className="employe_name">Prabal Singh</div>
                                        <div className="employe_post">Frontend Developer</div>
                                        <div className="wishes_date">
                                            <div className="wishes_date_icon">
                                                <img src="assets/images/birthday_icon.png" alt="" />
                                            </div>
                                            <div className="wishesdate">12 November</div>
                                        </div>
                                        <button className="btn_style1">Send Wishes</button>
                                    </li>
                                    <li className="wishes_listing_blk">
                                        <img src="assets/images/2.png" alt="" />
                                        <div className="employe_name">Rahul Sharma</div>
                                        <div className="employe_post">Ui Designer</div>
                                        <div className="wishes_date">
                                            <div className="wishes_date_icon">
                                                <img src="assets/images/birthday_icon.png" alt="" />
                                            </div>
                                            <div className="wishesdate">12 November</div>
                                        </div>
                                        <button className="btn_style1">Send Wishes</button>
                                    </li>
                                    <li className="wishes_listing_blk">
                                        <img src="assets/images/3.png" alt="" />
                                        <div className="employe_name">David Hale</div>
                                        <div className="employe_post">Layout Designer</div>
                                        <div className="wishes_date">
                                            <div className="wishes_date_icon">
                                                <img src="assets/images/birthday_icon.png" alt="" />
                                            </div>
                                            <div className="wishesdate">12 November</div>
                                        </div>
                                        <button className="btn_style1">Send Wishes</button>
                                    </li>
                                    <li className="wishes_listing_blk">
                                        <img src="assets/images/4.png" alt="" />
                                        <div className="employe_name">Sarah Chh</div>
                                        <div className="employe_post">Quality Controller</div>
                                        <div className="wishes_date">
                                            <div className="wishes_date_icon">
                                                <img src="assets/images/birthday_icon.png" alt="" />
                                            </div>
                                            <div className="wishesdate">12 November</div>
                                        </div>
                                        <button className="btn_style1">Send Wishes</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-pane fade" id="nav-wedding" role="tabpanel" aria-labelledby="nav-wedding-tab">
                                <ul className="wishes_listing_wrp">
                                    <li className="wishes_listing_blk">
                                        <img src="assets/images/1.png" alt="" />
                                        <div className="employe_name">Prabal Singh</div>
                                        <div className="employe_post">Frontend Developer</div>
                                        <div className="wishes_date">
                                            <div className="wishes_date_icon">
                                                <img src="assets/images/birthday_icon.png" alt="" />
                                            </div>
                                            <div className="wishesdate">12 November</div>
                                        </div>
                                        <button className="btn_style1">Send Wishes</button>
                                    </li>
                                    <li className="wishes_listing_blk">
                                        <img src="assets/images/2.png" alt="" />
                                        <div className="employe_name">Rahul Sharma</div>
                                        <div className="employe_post">Ui Designer</div>
                                        <div className="wishes_date">
                                            <div className="wishes_date_icon">
                                                <img src="assets/images/birthday_icon.png" alt="" />
                                            </div>
                                            <div className="wishesdate">12 November</div>
                                        </div>
                                        <button className="btn_style1">Send Wishes</button>
                                    </li>
                                    <li className="wishes_listing_blk">
                                        <img src="assets/images/3.png" alt="" />
                                        <div className="employe_name">David Hale</div>
                                        <div className="employe_post">Layout Designer</div>
                                        <div className="wishes_date">
                                            <div className="wishes_date_icon">
                                                <img src="assets/images/birthday_icon.png" alt="" />
                                            </div>
                                            <div className="wishesdate">12 November</div>
                                        </div>
                                        <button className="btn_style1">Send Wishes</button>
                                    </li>
                                    <li className="wishes_listing_blk">
                                        <img src="assets/images/4.png" alt="" />
                                        <div className="employe_name">Sarah Chh</div>
                                        <div className="employe_post">Quality Controller</div>
                                        <div className="wishes_date">
                                            <div className="wishes_date_icon">
                                                <img src="assets/images/birthday_icon.png" alt="" />
                                            </div>
                                            <div className="wishesdate">12 November</div>
                                        </div>
                                        <button className="btn_style1">Send Wishes</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="white_box">
                        <h3>Circular</h3>
                        <div className="circular_wrp">
                            <div className="row circular_blk">
                                <div className="col-md-4">
                                    <div className="ttl">14 Oct,2020</div>
                                    <div className="ttl_name">Date</div>
                                </div>
                                <div className="col-md-4">
                                    <div className="ttl">List of Holidays</div>
                                    <div className="ttl_name">Name</div>
                                </div>
                                <div className="col-md-4 text-end">
                                    <button className="btn_1">Download</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="col-lg-5">
                    <div className="white_box">
                        <h3>Quick Actions</h3>
                        <ul className="leave_wrp">
                            <li className="leave_blk">
                                <img src="assets/images/leave.png" alt="" />
                                <div className="leave_ttl">Apply Leave</div>
                            </li>
                            <li className="leave_blk">
                                <img src="assets/images/outdoor.png" alt="" />
                                <div className="leave_ttl">Apply Outdoor</div>
                            </li>
                            <li className="leave_blk">
                                <img src="assets/images/attendance.png" alt="" />
                                <div className="leave_ttl">Attendance</div>
                            </li>
                            <li className="leave_blk">
                                <img src="assets/images/compoff.png" alt="" />
                                <div className="leave_ttl">Compoff</div>
                            </li>
                        </ul>
                    </div>

                    <div className="white_box1">
                        <h3>Forms</h3>
                        <div className="circular_wrp">
                            {
                                formlist.map((item, ind) => {

                                    return <div key={ind} className="circular_blk">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="ttl">{item.title}</div>
                                                <div className="ttl_name">Form Title</div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="ttl"> {format(new Date(item.created_on), "MMM dd, yyyy")}</div>
                                                <div className="ttl_name">Upload on</div>
                                            </div>
                                            <div className="col-md-4 text-end">
                                                <Link className="btn_1" download target="_blank" to={`//${FORM_URL + item.img}`} >Download</Link>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                            {/* <div className="circular_blk"></div> */}
                        </div>
                        <div className="view_all">

                            <ReactPaginate
                                ref={pagination}
                                pageCount={Math.ceil(formlistTotalitem / formlistPerPage)}
                                pageRangeDisplayed={0}
                                marginPagesDisplayed={0}
                                onPageChange={setPageform}
                                containerClassName="pagination"
                                activeClassName="active"
                                pageLinkClassName="page-link"
                                breakLinkClassName="page-link"
                                nextLinkClassName="page-link"
                                previousLinkClassName="page-link"
                                pageClassName="page-item"
                                breakClassName="page-item"
                                nextClassName="page-item"
                                previousClassName="page-item"
                                previousLabel={<>&laquo;</>}
                                nextLabel={<>&raquo;</>}
                            />
                        </div>
                    </div>


                    <div className="white_box1">
                        <h3>Openings</h3>
                        <ul className="open_listing_wrp">
                            {
                                opnlist.map((item, ind) => {
                                    return <li key={ind} className="open_listing_blk">
                                        <span className="btn_blue">{item.dept_name}</span>
                                        <div className="open_ttl">
                                            {item.opening}- {item.role_name} - {item.title}
                                        </div>
                                        <div className="open_date">
                                            <img src="assets/images/dateline.png" alt="" className="mr05" /> 03 Nov, 2020
                                        </div>
                                    </li>
                                })}
                        </ul>
                        <div className="view_all">
                            {/* View All <img src="assets/images/arrow_icon.png" />
                            <h1 onClick={e => pagination.current.setState({ selected: 10 - 1 })} ></h1> */}
                            <ReactPaginate
                                ref={pagination}
                                pageCount={Math.ceil(opntotalitem / opnperPage)}
                                pageRangeDisplayed={0}
                                marginPagesDisplayed={0}
                                onPageChange={setPageopening}
                                containerClassName="pagination"
                                activeClassName="active"
                                pageLinkClassName="page-link"
                                breakLinkClassName="page-link"
                                nextLinkClassName="page-link"
                                previousLinkClassName="page-link"
                                pageClassName="page-item"
                                breakClassName="page-item"
                                nextClassName="page-item"
                                previousClassName="page-item"
                                previousLabel={<>&laquo;</>}
                                nextLabel={<>&raquo;</>}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DashboardComp
