import React from 'react';
import './App.css';
import AppRoutes from "./features/Routes/AppRoutes";
import {NavLink} from "react-router-dom";


const App = () => {
    return (
        <div className="App">
            <NavLink style={{marginRight: '20px'}} to={'/login'}>LoginPage</NavLink>
            <NavLink style={{marginRight: '20px'}} to={'/registration'}>registration</NavLink>
            <NavLink style={{marginRight: '20px'}} to={'/profile'}>profile</NavLink>
            <NavLink style={{marginRight: '20px'}} to={'/errorPage'}>Error</NavLink>
            <NavLink style={{marginRight: '20px'}} to={'/passRecovery'}>passRecovery</NavLink>
            <NavLink style={{marginRight: '20px'}} to={'/createNewPassword'}>create new pass</NavLink>
            <NavLink style={{marginRight: '20px'}} to={'/componentTest'}>componentTest</NavLink>
            <AppRoutes/>
        </div>
    );
}

export default App;
