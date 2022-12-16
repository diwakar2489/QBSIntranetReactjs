import React, { useState, useEffect } from 'react'
import { compareAsc, format } from 'date-fns'

import { useSearchParams, useNavigate, Link } from 'react-router-dom';
let SERVER_URL = process.env.REACT_APP_BASE_URL;
const token = JSON.parse(localStorage.getItem('key'));
function EditUserComp() {
    let navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [comdata, setComdata] = useState([]);
    const [depdata, setDepdata] = useState([]);
    const [roledata, setRoledata] = useState([]);
    const [empcode, setEmpcode] = useState('')
    const [comp, setComp] = useState('');
    const [dept, setDept] = useState('')
    const [role, setRole] = useState('')


    const [fname, setFname] = useState('')
    const [mname, setMname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState()
    const [statusclass, setStatusclass] = useState('active');

    const [reportingMNG, setReportingMNG] = useState()
    const [joiningdate, setJoiningdate] = useState()
    const [contact, setContact] = useState('')
    const [gender, setGender] = useState()
    const [scsMsg, setScsMsg] = useState();
    const [color, setColor] = useState();
    const [user_type, setUser_type] = useState(1)
    const [usertypeclass,setUsertypeclass] = useState('active');
    useEffect(() => {
        getDepartmentList()
        getCompanyList()
        getUserItem()
    }, [])

    useEffect(() => {
        handleChange(dept)
    }, [dept])
    const getUserItem = () => {
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
                setEmpcode(data.result.emp_code)
                setComp(data.result.comp_id);
                setDept(data.result.dept_id)
                setRole(data.result.role_id)
                setStatus(data.result.status)
                setLname(data.result.lname)
                setMname(data.result.mname)
                setFname(data.result.fname)
                setEmail(data.result.email)
                setContact(data.result.contact_no)
                setGender(data.result.gender)
                setReportingMNG(data.result.rept_mng_id)
                setJoiningdate(data.result.joining_date)
                setUser_type(data.result.user_type)
            });
    }
    const getCompanyList = () => {
        const response = fetch(SERVER_URL + `api/company_list`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token.value}`
                },
            }).then(res => res.json())
            .then(data => {
                setComdata(data.result)
            });
    }
    const getDepartmentList = () => {
        const response = fetch(SERVER_URL + `api/department_list`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token.value}`
                },
            }).then(res => res.json())
            .then(data => {
                setDepdata(data.result)
            });
    }
    function handleChange(deptid) {
        setDept(deptid)
        const response = fetch(SERVER_URL + `api/get_department_role`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token.value}`
                },
                body: JSON.stringify({
                    id: deptid,
                }),
            }).then(res => res.json())
            .then(data => {
                setRoledata(data.result)
            });
    }
    const hansleSubmit = (e) => {

        e.preventDefault();
        const date = new Date();
        const date_formate = format(date, 'yyyy-MM-dd HH:m:SS')
        const userId = localStorage.getItem('userId');
        const response = fetch(SERVER_URL + `api/update_users`,
            {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token.value}`
                },
                body: JSON.stringify({
                    comp: comp,
                    dept: dept,
                    role: role,
                    reportingMNG: reportingMNG,
                    joiningdate: joiningdate,
                    fname: fname,
                    mname: mname,
                    lname: lname,
                    status: status,
                    gender: gender,
                    contact: contact,
                    status: status,
                    usertype: user_type,
                    updated_on: date_formate,
                    updated_by: userId,
                    id: id
                }),
            }).then(res => res.json())
            .then(data => {
                if (data.status == true) {
                    setScsMsg(data.msg);
                    setColor('green')
                    setTimeout(() => {
                        return navigate("/userlist")
                    }, 2000);
                } else {
                    setScsMsg(data.msg);
                    setColor('red');
                }
            });
    }
    const handleUsertype = (usertype) => {
        setUser_type(usertype==1?0:1)
        setUsertypeclass(usertype==1?'':'active')
    }
    const handleUserstatus = (arg) => {
       setStatus(arg==1?0:1)
       setStatusclass(arg==1?'':'active')
    }
    const handleGendertype = (arg) => {
        setGender(arg)
    }
    return (
        <div className="row-bg">
            <h3 className="mt05">Edit User</h3>
            <div className="form_style_1 profile_wrapper">
                <div className="row mb20">
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">Employee Code</div>
                            <div className="form-input">
                                <input readOnly value={empcode} type="text" onChange={e => setEmpcode(e.target.value)} placeholder="Enter Employee Code" className="form-control form-control1" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">Company</div>
                            <div className="form-input">
                                <select value={comp} className="form-select" onChange={e => setComp(e.target.value)}>
                                    <option value="">Select</option>
                                    {
                                        comdata?.map((item, ind) => (
                                            <option key={ind} value={item.id}>{item.name}</option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">Department</div>
                            <div className="form-input">
                                <select value={dept} className="form-select" name="dept" onChange={e => handleChange(e.target.value)} >
                                    <option value="">Select</option>
                                    {
                                        depdata?.map((item, ind) => (
                                            <option key={ind} value={item.id}>{item.name}</option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb20">
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">Designation</div>
                            <div className="form-input">
                                <select value={role} className="form-select" name="role" onChange={(e) => { setRole(e.target.value) }}>
                                    <option value="">Select</option>
                                    {
                                        roledata?.map((item, ind) => (
                                            <option key={ind} value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">REPORTING MANAGER</div>
                            <div className="form-input">
                                <select value={reportingMNG} onChange={e => setReportingMNG(e.target.value)} className="form-select" name="role" >
                                    <option value="">Select Reporting Manager</option>
                                    <option value="1">Reporting Manager 1</option>
                                    <option value="2">Reporting Manager 2</option>
                                    <option value="3">Reporting Manager 3</option>
                                    <option value="4">Reporting Manager 4</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">DATE OF JOINING {joiningdate}</div>
                            <div class="form-input date date_picker">
                                <input type="text" value={joiningdate} onChange={e => setJoiningdate(e.target.value)} className="form-control" placeholder="Select joining date" />
                                <span className="input-group-addon mb00">
                                    <img src="images/calender1.png" alt="" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb20">
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">FIRST NAME</div>
                            <div className="form-input">
                                <input value={fname} type="text" onChange={e => setFname(e.target.value)} placeholder='Enter first name' className="form-control form-control1" name="role" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">MIDDLE NAME</div>
                            <div className="form-input">
                                <input value={mname} type="text" onChange={e => setMname(e.target.value)} placeholder='Enter middle name' className="form-control form-control1" name="role" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">LAST NAME</div>
                            <div className="form-input">
                                <input value={lname} type="text" onChange={e => setLname(e.target.value)} placeholder='Enter last name' className="form-control form-control1" name="role" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb20">
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">UPLOAD PROFILE PIC</div>
                            <div className="form-input">
                                <input type='file' name='img' />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">EMAIL ID</div>
                            <div className="form-input">
                                <input readOnly value={email} type="text" onChange={e => setEmail(e.target.value)} placeholder='Enter email' className="form-control form-control1" name="role" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">CONTACT NUMBER</div>
                            <div className="form-input">
                                <input value={contact} onChange={e => setContact(e.target.value)} type="text" placeholder='Enter contact number' className="form-control form-control1" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb20">

                    <div className="col-md-4">
                        <div className="form-label">User Type</div>
                        {/* <div className="active_blk">
                            <div onClick={e => handleUsertype(1)} className={user_type == 1 ? 'yes_blk active' : 'yes_blk'} >On Roll</div>
                            <div onClick={e => handleUsertype(0)} className={user_type == 0 ? 'no_blk active' : 'no_blk'}>Vendor</div>
                        </div> */}
                         <button onClick={()=>{handleUsertype(user_type)}} type="button" className={"btn btn-secondary btn-toggle " + usertypeclass} aria-pressed="true" autocomplete="off" >
                            <div className="handle"></div>
                        </button>
                    </div>
                    <div className="col-md-4">
                        <div className="form-label">Status</div>
                        {/* <div className="active_blk">
                            <div onClick={e => handleUserstatus(1)} className={status == 1 ? 'yes_blk active' : 'yes_blk'} >Active</div>
                            <div onClick={e => handleUserstatus(0)} className={status == 0 ? 'no_blk active' : 'no_blk'}>Inactive</div>
                        </div> */}
                         <button onClick={()=>{handleUserstatus(status)}} type="button" className={"btn btn-secondary btn-toggle " + statusclass} aria-pressed="true" autocomplete="off" >
                            <div className="handle"></div>
                        </button>
                    </div>


                    <div className="col-md-4">
                        <div className="form-label">gender</div>
                        <div className="active_blk">
                            <div onClick={e => handleGendertype(1)} className={gender == 1 ? 'yes_blk active' : 'yes_blk'} >Male</div>
                            <div onClick={e => handleGendertype(0)} className={gender == 0 ? 'no_blk active' : 'no_blk'}>Female</div>
                        </div>
                       
                    </div>

                </div>

                <div className="row mb20">


                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label"> <span style={{ color: color }}>{scsMsg}</span></div>
                            <div className="form-input">
                                <button onClick={hansleSubmit} className="btn_style2">Save & Exit</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditUserComp
