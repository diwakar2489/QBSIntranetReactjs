import { Route, Routes, useLocation } from "react-router-dom";
import PrivateRoutes from './Components/PrivateRoutes/PrivateRoute';
import DashboardComp from "./Components/Dashboard/DashboardComp";
import LoginComp from './Components/Login/LoginComp';
import PoliciesListComp from "./Components/Policies/PoliciesListComp";
import HeaderComp from "./Components/Common/HeaderComp";
import AddPolicyComp from "./Components/Policies/AddPolicyComp";
import FormListComp from "./forms/FormListComp";
import EditFormComp from "./forms/EditFormComp"
import AddFormComp from "./forms/AddFormComp";
import JobOpeningListComp from "./Components/Jobopening/JobOpeningListComp";
import AddJobComp from "./Components/Jobopening/AddJobComp";
import EditOpeningComp from "./Components/Jobopening/EditOpeningComp";
import CircularListComp from "./Components/Circulars/CircularListComp";
import AddCircularComp from "./Components/Circulars/AddCircularComp";
import BulletinListComp from "./Components/Bulletin/BulletinListComp";
import EditBulletinComp from "./Components/Bulletin/EditBulletinComp";
import AddBulletinComp from "./Components/Bulletin/AddBulletinComp";
import DashboardMessageListComp from "./Components/Dashboard/DashboardMessageListComp";
import AddDashboardMessageComp from "./Components/Dashboard/AddDashboardMessageComp";
import EditDashboardMessageComp from "./Components/Dashboard/EditDashboardMessageComp";
import EditcircularComp from './Components/Circulars/EditcircularComp';
import EditpolicyComp from "./Components/Policies/EditpolicyComp";
import AddUserLoginComp from './Components/Users/AddUserLoginComp';
import UserListComp from "./Components/Users/UserListComp"
import EditUserComp from "./Components/Users/EditUserComp";
import UserProfileViewComp from "./Components/Users/UserProfileViewComp";

// import "./assets/css/style.css"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginComp />} />
        <Route path="/login" element={<LoginComp />} />
        <Route path="/dashboard" element={<PrivateRoutes header_title='DASHBOARD'><DashboardComp /></PrivateRoutes>} />
        <Route path="/policies" element={<PrivateRoutes header_title='POLICY'><PoliciesListComp /></PrivateRoutes>} />
        <Route path="/addpolicy" element={<PrivateRoutes header_title='POLICY'><AddPolicyComp /></PrivateRoutes>} />
        <Route path="/editpolicy" element={<PrivateRoutes header_title='POLICY'><EditpolicyComp /></PrivateRoutes>} />

        <Route path="/forms" element={<PrivateRoutes header_title='FORMS'><FormListComp /></PrivateRoutes>} />
        <Route path="/addform" element={<PrivateRoutes header_title='FORMS'><AddFormComp /></PrivateRoutes>} />
        <Route path="/editform" element={<PrivateRoutes header_title='FORMS'><EditFormComp /></PrivateRoutes>} />
        <Route path="/openinglist" element={<PrivateRoutes header_title='OPENINGS'><JobOpeningListComp /></PrivateRoutes>} />
        <Route path="/addopening" element={<PrivateRoutes header_title='OPENINGS'><AddJobComp /></PrivateRoutes>} />
        <Route path="/editopening" element={<PrivateRoutes header_title='OPENINGS'><EditOpeningComp /></PrivateRoutes>} />
        <Route path="/circularlist" element={<PrivateRoutes header_title='CIRCULAR'><CircularListComp /></PrivateRoutes>} />
        <Route path="/addcircular" element={<PrivateRoutes header_title='CIRCULAR'><AddCircularComp /></PrivateRoutes>} />
        <Route path="/editcircular" element={<PrivateRoutes header_title='CIRCULAR'><EditcircularComp /></PrivateRoutes>} />

        <Route path="/bulletinlist" element={<PrivateRoutes header_title='BULLETIN'><BulletinListComp /></PrivateRoutes>} />
        <Route path="/addbulletin" element={<PrivateRoutes header_title='BULLETIN'><AddBulletinComp /></PrivateRoutes>} />
        <Route path="/editbulletin" element={<PrivateRoutes header_title='DASHBOARD MESSAGE'><EditBulletinComp /></PrivateRoutes>} />

        <Route path="/messagelist" element={<PrivateRoutes header_title='DASHBOARD MESSAGE'><DashboardMessageListComp /></PrivateRoutes>} />
        <Route path="/adddashboardmessage" element={<PrivateRoutes header_title='DASHBOARD MESSAGE'><AddDashboardMessageComp /></PrivateRoutes>} />
        <Route path="/editmessage" element={<PrivateRoutes header_title='DASHBOARD MESSAGE'><EditDashboardMessageComp /></PrivateRoutes>} />

        <Route path="/userlogin" element={<PrivateRoutes header_title='USER'><AddUserLoginComp /></PrivateRoutes>} />
        <Route path="/userlist" element={<PrivateRoutes header_title='USER'><UserListComp /></PrivateRoutes>} />
        <Route path="/edituser" element={<PrivateRoutes header_title='USER'><EditUserComp /></PrivateRoutes>} />

        <Route path="/userprofile" element={<PrivateRoutes header_title='USER PROFILE'><UserProfileViewComp /></PrivateRoutes>} />
      </Routes>
    </div>

  );
}

export default App;
