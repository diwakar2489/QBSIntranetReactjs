import React, { useEffect, useState,useRef } from 'react'
import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";
function JobOpeningListComp() {
    const pagination = useRef();
    const[perPage,setPerpage] = useState(10);
    const[totalitem,setTotalitem] = useState(91);
    const setPage = ({ selected }) =>{
        listopening(selected+1);
    }
  
    let SERVER_URL = process.env.REACT_APP_BASE_URL;
    const [listdata, setListdata] = useState([]);
    const listopening = async (pagenumber) => {
        const token = JSON.parse(localStorage.getItem('key'));
        const response = await fetch(SERVER_URL + `api/opening?page=${pagenumber}`,
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
                setTotalitem(data.TotalRecords[0].Total);
                setListdata(data.opening)
            });

    }
    useEffect(() => {
        listopening(1);
    }, []);
    return (
        <div className="row-bg">
            <div className="table_search_wrp">
                <Link to="/addopening" className="btn_style2 float-end"><img src="assets/images/plus.png" alt='desc' /> Add Opening</Link>
                <div className="search_wrp">
                    <input type="text" className="form-control" placeholder="Search" />
                    <img src="assets/images/search.png" alt="" />
                </div>
            </div>
            <table className="table_style_1">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Company Name</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Opening</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>



                    {listdata?.map((item, ind) => (
                        <tr key={item.id}>
                            <td>{ind + 1}</td>
                            <td>{item.CompName}</td>
                            <td>{item.DeptName}</td>
                            <td>{item.RoleName}</td>
                            <td>{item.opening_limit+'- '+item.openingName+' - Exp ('+ item.experience+' Years)'}</td>
                           <td>
                                {item.status ? <div className="active_btn">
                                    <i className="fa fa-dot-circle-o text-success"></i> Active
                                </div> : <div className="active_btn"><i className="fa fa-dot-circle-o text-danger"></i> Inactive</div>}

                            </td>
                            <td className="text-end">
                            <button class="btn-style1">
										<i class="fa fa-edit mr03"></i> Edit
									</button>
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

export default JobOpeningListComp
