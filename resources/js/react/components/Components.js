import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getAuthUser} from "../api_modules/auth/auth";
import {setAuth} from "../redux/reducers/auth/authSlice";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

/**
 * components
 */
import Login from "./auth/login/Login";
import Home from "./layouts/home/Home";
import Posts from "./media/posts/Posts";
import Songs from "./media/songs/Songs";
import Videos from "./media/videos/Videos";
import Photos from "./media/photos/Photos";
import Header from "./layouts/header/Header";
import Footer from "./layouts/footer/Footer";
import Register from "./auth/register/Register";
import AllUsers from "./user/all_users/AllUsers";
import NewUsers from "./user/new_users/NewUsers";
import ProfileUser from "./user/profile_user/ProfileUser";
import DefaultUser from "./user/default_user/DefaultUser";


const options = {
    position: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
};

function Components() {
    const dispatch = useDispatch();

    useEffect(() => {
        getAuthUser().then(response => {
            dispatch(setAuth(response.user))
        })
    }, []);

    return (
        <AlertProvider template={AlertTemplate} {...options}>
            <BrowserRouter>
                <Header/>
                <Route exact path='/'>
                    <Home/>
                </Route>
                <Route path='/posts'>
                    <Posts/>
                </Route>
                <Route path='/photos'>
                    <Photos/>
                </Route>
                <Route path='/videos'>
                    <Videos/>
                </Route>
                <Route path='/music'>
                    <Songs/>
                </Route>
                <Route path='/login'>
                    <Login/>
                </Route>
                <Route path='/register'>
                    <Register/>
                </Route>
                <Route path='/profile'>
                    <ProfileUser/>
                </Route>
                <Switch>
                    <Route exact path='/users'>
                        <AllUsers/>
                    </Route>
                    <Route exact path='/users/newest'>
                        <NewUsers/>
                    </Route>
                    <Route path='/users/:id'>
                        <DefaultUser/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </AlertProvider>
    );
}

export default Components;
