import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import isAuthenticated from "./Auth";

interface Props {
}

interface States {
}

export default class Routers extends React.Component<Props, States> {
    render(): any {
        return <Routes>
            <Route path={"/"} element={isAuthenticated() ? <Home/> : <Navigate to={"/login"}/>}/>
            <Route path={"/login"} element={isAuthenticated() ? <Navigate to={"/"}/> : <Login/>}/>
        </Routes>
    }
}
