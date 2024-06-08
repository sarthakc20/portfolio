import React from "react";
import error from "../../../assets/error.gif";
import "./NotFound.css";
import { Link } from "react-router-dom";
// import MetaData from "../MetaData";

const NotFound = () => {
  return (
    <>
      {/* <MetaData title={`404 Not Found`} /> */}
      <div className="PageNotFound">
        <img src={error} alt="404 Not Found" />

        <p>Page Not Found </p>
        <Link to="/">Home</Link>
      </div>
    </>
  );
};

export default NotFound;
