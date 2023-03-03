import {Route, Routes} from "react-router-dom";
import Login from "../Login/Login";
import React from "react";
import Registration from "../Registration/Registration";
import Profile from "../Profile/Profile";
import ErrorPage from "../ErrorPage/ErrorPage";
import PassRecovery from "../PassRecovery/PassRecovery";
import CreateNewPassword from "../CreateNewPassword/CreateNewPassword";
import ComponentTest from "../ComponentTest/ComponentTest";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<div>Start page </div>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/registration' element={<Registration/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/errorPage' element={<ErrorPage/>}/>
            <Route path='/passRecovery' element={<PassRecovery/>}/>
            <Route path='/createNewPassword' element={<CreateNewPassword/>}/>
            <Route path='/componentTest' element={<ComponentTest/>}/>
        </Routes>
    );
};

export default AppRoutes;