import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { compareAsc, format } from 'date-fns'
let SERVER_URL = process.env.REACT_APP_BASE_URL;
const token = JSON.parse(localStorage.getItem('key'));
function AddUserLoginComp() {
    let navigate = useNavigate()
    const [comdata, setComdata] = useState([]);
    const [depdata, setDepdata] = useState([]);
    const [dept, setDept] = useState('')
    const [roledata, setRoledata] = useState([]);
    const [role, setRole] = useState('')
    const [comp, setComp] = useState('');
    const [scsMsg, setScsMsg] = useState();
    const [color, setColor] = useState();

    const[empcode,setEmpcode] = useState('')
    const[reportingMNG,setReportingMNG] = useState('')
    const[joiningdate,setJoiningdate] = useState('')
    const[fname,setFname] = useState('')
    const[mname,setMname] = useState('')
    const[lname,setLname] = useState('')
    const[email,setEmail] = useState('')
    const[contact,setContact] = useState('')
    const[gender,setGender] = useState(1)
    const[status,setStatus] = useState(1)
    const [user_type, setUser_type] = useState(1)
    

    useEffect(() => {
        getCompanyList()
        getDepartmentList()
    }, [])
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
                //console.log(data)
                setRoledata(data.result)
            });


    }
    const hansleSubmit = ()=>{
       
        const date = new Date();
        const date_formate = format(date, 'yyyy-MM-dd HH:m:SS')
        const userId = localStorage.getItem('userId');
        // alert(date_formate)
        const response = fetch(SERVER_URL + `api/user_register`,
        {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': `bearer ${token.value}`
            },
            body: JSON.stringify({
                empcode: empcode,
                comp:comp,
                dept:dept,
                role:role,
                reportingMNG:reportingMNG,
                joiningdate:joiningdate,
                fname:fname,
                mname:mname,
                lname:lname,
                email:email,
                status:status,
                usertype: user_type,
                gender:gender,
                contact:contact,
                created_on: date_formate,
                created_by: userId
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
    const handleUsertype = (arg) => {
        setUser_type(arg)
//alert(usertype)
    }
    return (
        <div className="row-bg">
            <h3 className="mt05">Add New User</h3>
            <div className="form_style_1 profile_wrapper">
                <div className="row mb20">
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">Employee Code</div>
                            <div className="form-input">
                                <input type="text" onChange={e=>setEmpcode(e.target.value)}  placeholder="Enter Employee Code" className="form-control form-control1" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">Company</div>
                            <div className="form-input">
                                <select className="form-select" onChange={e => setComp(e.target.value)}>
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
                                <select className="form-select" name="role" onChange={(e) => { setRole(e.target.value) }}>
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
                                <select onChange={e=>setReportingMNG(e.target.value)} className="form-select" name="role" >
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
                            <div className="form-label">DATE OF JOINING</div>
                            <div className="form-input">
                                <input type="date" onChange={e=>setJoiningdate(e.target.value)} className="form-control form-control1" name="role" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb20">
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">FIRST NAME</div>
                            <div className="form-input">
                                <input type="text" onChange={e=>setFname(e.target.value)} placeholder='Enter first name' className="form-control form-control1" name="role" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">MIDDLE NAME</div>
                            <div className="form-input">
                                <input type="text" onChange={e=>setMname(e.target.value)} placeholder='Enter middle name' className="form-control form-control1" name="role" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">LAST NAME</div>
                            <div className="form-input">
                                <input type="text" onChange={e=>setLname(e.target.value)} placeholder='Enter last name' className="form-control form-control1" name="role" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb20">
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">EMAIL ID</div>
                            <div className="form-input">
                                <input type="text" onChange={e=>setEmail(e.target.value)} placeholder='Enter email' className="form-control form-control1" name="role" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">CONTACT NUMBER</div>
                            <div className="form-input">
                                <input onChange={e=>setContact(e.target.value)} type="text" placeholder='Enter contact number' className="form-control form-control1"  />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">GENDER </div>
                            <div className="form-input">
                                Male: <input onChange={e=>setGender(e.target.value)} checked={gender==1} type='radio' value='1' name='gender' />
                                Female: <input type='radio' onChange={e=>setGender(e.target.value)} checked={gender==0} value='0' name='gender' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb20">
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">EMPLOYEE STATUS</div>
                            <div className="form-input">
                                Active: <input onChange={e=>setStatus(e.target.value)} checked={status==1} type='radio' value='1' name='status' />
                                Inactive: <input onChange={e=>setStatus(e.target.value)} checked={status==0} type='radio' value='0' name='status' />
                            </div>
                        </div>
                    </div>
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
                            <div className="form-label"> <span style={{ color: color }}>{scsMsg}</span></div>
                            <div className="form-input">
                                <button onClick={hansleSubmit} class="btn_style2">Save & Exit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb20">
                    <div className="col-md-4">
                        <div className="active_blk">
                            <div onClick={e => handleUsertype(1)} className={user_type == 1 ? 'yes_blk active' : 'yes_blk'} >On Roll</div>
                            <div onClick={e => handleUsertype(0)} className={user_type == 0 ? 'no_blk active' : 'no_blk'}>Vendor</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AddUserLoginComp

