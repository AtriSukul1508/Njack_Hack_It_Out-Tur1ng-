import React from "react";
import ReactDOM from 'react-dom';
import './styles/index.css';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { BlogsContextProvider } from "./context/BlogsContext";
import { UpvoteContextProvider } from "./context/UpvoteContext";
ReactDOM.render(
    <AuthContextProvider>
        <BlogsContextProvider>
            <UpvoteContextProvider>
                <BrowserRouter><App /></BrowserRouter>
            </UpvoteContextProvider>
        </BlogsContextProvider>
    </AuthContextProvider>
    , document.getElementById('root'));