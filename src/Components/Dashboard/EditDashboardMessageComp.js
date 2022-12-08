import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { compareAsc, format } from 'date-fns'
import { useLocation } from 'react-router-dom';
const token = JSON.parse(localStorage.getItem('key'));
let SERVER_URL = process.env.REACT_APP_BASE_URL;
function EditDashboardMessageComp() {
    let navigate = useNavigate()
    const location = useLocation()

    const search = new URLSearchParams(location.search)
    const id = search.get("id")

    const [comdata, setComdata] = useState([]);
    const [status, setStatus] = useState('1');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [comp, setComp] = useState('');
    const [image, setImage] = useState()
    const [scsMsg, setScsMsg] = useState();
    const [color, setColor] = useState();
    const date = new Date();
    const date_formate = format(date, 'yyyy-MM-dd HH:m:SS')
    const userId = localStorage.getItem('userId');


    const handlefile = async (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result.toString());
        }
        reader.readAsDataURL(file);
    }
    useEffect((e) => {
        getCompanyList()
        getMessageItem()
    }, []);
    const getMessageItem = () => {
        const response = fetch(SERVER_URL + `api/edit_messages`,
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
               // console.log('=====' + data.result)
                setTitle(data.result.title)
                setMessage(data.result.message)
                setComp(data.result.comp_id);
                setStatus(data.result.status);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('profiles', image);
        formdata.append('compId', comp);
        formdata.append('title', title);
        formdata.append('message', message);
        formdata.append('updated_on', date_formate);
        formdata.append('updated_by', userId);
        formdata.append('status', status);
        formdata.append('id', id);

        const response = fetch(SERVER_URL + `api/update_messages`,
            {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'authorization': `bearer ${token.value}`
                },
                body: formdata,
            }).then(res => res.json())
            .then(data => {
                if (data.status == true) {
                    setScsMsg(data.msg);
                    setColor('green')
                    setTimeout(() => {
                        return navigate("/messagelist")
                    }, 2000);
                } else {
                    setScsMsg(data.msg);
                    setColor('red');
                }
            })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="row-bg">
                <h3 className="mt05">Edit Dashboard Message </h3>
                <div className="form_style_1">
                    <div className="row mb30">
                        <div className="col-md-4">
                            <div className="form-blk">
                                <div className="form-label">Company Name - {id}</div>
                                <div className="form-input">
                                    <select className="form-select" onChange={e => setComp(e.target.value)}>
                                        <option value="">Select</option>
                                        {
                                            comdata?.map(function (item, ind) {

                                                var selected = (comp === item.id) ? ' selected' : ''
                                                return <option key={ind} value={item.id} selected  >{item.name}</option>;
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-blk">
                                <div className="form-label">Title</div>
                                <div className="form-input">
                                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter Message" className="form-control" />
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
                                    <textarea value={message ? message : ''} onChange={e => setMessage(e.target.value)} className="form-control" cols="5" rows="2" name="detail" placeholder="Enter Details">

                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-blk">
                                <div className="form-label">Is Active</div>

                                Active:
                                <input type="radio" name="status" checked={status == 1 ? 'checked' : ''} onChange={(e) => setStatus(e.target.value)} value="1" />
                                <br />
                                Inactive:
                                <input type="radio" name="status" checked={status == 0 ? 'checked' : ''} onChange={(e) => setStatus(e.target.value)} value="0" />


                            </div>
                        </div>

                    </div>


                    <div className="row mt-5">
                        <span style={{ color: 'green' }}>{scsMsg}</span>
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

export default EditDashboardMessageComp
