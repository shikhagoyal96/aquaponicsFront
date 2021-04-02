import React from "react";
import Menu from "./Menu";
import "../styles.css";
//import Footer from "./footer"

const Layout = ({
    title = "",
    description,
    className,
    children
}) => (
    <div>
        <div className="jumbotron">
            <h2 className="col-md-10 mb-5">{title}</h2>
            <p className="lead">{description}</p>
            <div className="col-md-20"><Menu /></div>
        </div>
        <div className={className}>{children}</div>
        {/* <Footer/> */}
    </div>
);

export default Layout;