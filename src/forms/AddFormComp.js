import React, { useState, useEffect } from 'react'
import { compareAsc, format } from 'date-fns'
import { useNavigate } from 'react-router-dom';

let SERVER_URL = process.env.REACT_APP_BASE_URL;
const token = JSON.parse(localStorage.getItem('key'));

const date = new Date();
const date_formate = format(date, 'yyyy-MM-dd HH:m:SS')
const userId = localStorage.getItem('userId');

function AddFormComp() {    
    const navigate = useNavigate()
    const [comdata, setComdata] = useState([]);
    const [comp, setComp] = useState();
    const [status, setStatus] = useState(1);
    const [title, setTitle] = useState();
    const [detail, setDetail] = useState();

    const [image, setImage] = useState('')
    const [scsMsg, setScsMsg] = useState();
      const [color, setColor] = useState();
   

    useEffect(() => {
        getCompanyList()
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
    const handlefile = async (e) => {
        const file = e.target.files[0]       
        setImage(file)       
      }
    const handleSubmit = (e) =>{
        e.preventDefault()
        alert(comp)

        const formdata = new FormData()
        formdata.append('attachment', image);
        formdata.append('compId', comp);
        formdata.append('title', title);
        formdata.append('message', detail);
        formdata.append('created_on', date_formate);
        formdata.append('created_by', userId);
        formdata.append('status', status);

        const response = fetch(SERVER_URL + `api/add_forms`,
        {
          method: 'POST',
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
              return navigate("/forms")
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
            <h3 className="mt05">Add New Form</h3>
            <div className="form_style_1">
                <div className="row mb30">
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
                            <div className="form-label">Title</div>
                            <div className="form-input">
                                <input onChange={e=>setTitle(e.target.value)} type="text" placeholder="" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">Attachments</div>
                            <div className="form-input">
                                <input type="file" name="file" onChange={handlefile} id="file" className="file" />
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
                            <div className="form-label">Details</div>
                            <div className="form-input">
                                <textarea onChange={e=>setDetail(e.target.value)} className="form-control" cols="" rows="4"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-blk">
                            <div className="form-label">Is Active</div>                          
                            Active:  
                    <input checked={status==1} onChange={e=>setStatus(e.target.value)} type="radio" name="radiobtn"  value="1" />
                                    
                    Inactive:
                    <input checked={status==0} onChange={e=>setStatus(e.target.value)} type="radio" name="radiobtn"  value="0" />
                                    
                           
                        </div>
                    </div>
                </div>
               
                <div className="row mt-5">
                <span style={{ color: color }}>{scsMsg}</span>
                    <div className="col-md-12">
                        <a href="forms.html" className="btn_style_bor_1 mr07">Cancel</a>
                        <button className="btn_style2 mr07">Save & New</button>
                        <button className="btn_style2">Save & Exit</button>
                    </div>
                </div>
            </div>
        </div>
        </form>
    )
}

export default AddFormComp
