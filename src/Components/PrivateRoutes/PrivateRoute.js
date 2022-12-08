import React, { Component } from 'react'
import { Navigate } from "react-router-dom";
import SidebarComp from '../Common/SidebarComp';
import HeaderComp from '../Common/HeaderComp';

function PrivateRoute({ redirectPath = '/login', children, header_title }) {
    const itemStr = localStorage.getItem('key')
    if (!itemStr) {
        return <Navigate to={redirectPath} replace />;
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    if (now.getTime() > item.expiry * 10000) {

        localStorage.removeItem('key')
        return <Navigate to={redirectPath} replace />;
    }

    return (
        <div className="main_container">
            <SidebarComp />
            <main id="content_area">
                <div className="content">
                    <HeaderComp header_title={header_title} />
                    {children ? children : ''}
                </div>
            </main>
        </div>
    )
}

export default PrivateRoute
