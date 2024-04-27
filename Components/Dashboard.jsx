import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faPerson, faPersonChalkboard } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {

    return (
        <div>

            <div className='row'>
                <div className='col-sm-2 col-12 p-0 text-center'>
                    <div className='dashboardColor maxHeightm'>
                        <div className='mx-2 fs-4'>
                            <FontAwesomeIcon icon={faChartPie} /> &nbsp;
                            Dashboard
                            </div>
                        <hr />
                        <ul className="nav flex-column mt-2">
                            <li className="nav-item">
                                <Link className="nav-link link-dark" aria-current="page" to={"/"} >
                                    <FontAwesomeIcon icon={faPerson} className='text-white' /> &nbsp;
                                    <span className='text-white'>Students</span>  
                                    </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link link-dark" to={"/mentors"} >
                                <FontAwesomeIcon icon={faPersonChalkboard} className='text-white' /> &nbsp;
                                    <span className='text-white'>Mentors</span>
                                    </Link>
                            </li>
                        </ul>
                    </div>
                    
                </div>
                <div className='col-sm-10 col-12 backgroundColor'>
                        <Outlet />
                    </div>
            </div>
        </div>
    )
}

export default Dashboard;