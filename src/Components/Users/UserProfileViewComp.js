import React, { useState, useEffect } from 'react'
import jwt from 'jwt-decode'
import { compareAsc, format } from 'date-fns'
import { Link } from 'react-router-dom';
let SERVER_URL = process.env.REACT_APP_BASE_URL;
const token = JSON.parse(localStorage.getItem('key'));
const date = new Date();
const date_formate = format(date, 'yyyy-MM-dd HH:m:SS')




function UserProfileViewComp() {
    const [fname, setFname] = useState('')
    const [mname, setMname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [contact, setContact] = useState('')
    const [birthdata, setBirthdata] = useState()
    const [joiningdate, setJoiningdate] = useState()
    const [comp, setComp] = useState('');
    const [dept, setDept] = useState('')
    const [role, setRole] = useState('')
    const [reptMng, setReptMng] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        getOpeningItem(userId)
    }, [])

    const getOpeningItem = (id) => {
        const response = fetch(SERVER_URL + `api/edit_users`,
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token.value}`
                },
                body: JSON.stringify({ id: id }),
            }).then(res => res.json())
            .then(data => {
                console.log(data.result);
                setEmail(data.result.email)
                setFname(data.result.fname)
                setMname(data.result.mname)
                setLname(data.result.lname)
                setContact(data.result.contact_no)

                const UploadingDate = new Date(data.result.joining_date).toLocaleString('en-us', { month: 'short', day: 'numeric', year: 'numeric' })
                setJoiningdate(UploadingDate);
                setComp(data.result.company);
                setDept(data.result.dept_name)
                setRole(data.result.role_name)
                setReptMng(data.result.rept_mng_id)




            });
    }
    return (
        <div className="row-bg">
            <div className="form_style_2">
                <div className="row">
                    <div className="col-md-4">
                        <div className="pro_wrp pro_bor">
                            <div className="pro_img">
                                <img src="assets/images/5.png" alt="" />
                            </div>
                            <div className="pro_detail">
                                <div className="pro_title">{fname ? fname : ''}{mname ? ' ' + mname : ''}{lname ? ' ' + lname : ''}</div>
                                <div className="pro_sub_head">{role}</div>
                                <div className="pro_sub_head">
                                    <img src="assets/images/department.png" alt="department" /> {dept}
                                    <img src="assets/images/location.png" alt="location" /> Noida
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="pro_wrp pro_bor">
                            <div className="pro_sub_head"><img src="assets/images/mobile.png" alt="Contact Number" /> +91 {contact}</div>
                            <div className="pro_sub_head"><img src="assets/images/mail1.png" alt="department" /> {email}</div>
                            <div className="pro_sub_head"><img src="assets/images/birthday.png" alt="Date of Birth" /> {birthdata ? birthdata : 'N/A'}</div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="pro_wrp">
                            <div className="pro_heading">DATE OF JOINING</div>
                            <div className="pro_sub_head"><img src="assets/images/joining.png" alt="Date of Joining" />  {joiningdate}</div>

                            <div className="pro_heading mt15">REPORTING MANAGER</div>
                            <div className="pro_sub_head">Pallavi verma {reptMng}</div>
                        </div>
                    </div>
                </div>
                <div className="profile_wrapper mt60">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="nav flex-column nav-pills nav-pills-custom" id="profile-tab" role="tablist" aria-orientation="vertical">
                                <Link className="nav-link active" id="personal-tab" data-bs-toggle="tab" href="#personal" data-bs-target="#personal">
                                    Personal
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-10">
                        <div className="tab-content" id="profile-tabContent">
								<div className="tab-pane fade show active" id="personal" role="tabpanel" aria-labelledby="personal-tab">
								
									<div id="tabs">
										<ul className="innertabbings">
											<li className="active"><Link to="#tabs-1">Personal Profile</Link></li>
											<li><Link to="#tabs-2">Contact Details</Link></li>
											<li><Link to="#tabs-3">Family Details</Link></li>
											<li><Link to="#tabs-4">Employee Documents</Link></li>
										  </ul>
											<div id="tabs-1">
												<div className="row mb30">
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Salutation</div>
															<div className="form-input">
																<select className="selectpicker selectpicker1">
																	<option>Select</option>
																</select>
															</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">FIRST NAME</div>
															<div className="form-input">
																<input type="text" placeholder="Enter First Name" className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Middle Name</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Middle Name" className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Last Name</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Last Name" className="form-control form-control1" />
															</div>
														</div>
													</div>
												</div>
												<div className="row mb30">
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Pseudo/Nick Name</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Pseudo/Nick Name" className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Father/Husband Name</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Father/Husband Name" className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Gender</div>
															<div className="form-input">
																<select className="selectpicker selectpicker1">
																	<option>Male</option>
																	<option>Female</option>
																</select>
															</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Nationality</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Nationality" className="form-control form-control1" />
															</div>
														</div>
													</div>
												</div>
												<div className="row mb30">
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Place of Birth</div>
															<div className="form-input">
																<input type="text" placeholder="Place of birth" className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Religion</div>
															<div className="form-input">
																<select className="selectpicker selectpicker1">
																	<option>Select</option>
																</select>
															</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Caste</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Caste" className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Mother Tongue</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Mother Tongue" className="form-control form-control1" />
															</div>
														</div>
													</div>
												</div>
												
												<div className="row mb30">
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Date Of Birth</div>
															<div className="form-input date date_picker">
																<input type="text" className="form-control" name="" id="" value="" placeholder="Select Date Of Birth" />
																<span className="input-group-addon mb00">
																	<img src="images/calender1.png" alt=""/>
																</span>
															</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Age</div>
															<div className="form-input">
																<input type="text" placeholder="Age" className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Marital Status</div>
															<div className="form-input">
																<select className="selectpicker selectpicker1">
																	<option>Married</option>
																	<option>Unmarried</option>
																</select>
															</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">blood group</div>
															<div className="form-input">
																<input type="text" placeholder="Enter blood group" className="form-control form-control1" />
															</div>
														</div>
													</div>
												</div>
												
												<div className="row mb30">
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Wedding anniversary</div>
															<div className="form-input date date_picker">
																<input type="text" className="form-control" name="" id="" value="" placeholder="Select Wedding anniversary" />
																<span className="input-group-addon mb00">
																	<img src="images/calender1.png" alt=""/>
																</span>
															</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Differently Abled</div>
															<div className="form-input">
																<select className="selectpicker selectpicker1">
																	<option>Yes</option>
																	<option>No</option>
																</select>
															</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Smoker</div>
															<div className="form-input">
																<select className="selectpicker selectpicker1">
																	<option>Yes</option>
																	<option>No</option>
																</select>
															</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Aadhaar Card Number</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Aadhaar Card Number" className="form-control form-control1" />
															</div>
														</div>
													</div>
												</div>
												
												<div className="row">
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Aadhaar Card Name</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Opening Name" className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Hobbies</div>
															<div className="form-input">
																<select className="selectpicker selectpicker1">
																	<option>Select</option>
																</select>
															</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="form-blk">
															<div className="form-label">Active</div>
															<div className="form-input">
																<select className="selectpicker selectpicker1">
																	<option>Select</option>
																</select>
															</div>
														</div>
													</div>
													
												</div>
												<div className=" text-end">
													<button className="btn_style2"><img src="assets/images/save.png" alt="Save"/> Save</button>
												</div>
												
											</div>
										  <div id="tabs-2">
												<div className="profile_sub_ttl">Current Address</div>
												<div className="row mb30">
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Address 1</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Address 1" className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Address 2</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Address 2" className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">City</div>
															<div className="form-input">
																<select className="selectpicker selectpicker1">
																	<option>Select City</option>
																</select>
															</div>
														</div>
													</div>
												</div>
												<div className="row mb30">
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">State</div>
															<div className="form-input">
																<select className="selectpicker selectpicker1">
																	<option>Select State</option>
																</select>
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Pin Code</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Pin Code" className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Mobile #</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Mobile Contact No." className="form-control form-control1" />
															</div>
														</div>
													</div>
												</div>
												<div className="row mb30">
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Home #</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Home Contact No." className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Email Work</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Email Work" className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Email Personal</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Email Personal" className="form-control form-control1" />
															</div>
														</div>
													</div>
												</div>
												
												<div className="profile_sub_ttl mt15">Permantent Address</div>
												<div className="row mb30">
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Address 1</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Address 1" className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Address 2</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Address 2" className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">City</div>
															<div className="form-input">
																<select className="selectpicker selectpicker1">
																	<option>Select City</option>
																</select>
															</div>
														</div>
													</div>
												</div>
												<div className="row mb30">
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">State</div>
															<div className="form-input">
																<select className="selectpicker selectpicker1">
																	<option>Select State</option>
																</select>
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Pin Code</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Pin Code" className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Mobile #</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Mobile Contact No." className="form-control form-control1" />
															</div>
														</div>
													</div>
												</div>
												<div className="row mb30">
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Home #</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Home Contact No." className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Email Work</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Email Work" className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Email Personal</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Email Personal" className="form-control form-control1" />
															</div>
														</div>
													</div>
												</div>
												
												<div className="profile_sub_ttl mt15">Emergency Contact</div>
												<div className="row mb30">
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Name</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Name" className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Relationship</div>
															<div className="form-input">
																<select className="selectpicker selectpicker1">
																	<option>Select Relation</option>
																</select>
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Address 1</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Address 1" className="form-control form-control1" />
															</div>
														</div>
													</div>
												</div>
												<div className="row mb30">
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Address 2</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Address 2" className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">City</div>
															<div className="form-input">
																<select className="selectpicker selectpicker1">
																	<option>Select City</option>
																</select>
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">State</div>
															<div className="form-input">
																<select className="selectpicker selectpicker1">
																	<option>Select State</option>
																</select>
															</div>
														</div>
													</div>
												</div>
												<div className="row mb30">
													
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Pin Code</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Pin Code" className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Mobile #</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Mobile Contact No." className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Home #</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Home Contact No." className="form-control form-control1" />
															</div>
														</div>
													</div>
												</div>
												<div className="row mb30">
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Email Work</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Email Work" className="form-control form-control1" />
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-blk">
															<div className="form-label">Email Personal</div>
															<div className="form-input">
																<input type="text" placeholder="Enter Email Personal" className="form-control form-control1" />
															</div>
														</div>
													</div>
												</div>
												<div className=" text-end">
													<button className="btn_style2"><img src="assets/images/save.png" alt="Save"/> Save</button>
												</div>
											</div>
											<div id="tabs-3">
												<div className="text-end mb15">
												<button  className="btn_style2" data-toggle="modal" data-target="#familydetail"><i className="fa fa-plus"></i></button>
												</div>
												<table className="table_style_1">
													<thead>
														<tr>
															<th>Relation</th>
															<th>Name</th>
															<th>Gender</th>
															<th>Date of Birth</th>
															<th>Qualification</th>
															<th>Occupation</th>
															<th></th>
														</tr>
													</thead>
													<tbody>
													
													</tbody>
												</table>
										  </div>
										   <div id="tabs-4">
												<div className="text-end mb15">
													<button  className="btn_style2"  data-toggle="modal" data-target="#employeedocument"><i className="fa fa-plus"></i></button>
												</div>
												<table className="table_style_1">
													<thead>
														<tr>
															<th>Document Type </th>	
															<th>Document Number </th>	
															<th>Issue Date 	</th>
															<th>Issue Place </th>	
															<th>Expiration Date </th>	
															<th>Authenticate </th>	
															<th>Attachment </th>
														</tr>
													</thead>
													<tbody>
													
													</tbody>
												</table>
										  </div>
									</div>
								
								
								
								
								
								</div>
								
								<div className="tab-pane fade" id="official" role="tabpanel" aria-labelledby="official-tab">
									<div id="officialtab">
										<ul className="innertabbings">
											<li className="active"><a href="#officialtab-1">Organization</a></li>
											<li><a href="#officialtab-2">Employment Specifics</a></li>
										</ul>
										<div id="officialtab-1">
											<div className="row mb30">
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Company</div>
														<div className="form-input">
															<select className="selectpicker selectpicker1">
																<option>Select Company</option>
															</select>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Division</div>
														<div className="form-input">
															<select className="selectpicker selectpicker1">
																<option>Select Division</option>
															</select>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Zone</div>
														<div className="form-input">
															<select className="selectpicker selectpicker1">
																<option>Select Zone</option>
															</select>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Branch</div>
														<div className="form-input">
															<select className="selectpicker selectpicker1">
																<option>Select Branch</option>
															</select>
														</div>
													</div>
												</div>
											</div>
											<div className="row mb30">
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Work Location</div>
														<div className="form-input">
															<select className="selectpicker selectpicker1">
																<option>Select Work Location</option>
															</select>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Department</div>
														<div className="form-input">
															<input type="text" placeholder="Enter Department" className="form-control form-control1" />
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Deputation</div>
														<div className="form-input">
															<input type="text" placeholder="Enter Deputation" className="form-control form-control1" />
														</div>
													</div>
												</div>
											</div>
											<div className=" text-end">
													<button className="btn_style2"><img src="assets/images/save.png" alt="Save"/> Save</button>
												</div>
										</div>
										<div id="officialtab-2">
											<div className="row mb30">
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Employee Code</div>
														<div className="form-input">
															<input type="text" placeholder="Enter Employee Code" className="form-control form-control1" />
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Employee Status</div>
														<div className="form-input">
															<select className="selectpicker selectpicker1">
																<option>Select Employee Status</option>
															</select>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Date of joining</div>
														<div className="form-input date date_picker">
															<input type="text" className="form-control" name="" id="" value="" placeholder="Select Date of joining" />
															<span className="input-group-addon mb00">
																<img src="assets/images/calender1.png" alt=""/>
															</span>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Group Date of joining </div>
														<div className="form-input date date_picker">
															<input type="text" className="form-control" name="" id="" value="" placeholder="Select Group Date of joining" />
															<span className="input-group-addon mb00">
																<img src="assets/images/calender1.png" alt=""/>
															</span>
														</div>
													</div>
												</div>
											</div>
											<div className="row mb30">
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Probation Period (Months)</div>
														<div className="form-input">
															<input type="text" placeholder="Enter Probation Period" className="form-control form-control1" />
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Confirmation Date</div>
														<div className="form-input date date_picker">
															<input type="text" className="form-control" name="" id="" value="" placeholder="Select Confirmation Date" />
															<span className="input-group-addon mb00">
																<img src="assets/images/calender1.png" alt=""/>
															</span>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Extended Confirmation Date </div>
														<div className="form-input date date_picker">
															<input type="text" className="form-control" name="" id="" value="" placeholder="Select Extended Confirmation Date " />
															<span className="input-group-addon mb00">
																<img src="assets/images/calender1.png" alt=""/>
															</span>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Designation </div>
														<div className="form-input">
															<select className="selectpicker selectpicker1">
																<option>Select Designation </option>
															</select>
														</div>
													</div>
												</div>
											</div>
											<div className="row mb30">
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Functional Designation</div>
														<div className="form-input">
															<select className="selectpicker selectpicker1">
																<option>Select Functional Designation </option>
															</select>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Grade</div>
														<div className="form-input">
															<select className="selectpicker selectpicker1">
																<option>Select Grade</option>
															</select>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Scale</div>
														<div className="form-input">
															<select className="selectpicker selectpicker1">
																<option>Select Scale</option>
															</select>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Level</div>
														<div className="form-input">
															<select className="selectpicker selectpicker1">
																<option>Select Level</option>
															</select>
														</div>
													</div>
												</div>
											</div>
											<div className="row mb30">
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">PMS Group</div>
														<div className="form-input">
															<select className="selectpicker selectpicker1">
																<option>Select PMS Group</option>
															</select>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Employee Category</div>
														<div className="form-input">
															<select className="selectpicker selectpicker1">
																<option>Select Employee Category</option>
															</select>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Salary Group</div>
														<div className="form-input">
															<select className="selectpicker selectpicker1">
																<option>Select Salary Group</option>
															</select>
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Cost Center </div>
														<div className="form-input">
															<select className="selectpicker selectpicker1">
																<option>Select Cost Center</option>
															</select>
														</div>
													</div>
												</div>
											</div>
											<div className="row mb30">
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Notice Period (Days) </div>
														<div className="form-input">
															<input type="text" placeholder="Enter Notice Period" className="form-control form-control1" />
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Band Name </div>
														<div className="form-input">
															<input type="text" placeholder="Enter Band Name " className="form-control form-control1" />
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-blk">
														<div className="form-label">Sub Department Name </div>
														<div className="form-input">
															<select className="selectpicker selectpicker1">
																<option>Select Sub Department Name</option>
															</select>
														</div>
													</div>
												</div>
											</div>
											<div className=" text-end">
												<button className="btn_style2"><img src="assets/images/save.png" alt="Save"/> Save</button>
											</div>
										</div>
									</div>
								</div>
								
								<div className="tab-pane fade" id="proficiency" role="tabpanel" aria-labelledby="proficiency-tab">
									<div id="proficiencytab">
										<ul className="innertabbings">
											<li className="active"><a href="#proficiencytab-1">Qualification</a></li>
											<li><a href="#proficiencytab-2">Language</a></li>
											<li className="active"><a href="#proficiencytab-3">Skills</a></li>
										  </ul>
										<div id="proficiencytab-1">
											<div className="text-end mb15">
												<button  className="btn_style2"  data-toggle="modal" data-target="#qualification"><i className="fa fa-plus"></i></button>
											</div>
											<table className="table_style_1">
												<thead>
													<tr>
														<th>Qualification </th>		
														<th>Specialization </th>		
														<th>Course </th>		
														<th>Pursuing </th>		
														<th>Aggregate % </th>		
														<th>Passing Year 	</th>	
														<th>College </th>		
														<th>University 	</th>	
														<th>Highest</th>	
													</tr>
												</thead>
												<tbody>
												
												</tbody>
											</table>
										</div>
										<div id="proficiencytab-2">
											<div className="text-end mb15">
												<button  className="btn_style2"  data-toggle="modal" data-target="#language"><i className="fa fa-plus"></i></button>
											</div>
											<table className="table_style_1">
												<thead>
													<tr>
														<th>Language </th>		
														<th>Read</th>		
														<th>Write</th>		
														<th>Speak </th>		
													</tr>
												</thead>
												<tbody>
												
												</tbody>
											</table>
										</div>
										<div id="proficiencytab-3">
											<div className="text-end mb15">
												<button  className="btn_style2"  data-toggle="modal" data-target="#skills"><i className="fa fa-plus"></i></button>
											</div>
											<table className="table_style_1">
												<thead>
													<tr>
														<th>Skill Name </th>		
														<th>Experience</th>		
														<th>Primary Skills</th>		
														<th>Certified</th>	
														<th>Skill Level </th>		
														<th>Certification </th>		
														<th>Certification Name	</th>														
													</tr>
												</thead>
												<tbody>												
												</tbody>
											</table>
										</div>
									</div>
								</div>								
							</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfileViewComp
