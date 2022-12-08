import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { compareAsc, format } from 'date-fns'
import { json } from 'react-router-dom';
const token = JSON.parse(localStorage.getItem('key'));
let SERVER_URL = process.env.REACT_APP_BASE_URL;

function AddDashboardMessageComp() {
    let navigate = useNavigate()
    const [comdata, setComdata] = useState([]);
    const [status, setStatus] = useState('1');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [comp, setComp] = useState('');
    const [image, setImage] = useState('')
    const[scsMsg,setScsMsg] = useState();
    const [color,setColor] = useState();

    const date = new Date();
    const date_formate = format(date, 'yyyy-MM-dd HH:m:SS')
    const userId = localStorage.getItem('userId');
    const handleSubmit = async (e) => {
        e.preventDefault();     
        const formdata = new FormData();
        formdata.append('profiles', image);
        formdata.append('compId', comp);
        formdata.append('title', title);
        formdata.append('message', message);
        formdata.append('date_formate', date_formate);
        formdata.append('userId', userId);
        formdata.append('status', status);


          const response = fetch(SERVER_URL + `api/add_messages`,
          {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'authorization': `bearer ${token.value}`
              },
              body: formdata,
          }).then(res => res.json())
          .then(data => {
            if(data.status==true)
            {
                setScsMsg(data.msg);
                setColor('green')
                setTimeout(() => {
                    return navigate("/messagelist")
                }, 2000);
            }else{
                setScsMsg(data.msg);
                setColor('red');
            }
          })
    }
    useEffect(() => {
        getCompanyList();
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

    const handlefile = async  (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onloadend = () =>{
            setImage(reader.result.toString());
        }
        reader.readAsDataURL(file);       
    }
   
    return (
        <form onSubmit={handleSubmit}>
            <div className="row-bg">
                <h3 className="mt05">Add Dashboard Message </h3>
                <div className="form_style_1">
                    <div className="row mb30">
                        <div className="col-md-4">
                            <div className="form-blk">
                                <div className="form-label">Company Name</div>
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
                                <div className="form-label">Title</div>
                                <div className="form-input">
                                    <input type="text" onChange={e => setTitle(e.target.value)} placeholder="Enter Message" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-blk">
                                <div className="form-label">Photo</div>
                                <div className="form-input">
                                    <input type="file" name="files" onChange={handlefile} id="files" className="file" />
                                    <div className="d-flex">
                                        <input type="text" placeholder="No Files Chosen" name="file-name" id="file-name" className="file-name" readOnly />
                                        <input type="button" className="upload_btn" value="Choose File" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb30">

                        <div className="col-md-8">
                            <div className="form-blk">
                                <div className="form-label">Message</div>
                                <div className="form-input">
                                    <textarea onChange={e => setMessage(e.target.value)} className="form-control" cols="5" rows="2" name="detail" placeholder="Enter Details">
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-blk">
                                <div className="form-label">Is Active</div>

                                Active:
                                <input type="radio" name="status" checked onChange={(e) => setStatus(e.target.value)} value="1" />
                                <br />
                                Inactive:
                                <input type="radio" name="status" onChange={(e) => setStatus(e.target.value)} value="0" />


                            </div>
                        </div>

                    </div>


                    <div className="row mt-5">
                        <span style={{color:color}}>{scsMsg}</span>
                        <div className="col-md-12">

                            <a href="dashboardmessage.html" className="btn_style_bor_1 mr07">Cancel</a>
                            <button className="btn_style2 mr07">Save & New</button>
                             <button className="btn_style2" type="submit">Save & Exit</button>
                        </div>
                    </div>

                </div>
                
            </div>
        </form>

    )
}

export default AddDashboardMessageComp
