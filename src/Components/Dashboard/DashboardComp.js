import React from 'react'
function DashboardComp() {
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
                            <div className="circular_blk">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="ttl">Form Name</div>
                                        <div className="ttl_name">XXXXXX</div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="ttl">Sep 15, 2022</div>
                                        <div className="ttl_name">Upload on</div>
                                    </div>
                                    <div className="col-md-4 text-end">
                                        <button className="btn_1">Download</button>
                                    </div>
                                </div>
                            </div>
                            <div className="circular_blk">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="ttl">Form Name</div>
                                        <div className="ttl_name">XXXXXX</div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="ttl">Sep 15, 2022</div>
                                        <div className="ttl_name">Upload on</div>
                                    </div>
                                    <div className="col-md-4 text-end">
                                        <button className="btn_1">Download</button>
                                    </div>
                                </div>
                            </div>
                            <div className="circular_blk">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="ttl">Form Name</div>
                                        <div className="ttl_name">XXXXXX</div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="ttl">Sep 15, 2022</div>
                                        <div className="ttl_name">Upload on</div>
                                    </div>
                                    <div className="col-md-4 text-end">
                                        <button className="btn_1">Download</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="view_all">
                            View All <img src="assets/images/arrow_icon.png" />
                        </div>
                    </div>


                    <div className="white_box1">
                        <h3>Openings</h3>
                        <ul className="open_listing_wrp">
                            <li className="open_listing_blk">
                                <span className="btn_blue">Development</span>
                                <div className="open_ttl">
                                    19844- Front-end Developer - Web Apps - React.js/Node.js/JavaScript
                                </div>
                                <div className="open_date">
                                    <img src="assets/images/dateline.png" alt="" className="mr05" /> 03 Nov, 2020
                                </div>
                            </li>
                            <li className="open_listing_blk">
                                <span className="btn_green">Editorial</span>
                                <div className="open_ttl">
                                    19845- Editorial Assistant Manager
                                </div>
                                <div className="open_date">
                                    <img src="assets/images/dateline.png" alt="" className="mr05" /> 05 Nov, 2020
                                </div>
                            </li>
                            <li className="open_listing_blk">
                                <span className="btn_red">Accounts</span>
                                <div className="open_ttl">
                                    19848- Chartered Accountant- Controllership
                                </div>
                                <div className="open_date">
                                    <img src="assets/images/dateline.png" alt="" className="mr05" /> 08 Nov, 2020
                                </div>
                            </li>
                        </ul>
                        <div className="view_all">
                            View All <img src="assets/images/arrow_icon.png" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DashboardComp
