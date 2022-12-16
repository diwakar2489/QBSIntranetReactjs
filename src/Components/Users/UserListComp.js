import React, { useEffect, useState, useRef } from 'react'
import ReactPaginate from "react-paginate";
import { compareAsc, format } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom';
let SERVER_URL = process.env.REACT_APP_BASE_URL;
const token = JSON.parse(localStorage.getItem('key'));

const date = new Date();
const date_formate = format(date, 'yyyy-MM-dd HH:m:SS')
const userId = localStorage.getItem('userId');

function UserListComp() {
    const pagination = useRef();
    const [perPage, setPerpage] = useState();
    const [userlist, setUserlist] = useState([]);
    const [totalitem, setTotalitem] = useState();
    const setPage = ({ selected }) => {
        getuserlist(selected + 1);
    }

    useEffect(() => {
        getuserlist()
    }, [])
    const getuserlist = async (pagenumber) => {
        let SERVER_URL = process.env.REACT_APP_BASE_URL;

        const token = JSON.parse(localStorage.getItem('key'));
        const response = await fetch(SERVER_URL + `api/users?page=${pagenumber}`,
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
                 //console.log(data.users);
                setUserlist(data.users)
                setTotalitem(data.nbPages);
                setPerpage(data.limit)
            });
    }


    return (
        <div><div className="row-bg">
            <div className="table_search_wrp">
                <Link to="/userlogin" className="btn_style2 float-end"><img src="assets/images/plus.png" /> Add User</Link>
                <div className="search_wrp">
                    <input type="text" className="form-control" placeholder="Search" />
                    <img src="assets/images/search.png" alt="" />
                </div>
            </div>
            <table className="table_style_1">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Department</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userlist?.map((item, ind) => {
                            return <tr key={ind}>
                                <td>{ind + 1}</td>
                                <td>{item.email}</td>
                                <td>{item.name}</td>
                                <td>{item.company}</td>
                                <td>{item.dept_name}</td>
                                <td>{item.role_name}</td>
                                <td>
                                    {item.status ? <div className="active_btn">
                                        <i className="fa fa-dot-circle-o text-success"></i> Active
                                    </div> : <div className="active_btn"><i className="fa fa-dot-circle-o text-danger"></i> Inactive</div>}



                                </td>
                                <td>
                                    <Link to={'/edituser?id=' + item.id} className="btn-style1">
                                        <i className="fa fa-edit mr03"></i> Edit
                                    </Link>
                                </td>
                            </tr>
                        }
                        )
                    }
                </tbody>
                <tfoot>
                    <tr><td colSpan="8" >
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
                    </td></tr>
                </tfoot>
            </table>


        </div>

        </div>
    )
}

export default UserListComp
