import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faRepeat} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.scss"
import {faFilePen} from "@fortawesome/free-solid-svg-icons/faFilePen";

export const Sidebar = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 bg-light text-start pt-4">
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="#" className="nav-link active" aria-current="page">
                        {/*<svg className="bi me-2" width="16" height="16">*/}
                        {/*    <use xlinkHref="#home"></use>*/}
                        {/*</svg>*/}
                        <FontAwesomeIcon icon={faList}/> Requests
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-dark">
                        {/*<svg className="bi me-2" width="16" height="16">*/}
                        {/*    <use xlinkHref="#speedometer2"></use>*/}
                        {/*</svg>*/}
                        <FontAwesomeIcon icon={faFilePen}/> Editor
                    </a>
                </li>
            </ul>
        </div>
    )
}