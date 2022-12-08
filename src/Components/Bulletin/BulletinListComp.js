import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";
let SERVER_URL = process.env.REACT_APP_BASE_URL;
function BulletinListComp() {
    const pagination = useRef();
    const [perPage, setPerpage] = useState();
    const [compmsg, setCompmsg] = useState([]);
    const [totalitem, setTotalitem] = useState();
    const setPage = ({ selected }) => {
        getbulletinlist(selected + 1);
    }
    useEffect(() => {
        getbulletinlist()
    }, [])
    const getbulletinlist = async (pagenumber) => {
        let SERVER_URL = process.env.REACT_APP_BASE_URL;

        const token = JSON.parse(localStorage.getItem('key'));
        const response = await fetch(SERVER_URL + `api/bulletin?page=${pagenumber}`,
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
               // console.log(data.result);
                setCompmsg(data.result)
                setTotalitem(data.TotalRecords[0].Total);
                setPerpage(data.limit)
            });


    }
    return (
        <div className="row-bg">
            <div className="table_search_wrp">
                <Link to="/addbulletin" className="btn_style2 float-end"><img src="assets/images/plus.png" /> Add Bulletin</Link>
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
                        <th>Bulletin</th>
                        <th>Details</th>
                        <th>status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        compmsg?.map((item, ind) => {
                            return <tr key={ind}>
                                <td>{ind + 1}</td>
                                <td>{item.company}</td>
                                <td>{item.title}</td>
                                <td>{item.message}</td>
                                <td>
                                {item.status ? <div className="active_btn">
                                    <i className="fa fa-dot-circle-o text-success"></i> Active
                                </div> : <div className="active_btn"><i className="fa fa-dot-circle-o text-danger"></i> Inactive</div>}
                                    
                                    </td>
                                <td><Link to={'/editbulletin?id='+item.id}>Edit</Link></td>
                            </tr>
                        }

                        )
                    }                    
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

export default BulletinListComp
