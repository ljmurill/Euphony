import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../HomePage/SearchBar";
import Navigation from "../Navigation";

function NotFound(){


    return(
        <div>

            <div className="notFound">
                <Navigation/>
                <div className="Image404">
                    <h1>Sorry Page Not Found</h1>
                    <img src="https://p.favim.com/orig/2018/10/31/illustration-cd-vintage-Favim.com-6519895.gif"/>
                    <Link to='/' className="link404"> Go Back to Home</Link>
                </div>

            </div>
        </div>
    );
};

export default NotFound;
