import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { compareAsc, format } from 'date-fns'
const token = JSON.parse(localStorage.getItem('key'));
function AddJobComp() {
    let navigate = useNavigate()
    let SERVER_URL = process.env.REACT_APP_BASE_URL;
    const [comp, setComp] = useState('');
    const [dept, setDept] = useState('');
    const [role, setRole] = useState('');
    const [opening, setOpening] = useState('');
    const [name, setName] = useState('');
    const [exp, setExp] = useState('');
    const [status, setStatus] = useState('1');
    const [detail, setDetail] = useState('');
    const [color, setColor] = useState('');
    const [msg, setMsg] = useState('');
    const [comdata, setComdata] = useState([]);
    const [depdata, setDepdata] = useState([]);
    const [roledata, setRoledata] = useState([]);


    const addopening = (e) => {
        e.preventDefault();
        const date = new Date();
        const date_formate = format(date, 'yyyy-MM-dd HH:m:SS')


        const response = fetch(SERVER_URL + `api/add_opening`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token.value}`
                },
                body: JSON.stringify({
                    comp_id: comp,
                    dept_id: dept,
                    role_id: role,
                    opening_limit: opening,
                    experience: exp,
                    name: name,
                    description: detail,
                    created_on: date_formate,
                    created_by: 1,
                    status: status


                }),
            }).then(res => res.json())
            .then(data => {
                if (data.data != '') {
                    setColor('green')
                    setMsg('Opening! Add successfully')
                    setTimeout(() => {
                        return navigate("/openinglist")
                    }, 2000);

                } else {
                    setColor('red')
                    setMsg('Error! Something went wrong')
                }
            });



    }
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
  function handleChange (deptid) {
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
   // alert(dept);
    return (
        <div className="row-bg">
            <h3 className="mt05">Add New Opening</h3>
            <div className="form_style_1">
                <div className="row mb30">
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">Company Name </div>
                            <div className="form-input">
                                <select className="form-select" name='comp' onChange={(e) => { setComp(e.target.value) }}>
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
                                <select value={dept} className="form-select" name="dept" onChange={e => handleChange(e.target.value)}>
                                    <option value="">Select</option>
                                    {
                                        depdata?.map((item, ind) => (
                                            <option key={ind} value={item.id}>{item.name}</option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">Designation</div>
                            <div className="form-input">
                                <select className="form-select" name="role" onChange={(e) => { setRole(e.target.value) }}>
                                    <option value="">Select</option>
                                    {
                                        roledata?.map((item,ind)=>(
                                            <option key={ind} value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="row mb30">


                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">Opening Name</div>
                            <div className="form-input">
                                <input type="text" placeholder="Enter Opening Name" className="form-control" name="name" onChange={(e) => { setName(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">No of Positions</div>
                            <div className="form-input">
                                <select className="form-select" name="opening" onChange={(e) => { setOpening(e.target.value) }}>
                                    <option value="">Select</option>
                                    <option value="1">1 Positions</option>
                                    <option value="2">2 Positions</option>
                                    <option value="3">3 Positions</option>
                                    <option value="4">4 Positions</option>
                                    <option value="5">5 Positions</option>
                                    <option value="6">6 Positions</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">Experience</div>
                            <div className="form-input">
                                <input type="text" placeholder="Enter Experience" className="form-control" name="exp" onChange={(e) => { setExp(e.target.value) }} />
                            </div>
                        </div>
                    </div>


                </div>


                <div className="row mb30">
                    <div className="col-md-8">
                        <div className="form-blk">
                            <div className="form-label">Details</div>
                            <div className="form-input">
                                <textarea className="form-control" cols="5" rows="2" name='detail' onChange={(e) => { setDetail(e.target.value) }} placeholder="Enter Details"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">Is Active</div>
                            <div className="active_blk mb10">
                                <label className="btn btn-default activecheck active">
                                    <input type="radio" name="status" onChange={(e) => setStatus(e.target.value)} className="active_check" id="active1" value="1" />
                                    Active
                                </label>
                                <label className="btn btn-default inactivecheck">
                                    <input type="radio" name="status" onChange={(e) => setStatus(e.target.value)} className="active_check" id="inactive" value="0" />
                                    Inactive
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-6">
                        <Link to='' className="btn_style_bor_1 mr07">Cancel</Link>
                        <button className="btn_style2 mr07">Save & New</button>
                        <button onClick={addopening} className="btn_style2">Save & Exit</button>
                    </div>
                    <div className="col-md-6">
                        <span style={{ color: color }}>{msg}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddJobComp
