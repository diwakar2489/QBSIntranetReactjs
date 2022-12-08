import React, { useEffect, useState } from 'react'
// import { useLocation,useNavigate } from 'react-router-dom';
import { useSearchParams,useNavigate } from 'react-router-dom';
import { compareAsc, format } from 'date-fns'
let SERVER_URL = process.env.REACT_APP_BASE_URL;
const token = JSON.parse(localStorage.getItem('key'));

const date = new Date();
const date_formate = format(date, 'yyyy-MM-dd HH:m:SS')
const userId = localStorage.getItem('userId');

function EditpolicyComp() {
    const [params,setParams] = useSearchParams()
     const navigate = useNavigate();
    // const location = useLocation();
    // const search = new URLSearchParams(location.search);
    const id = params.get('id');
    const [comp, setComp] = useState();
    const [comdata, setComdata] = useState([]);
    const [title, setTitle] = useState();
    const [detail, setDetail] = useState();
    const [status, setStatus] = useState(1);

    const [image, setImage] = useState('')
    const [scsMsg, setScsMsg] = useState();
    const [color, setColor] = useState();

    const date = new Date();
    const date_formate = format(date, 'yyyy-MM-dd HH:m:SS')
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        getCompanyList()
        getPolicyItem()
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

    const handleSubmit = (e) => {
        e.preventDefault()
        const formdata = new FormData();
        formdata.append('attachment', image);
        formdata.append('compId', comp);
        formdata.append('title', title);
        formdata.append('message', detail);
        formdata.append('updated_on', date_formate);
        formdata.append('updated_by', userId);
        formdata.append('status', status);
        formdata.append('id', id);

        const response =  fetch(SERVER_URL + `api/update_policy`,
        {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/json',
                'authorization': `bearer ${token.value}`
            },
            body: formdata,
        }).then(res => res.json())
        .then(data => {
            if (data.status == true) {
                setScsMsg(data.msg);
                setColor('green')
                setTimeout(() => {
                    return navigate("/policies")
                }, 2000);
            } else {
                setScsMsg(data.msg);
                setColor('red');
            }
        })


    }
    const handlefile = async (e) => {
        const file = e.target.files[0]
        setImage(file)
    }
    const getPolicyItem = () => {
        const response = fetch(SERVER_URL + `api/edit_policy`,
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
                // console.log(data.result+'============');
                setTitle(data.result.title)
                setDetail(data.result.message)
                setComp(data.result.comp_id);
                setStatus(data.result.status);
            });
    }

    return (
        <form onSubmit={handleSubmit} >
            <div className="row-bg">
                <h3 className="mt05">Edit Policy</h3>
                <div className="form_style_1">
                    <div className="row mb30">
                        <div className="col-md-4">
                            <div className="form-blk">
                                <div className="form-label">Company</div>
                                <div className="form-input">
                                    <select className="form-select" value={comp} onChange={e => setComp(e.target.value)}>
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
                                <div className="form-label">Policy Name</div>
                                <div className="form-input">
                                    <input value={title?title:''} onChange={e => setTitle(e.target.value)} type="text" placeholder="" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-blk">
                                <div className="form-label">Attachments</div>
                                <div className="form-input">
                                    <input type="file" onChange={handlefile} name="file" id="file" className="file" />
                                    <div className="d-flex">
                                        <input type="text" placeholder="No Files Chosen" name="file-name" id="file-name" className="file-name"  />
                                        <input type="button" className="upload_btn" value="Choose File" />
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row mb30">
                        <div className="col-md-12">
                            <div className="form-blk">
                                <div className="form-label">Policy Details</div>
                                <div className="form-input">
                                    <textarea value={detail?detail:''} onChange={e => setDetail(e.target.value)} className="form-control" cols="" rows="4"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row mb30">
                        <div className="col-md-4">
                            <div className="form-blk">
                                <div className="form-label">Is Active</div>
                                Active:
                                <input type="radio" onChange={e => setStatus(e.target.value)} name="radiobtn" className="active_check" checked={status == 1} value="1" />
                                Inactive:
                                <input type="radio" onChange={e => setStatus(e.target.value)} name="radiobtn" className="active_check" checked={status == 0} value="0" />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <span style={{ color: color }}>{scsMsg}</span>
                        <div className="col-md-12">
                            <a href="policy.html" className="btn_style_bor_1 mr07">Cancel</a>
                            <button className="btn_style2 mr07">Save & New</button>
                            <button className="btn_style2">Save & Exit</button>
                        </div>
                    </div>

                </div>

            </div>
        </form>
    )
}

export default EditpolicyComp
