import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.scss"
import {faFilePen} from "@fortawesome/free-solid-svg-icons/faFilePen";
import {NavLink} from "react-router-dom";
import React from "react";

export const Sidebar = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 bg-light text-start pt-4">
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item d-inline">
                    <NavLink to="/" end className={({isActive}) =>
                        isActive ? "nav-link active" : "nav-link link-dark"
                    }>
                        <FontAwesomeIcon icon={faList}/> Requests
                    </NavLink>
                </li>
                <li className="d-inline">
                    <NavLink to="/editor" end className={({isActive}) =>
                        isActive ? "nav-link active" : "nav-link link-dark"
                    }>
                        <FontAwesomeIcon icon={faFilePen}/> Editor
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}