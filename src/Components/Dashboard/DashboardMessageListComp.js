import React, { useEffect, useState, useRef } from 'react'

import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";
let SERVER_URL = process.env.REACT_APP_BASE_URL;
function DashboardMessageListComp() {
    const pagination = useRef();
    const [perPage, setPerpage] = useState();
    const [compmsg, setCompmsg] = useState([]);
    const [totalitem, setTotalitem] = useState();
    //const [photo,setPhoto] = useState('');
    const setPage = ({ selected }) => {
        getmessagelist(selected + 1);
    }

    useEffect(() => {
        getmessagelist(1)
    }, []);
    const getmessagelist = async (pagenumber) => {
        let SERVER_URL = process.env.REACT_APP_BASE_URL;

        const token = JSON.parse(localStorage.getItem('key'));
        const response = await fetch(SERVER_URL + `api/messages?page=${pagenumber}`,
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
                // setTotalitem(data.TotalRecords[0].Total);
                console.log(data.result);
                setCompmsg(data.result)
                setTotalitem(data.TotalRecords[0].Total);
                setPerpage(data.limit)
            });


    }
    function readAndPreview(file) {
        // Make sure `file.name` matches our extensions criteria
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
          const reader = new FileReader();
    
          reader.addEventListener("load", () => {
            const image = new Image();
            image.height = 100;
            image.title = file.name;
            image.src = this.result;
            return file;
          }, false);
    
         return file;
        }
      }
      const xyz=(e)=>{
        //var reader = new FileReader(resul);
        console.log('Base64 image data converted to file: stack-abuse-logo-out.png'+e.target);
      }
    return (
        <div className="row-bg">
            <div className="table_search_wrp">
                <Link to="/adddashboardmessage" className="btn_style2 float-end"><img src="assets/images/plus.png" /> Add Dashboard Message</Link>
                <div className="search_wrp">
                    <input type="text" className="form-control" placeholder="Search" />
                    <img src="assets/images/search.png" alt="" />
                </div>
            </div>
            <table className="table_style_1">
                <thead>
                    <tr>
                        <th>S.No</th>
                       
                        <th>Company</th>
                        <th>Title</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>



                    {compmsg?.map((item, ind) => (
                        
                        <tr key={item.id}>
                            <td>{ind + 1}</td>                            
                            <td>{item.CompName}</td>
                            <td>{item.title}</td>
                            <td>{item.message}</td>
                            <td>
                                {item.status ? <div className="active_btn">
                                    <i className="fa fa-dot-circle-o text-success"></i> Active
                                </div> : <div className="active_btn"><i className="fa fa-dot-circle-o text-danger"></i> Inactive</div>}

                            </td>
                            <td className="text-end">
                                <Link to={`/editmessage?id=${item.id}`} className="btn-style1">
                                    <i className="fa fa-edit mr03"></i> Edit
                                </Link>
                            </td>
                        </tr>
                    ))}

                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="8" >
                            <h1 onClick={e => pagination.current.setState({ selected: 10 - 1 })} ></h1>
                            <ReactPaginate
                                ref={pagination}
                                pageCount={Math.ceil(totalitem / perPage)}
                                pageRangeDisplayed={4}
                                marginPagesDisplayed={1}
                                onPageChange={setPage}
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
                        </td>
                    </tr>
                </tfoot>
            </table>


        </div>
    )
}

export default DashboardMessageListComp
