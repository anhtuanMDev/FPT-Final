// Style
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/js/main.js'

// SVG
import logo from '../assets/img/images/logo.svg';
import menu from '../assets/img/icons/menu.svg';
import search from '../assets/img/icons/search.svg';
import notify from '../assets/img/icons/notify.svg';
import chat_box from '../assets/img/icons/chat_box.svg'
import dashboard from '../assets/img/icons/dashboard.svg';
import infor from '../assets/img/icons/infor.svg';
import income from '../assets/img/icons/income.svg';
import dropdown from '../assets/img/icons/dropdown.svg';
import dropup from '../assets/img/icons/dropup.svg';
import danger from '../assets/img/icons/danger.svg';
import employee from '../assets/img/icons/employee.svg';
import users from '../assets/img/icons/users.svg';
import send_notify from '../assets/img/icons/send_notify.svg';
import restaurant from '../assets/img/icons/restaurant.svg';
import food from '../assets/img/icons/food.svg';
import history from '../assets/img/icons/history.svg';
import payment from '../assets/img/icons/payment.svg';
import discount from '../assets/img/icons/discount.svg';
import error from '../assets/img/icons/error.svg';
import report from '../assets/img/icons/report.svg';
import dot from '../assets/img/icons/dot.svg';

// Image
import avatar from '../assets/img/images/ex_avatar.png';

// Conponent
import React, { useEffect, useRef } from 'react'
import ApexCharts from 'apexcharts'
import { ReactSVG } from 'react-svg';


const Users = () => {
    document.title = 'Informations - Users';
    const chartRef = useRef(null);

    useEffect(() => {
        let chart;
        if (chartRef.current) {
            debugger;
            chart = new ApexCharts(document.getElementById("reportsChart"), {
                series: [{
                    name: 'New Users',
                    data: [31, 40, 28, 51, 42, 82, 56],
                }, {
                    name: 'Partnership',
                    data: [11, 32, 45, 32, 34, 52, 41]
                }, {
                    name: 'Banned',
                    data: [15, 11, 32, 18, 9, 24, 11]
                }],
                chart: {
                    height: 350,
                    type: 'area',
                    toolbar: {
                        show: false
                    },
                },
                markers: {
                    size: 4
                },
                colors: ['#4154f1', '#2eca6a', '#ff771d'],
                fill: {
                    type: "gradient",
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.3,
                        opacityTo: 0.4,
                        stops: [0, 90, 100]
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth',
                    width: 2
                },
                xaxis: {
                    type: 'datetime',
                    categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm'
                    },
                }
            });
            chart.render();
        }
        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, []);

    return (
        <div className=''>

            {/* <!-- ======= Header ======= --> */}
            <header id="header" className="header fixed-top d-flex align-items-center">

                <div className="d-flex align-items-center justify-content-between">
                    <img src={logo} alt="" />
                    <a className="logo d-flex align-items-center">
                        <span className="d-none d-lg-block orange">Orangic</span>
                    </a>
                    <img src={menu} alt="" className='toggle-sidebar-btn' />
                </div>
                {/* <!-- End Logo --> */}

                <div className="search-bar">
                    <form className="search-form d-flex align-items-center" method="POST" action="#">
                        <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
                        <button type="submit" title="Search"><img src={search} /></button>
                    </form>
                </div>
                {/* <!-- End Search Bar --> */}

                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">

                        <li className="nav-item d-block d-lg-none">
                            <a className="nav-link nav-icon search-bar-toggle " href="#">
                                <i className="bi bi-search"></i>
                            </a>
                        </li>
                        {/* <!-- End Search Icon--> */}

                        <li className="nav-item dropdown">

                            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                                <img src={notify} alt='Error notify icon' />
                                <span className="badge bg-primary badge-number">4</span>
                            </a>
                            {/* <!-- End Notification Icon --> */}

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                                <li className="dropdown-header">
                                    You have 4 new notifications
                                    <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="notification-item">
                                    <i className="bi bi-exclamation-circle text-warning"></i>
                                    <div>
                                        <h4>Lorem Ipsum</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>30 min. ago</p>
                                    </div>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="notification-item">
                                    <i className="bi bi-x-circle text-danger"></i>
                                    <div>
                                        <h4>Atque rerum nesciunt</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>1 hr. ago</p>
                                    </div>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="notification-item">
                                    <i className="bi bi-check-circle text-success"></i>
                                    <div>
                                        <h4>Sit rerum fuga</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>2 hrs. ago</p>
                                    </div>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="notification-item">
                                    <i className="bi bi-info-circle text-primary"></i>
                                    <div>
                                        <h4>Dicta reprehenderit</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>4 hrs. ago</p>
                                    </div>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li className="dropdown-footer">
                                    <a href="#">Show all notifications</a>
                                </li>

                            </ul>
                            {/* <!-- End Notification Dropdown Items --> */}

                        </li>
                        {/* <!-- End Notification Nav --> */}

                        <li className="nav-item dropdown">

                            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                                <img src={chat_box} alt='Error notify icon' />
                                <span className="badge bg-success badge-number">3</span>
                            </a>
                            {/* <!-- End Messages Icon --> */}

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                                <li className="dropdown-header">
                                    You have 3 new messages
                                    <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="message-item">
                                    <a href="#">
                                        <img src="assets/img/messages-1.jpg" alt="" className="rounded-circle" />
                                        <div>
                                            <h4>Maria Hudson</h4>
                                            <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                            <p>4 hrs. ago</p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="message-item">
                                    <a href="#">
                                        <img src="assets/img/messages-2.jpg" alt="" className="rounded-circle" />
                                        <div>
                                            <h4>Anna Nelson</h4>
                                            <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                            <p>6 hrs. ago</p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="message-item">
                                    <a href="#">
                                        <img src="assets/img/messages-3.jpg" alt="" className="rounded-circle" />
                                        <div>
                                            <h4>David Muldon</h4>
                                            <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                            <p>8 hrs. ago</p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="dropdown-footer">
                                    <a href="#">Show all messages</a>
                                </li>

                            </ul>
                            {/* <!-- End Messages Dropdown Items --> */}

                        </li>
                        {/* <!-- End Messages Nav --> */}

                        <li className="nav-item dropdown pe-3">

                            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                                <img src={avatar} alt="Error Profile" className="rounded-circle" />
                                <span className="d-none d-md-block dropdown-toggle ps-2">Alex</span>
                            </a>
                            {/* <!-- End Profile Iamge Icon --> */}

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header">
                                    <h6>Kevin Anderson</h6>
                                    <span>Web Designer</span>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                        <i className="bi bi-person"></i>
                                        <span>My Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                        <i className="bi bi-gear"></i>
                                        <span>Account Settings</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="pages-faq.html">
                                        <i className="bi bi-question-circle"></i>
                                        <span>Need Help?</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span>Sign Out</span>
                                    </a>
                                </li>

                            </ul>
                            {/* <!-- End Profile Dropdown Items --> */}
                        </li>
                        {/* <!-- End Profile Nav --> */}

                    </ul>
                </nav>
                {/* <!-- End Icons Navigation --> */}

            </header>
            {/* <!-- End Header --> */}


            {/* <!-- ======= Sidebar ======= --> */}
            <aside id="sidebar" className="sidebar">

                <ul className="sidebar-nav" id="sidebar-nav">

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="index.html">
                            <ReactSVG
                                src={dashboard}
                                className='nav-link-icon'
                            />
                            <span>Dashboard</span>
                        </a>
                    </li>
                    {/* <!-- End Dashboard Nav --> */}

                    <li className="nav-heading">Applications</li>

                    <li className="nav-item">
                        <a className="nav-link" data-bs-target="#components-nav" data-bs-toggle="collapse" aria-expanded="true" href="#">
                            <ReactSVG
                                src={infor}
                                className='nav-link-icon'
                            />
                            <span>Informations</span>
                            <ReactSVG
                                src={dropdown}
                                className='nav-link-icon ms-auto'
                            />
                        </a>
                        <ul id="components-nav" className="nav-content collapse show" data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="components-alerts.html" className='active'>
                                    <ReactSVG
                                        src={dot}
                                        className='nav-link-subicon dot'
                                    />
                                    <ReactSVG
                                        src={users}
                                        className='nav-link-subicon'
                                    />
                                    <span>Users</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-accordion.html">
                                    <ReactSVG
                                        src={dot}
                                        className='nav-link-subicon dot'
                                    />
                                    <ReactSVG
                                        src={send_notify}
                                        className='nav-link-subicon'
                                    />
                                    <span>Notification</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-badges.html">
                                    <ReactSVG
                                        src={dot}
                                        className='nav-link-subicon dot'
                                    />
                                    <ReactSVG
                                        src={restaurant}
                                        className='nav-link-subicon'
                                    />
                                    <span>Restaurants</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-breadcrumbs.html">
                                    <ReactSVG
                                        src={dot}
                                        className='nav-link-subicon dot'
                                    />
                                    <ReactSVG
                                        src={food}
                                        className='nav-link-subicon'
                                    />
                                    <span>Foods</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-breadcrumbs.html">
                                    <ReactSVG
                                        src={dot}
                                        className='nav-link-subicon dot'
                                    />
                                    <ReactSVG
                                        src={history}
                                        className='nav-link-subicon'
                                    />
                                    <span>History Files</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    {/* <!-- End Information Nav --> */}

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                            <ReactSVG
                                src={income}
                                className='nav-link-icon'
                            />
                            <span>Income</span>
                            <ReactSVG
                                src={dropdown}
                                className='nav-link-icon ms-auto'
                            />
                        </a>
                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="forms-elements.html">
                                    <ReactSVG
                                        src={dot}
                                        className='nav-link-subicon dot'
                                    />
                                    <ReactSVG
                                        src={payment}
                                        className='nav-link-subicon'
                                    />
                                    <span>Payment Methods</span>
                                </a>
                            </li>
                            <li>
                                <a href="forms-layouts.html">
                                    <ReactSVG
                                        src={dot}
                                        className='nav-link-subicon dot'
                                    />
                                    <ReactSVG
                                        src={discount}
                                        className='nav-link-subicon'
                                    />
                                    <span>Discounts</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    {/* <!-- End Income Nav --> */}

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                            <ReactSVG
                                src={danger}
                                className='nav-link-icon'
                            />
                            <span>Errors</span>
                            <ReactSVG
                                src={dropdown}
                                className='nav-link-icon ms-auto'
                            />
                        </a>
                        <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="tables-general.html">
                                    <ReactSVG
                                        src={dot}
                                        className='nav-link-subicon dot'
                                    />
                                    <ReactSVG
                                        src={error}
                                        className='nav-link-subicon'
                                    />
                                    <span>Report Errors</span>
                                </a>
                            </li>
                            <li>
                                <a href="tables-data.html">
                                    <ReactSVG
                                        src={dot}
                                        className='nav-link-subicon dot'
                                    />
                                    <ReactSVG
                                        src={report}
                                        className='nav-link-subicon'
                                    />
                                    <span>Report Restaurants</span>
                                </a>
                            </li>
                            <li>
                                <a href="tables-data.html">
                                    <ReactSVG
                                        src={dot}
                                        className='nav-link-subicon dot'
                                    />
                                    <ReactSVG
                                        src={report}
                                        className='nav-link-subicon'
                                    />
                                    <span>Report Foods</span>
                                </a>
                            </li>
                            <li>
                                <a href="tables-data.html">
                                    <ReactSVG
                                        src={dot}
                                        className='nav-link-subicon dot'
                                    />
                                    <ReactSVG
                                        src={report}
                                        className='nav-link-subicon'
                                    />
                                    <span>Report Users</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    {/* <!-- End Errors Nav --> */}

                    <li className="nav-heading">Pages</li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="users-profile.html">
                            <ReactSVG
                                src={employee}
                                className='nav-link-icon'
                            />
                            <span>Employees</span>
                        </a>
                    </li>
                    {/* <!-- End Empployee Page Nav --> */}

                </ul>

            </aside>
            {/* <!-- End Sidebar--> */}

            <main id="main" className="main">

                {/* <!-- ======= Main ======= --> */}
                <div className="pagetitle">
                    <h1>Users Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Informations</a></li>
                            <li className="breadcrumb-item active">Users</li>
                        </ol>
                    </nav>
                </div>
                {/* <!-- End Page Title --> */}

                {/* <!-- ======= Section ======= --> */}
                <section className="section dashboard">
                    <div className="row">


                        {/* <!-- Left side columns --> */}
                        <div className="col-lg-8">
                            <div className="row">

                                {/* <!-- Sales Card --> */}
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card sales-card">

                                        <div className="filter">
                                            <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a className="dropdown-item" href="#">Today</a></li>
                                                <li><a className="dropdown-item" href="#">This Month</a></li>
                                                <li><a className="dropdown-item" href="#">This Year</a></li>
                                            </ul>
                                        </div>

                                        <div className="card-body">
                                            <h5 className="card-title">New Users <span>| Today</span></h5>

                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-cart"></i>
                                                </div>
                                                <div className="ps-3">
                                                    <h6>145</h6>
                                                    <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* <!-- End Sales Card --> */}


                                {/* <!-- Revenue Card --> */}
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card revenue-card">

                                        <div className="filter">
                                            <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a className="dropdown-item" href="#">Today</a></li>
                                                <li><a className="dropdown-item" href="#">This Month</a></li>
                                                <li><a className="dropdown-item" href="#">Total</a></li>
                                            </ul>
                                        </div>

                                        <div className="card-body">
                                            <h5 className="card-title">Partnership <span>| Total</span></h5>

                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-currency-dollar"></i>
                                                </div>
                                                <div className="ps-3">
                                                    <h6>$3,264</h6>
                                                    <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* <!-- End Revenue Card --> */}


                                {/* <!-- Customers Card --> */}
                                <div className="col-xxl-4 col-xl-12">

                                    <div className="card info-card customers-card">

                                        <div className="filter">
                                            <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a className="dropdown-item" href="#">Today</a></li>
                                                <li><a className="dropdown-item" href="#">This Month</a></li>
                                                <li><a className="dropdown-item" href="#">This Year</a></li>
                                                <li><a className="dropdown-item" href="#">Total</a></li>
                                            </ul>
                                        </div>

                                        <div className="card-body">
                                            <h5 className="card-title">Banned <span>| Today</span></h5>

                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-people"></i>
                                                </div>
                                                <div className="ps-3">
                                                    <h6>1244</h6>
                                                    <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                {/* <!-- End Customers Card --> */}


                                {/* <!-- Reports --> */}
                                <div className="col-12">
                                    <div className="card">

                                        <div className="filter">
                                            <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a className="dropdown-item" href="#">Today</a></li>
                                                <li><a className="dropdown-item" href="#">This Month</a></li>
                                                <li><a className="dropdown-item" href="#">This Year</a></li>
                                            </ul>
                                        </div>

                                        <div className="card-body">
                                            <h5 className="card-title">Reports <span>/Today</span></h5>


                                            {/* <!-- Line Chart --> */}
                                            <div id="reportsChart" ref={chartRef}></div>

                                            {/* <!-- End Line Chart --> */}

                                        </div>

                                    </div>
                                </div>
                                {/* <!-- End Reports --> */}

                                {/* <!-- Tab Bar --> */}
                                <div className="col-12">

                                    <div className="card" style={{ minHeight: 450 }}>
                                        <div className="card-body pt-3">

                                            {/* <!-- Bordered Tabs --> */}
                                            <ul className="nav nav-tabs nav-tabs-bordered">

                                                <li className="nav-item">
                                                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#list-users-overview">List</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#users-leaderboard">Leader Board</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#user-comments">Comments</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#banned-users">Banned</button>
                                                </li>

                                            </ul>
                                            <div className="tab-content pt-2">

                                                <div className="tab-pane fade show active profile-overview" id="list-users-overview">
                                                    <h5 className="card-title">Users List</h5>

                                                    <table className="table table-borderless"
                                                        style={{ textAlign: 'start' }}
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Avatar</th>
                                                                <th scope="col">ID</th>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">Email</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row" style={{ textAlign: 'center' }}><a href="#"><img src={avatar} alt="" style={{ width: 24 }} /></a></th>
                                                                <td><a href="#" className="text-primary fw-bold">USR2IL8D7WUK34EABHP1</a></td>
                                                                <td>Sophie Brown</td>
                                                                <td className="fw-bold">sophie@example.com</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row" style={{ textAlign: 'center' }}><a href="#"><img src={avatar} alt="" style={{ width: 24 }} /></a></th>
                                                                <td><a href="#" className="text-primary fw-bold">USR6JT4G3XK2LH97PONV</a></td>
                                                                <td>Mike Thompson</td>
                                                                <td className="fw-bold">mike@example.com</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row" style={{ textAlign: 'center' }}><a href="#"><img src={avatar} alt="" style={{ width: 24 }} /></a></th>
                                                                <td><a href="#" className="text-primary fw-bold">USR8J2NQW9PGBR4K25LX</a></td>
                                                                <td>Bob Wilson</td>
                                                                <td className="fw-bold">bob@example.com</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row" style={{ textAlign: 'center' }}><a href="#"><img src={avatar} alt="" style={{ width: 24 }} /></a></th>
                                                                <td><a href="#" className="text-primary fw-bold">USR9C1OV6KYPSW8V7ZDM</a></td>
                                                                <td>Eva Davis</td>
                                                                <td className="fw-bold">eva@example.com</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row" style={{ textAlign: 'center' }}><a href="#"><img src={avatar} alt="" style={{ width: 24 }} /></a></th>
                                                                <td><a href="#" className="text-primary fw-bold">USRCSN3EEYOCQ64NNAF6</a></td>
                                                                <td>Jane Smith</td>
                                                                <td className="fw-bold">jane@example.com</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {/* <!-- End List Users Overview Tab --> */}

                                                <div className="tab-pane fade profile-edit pt-3" id="users-leaderboard">

                                                    {/* <!-- Users LeaderBoard table --> */}
                                                    <h5 className="card-title">LeaderBoard</h5>

                                                    <table className="table table-borderless"
                                                        style={{ textAlign: 'start' }}
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Avatar</th>
                                                                <th scope="col">ID</th>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">Rank</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row" style={{ textAlign: 'center' }}><a href="#"><img src={avatar} alt="" style={{ width: 24 }} /></a></th>
                                                                <td><a href="#" className="text-primary fw-bold">USR2IL8D7WUK34EABHP1</a></td>
                                                                <td>Sophie Brown</td>
                                                                <td>100</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row" style={{ textAlign: 'center' }}><a href="#"><img src={avatar} alt="" style={{ width: 24 }} /></a></th>
                                                                <td><a href="#" className="text-primary fw-bold">USR6JT4G3XK2LH97PONV</a></td>
                                                                <td>Mike Thompson</td>
                                                                <td>150</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row" style={{ textAlign: 'center' }}><a href="#"><img src={avatar} alt="" style={{ width: 24 }} /></a></th>
                                                                <td><a href="#" className="text-primary fw-bold">USR8J2NQW9PGBR4K25LX</a></td>
                                                                <td>Bob Wilson</td>
                                                                <td>200</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row" style={{ textAlign: 'center' }}><a href="#"><img src={avatar} alt="" style={{ width: 24 }} /></a></th>
                                                                <td><a href="#" className="text-primary fw-bold">USR9C1OV6KYPSW8V7ZDM</a></td>
                                                                <td>Eva Davis</td>
                                                                <td>0</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row" style={{ textAlign: 'center' }}><a href="#"><img src={avatar} alt="" style={{ width: 24 }} /></a></th>
                                                                <td><a href="#" className="text-primary fw-bold">USRCSN3EEYOCQ64NNAF6</a></td>
                                                                <td>Jane Smith</td>
                                                                <td>90</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    {/* <!-- Users LeaderBoard table --> */}

                                                </div>

                                                <div className="tab-pane fade pt-3" id="user-comments">

                                                    <div className='comment-search'>
                                                        <input class="comment-search-input" placeholder="User's ID..." type="search" title="Search within table" />

                                                        <div className='buttons-group'>
                                                            <button type="button" class="btn btn-outline-info btn-sm">Restaurants</button>
                                                            <button type="button" class="btn btn-outline-success btn-sm">Foods</button>                                                        </div>
                                                    </div>

                                                    <h5 className="card-title">Nothing...</h5>

                                                </div>

                                                <div className="tab-pane fade pt-3" id="banned-users">

                                                    {/* <!-- Users Banned List table --> */}
                                                    <h5 className="card-title">Users Banned List</h5>

                                                    <table className="table table-borderless"
                                                        style={{ textAlign: 'start' }}
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Avatar</th>
                                                                <th scope="col">ID</th>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row" style={{ textAlign: 'center' }}><a href="#"><img src={avatar} alt="" style={{ width: 24 }} /></a></th>
                                                                <td><a href="#" className="text-primary fw-bold">USRPJAYLZCNDM5V8G32K</a></td>
                                                                <td>Grace Wilson</td>
                                                                <td>
                                                                    <button type="button" class="btn btn-danger btn-sm">UnBan</button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row" style={{ textAlign: 'center' }}><a href="#"><img src={avatar} alt="" style={{ width: 24 }} /></a></th>
                                                                <td><a href="#" className="text-primary fw-bold">USRWMG9ZVKXIJYR5B43D</a></td>
                                                                <td>David Miller</td>
                                                                <td>
                                                                    <button type="button" class="btn btn-danger btn-sm">UnBan</button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row" style={{ textAlign: 'center' }}><a href="#"><img src={avatar} alt="" style={{ width: 24 }} /></a></th>
                                                                <td><a href="#" className="text-primary fw-bold">USRZP72UZG1N8FACD6X3</a></td>
                                                                <td>Alice Johnson</td>
                                                                <td>
                                                                    <button type="button" class="btn btn-danger btn-sm">UnBan</button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    {/* <!-- Users Banned List table --> */}

                                                </div>

                                            </div>
                                            {/* <!-- End Bordered Tabs --> */}

                                        </div>
                                    </div>

                                </div>
                                {/* <!-- End Tab Bar --> */}


                                {/* <!-- Recent Sales --> */}
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">

                                        <div className="filter">
                                            <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a className="dropdown-item" href="#">Today</a></li>
                                                <li><a className="dropdown-item" href="#">This Month</a></li>
                                                <li><a className="dropdown-item" href="#">This Year</a></li>
                                            </ul>
                                        </div>

                                        <div className="card-body">
                                            <h5 className="card-title">Recent Sales <span>| Today</span></h5>

                                            <table className="table table-borderless datatable">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Customer</th>
                                                        <th scope="col">Product</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row"><a href="#">#2457</a></th>
                                                        <td>Brandon Jacob</td>
                                                        <td><a href="#" className="text-primary">At praesentium minu</a></td>
                                                        <td>$64</td>
                                                        <td><span className="badge bg-success">Approved</span></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#">#2147</a></th>
                                                        <td>Bridie Kessler</td>
                                                        <td><a href="#" className="text-primary">Blanditiis dolor omnis similique</a></td>
                                                        <td>$47</td>
                                                        <td><span className="badge bg-warning">Pending</span></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#">#2049</a></th>
                                                        <td>Ashleigh Langosh</td>
                                                        <td><a href="#" className="text-primary">At recusandae consectetur</a></td>
                                                        <td>$147</td>
                                                        <td><span className="badge bg-success">Approved</span></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#">#2644</a></th>
                                                        <td>Angus Grady</td>
                                                        <td><a href="#" className="text-primar">Ut voluptatem id earum et</a></td>
                                                        <td>$67</td>
                                                        <td><span className="badge bg-danger">Rejected</span></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#">#2644</a></th>
                                                        <td>Raheem Lehner</td>
                                                        <td><a href="#" className="text-primary">Sunt similique distinctio</a></td>
                                                        <td>$165</td>
                                                        <td><span className="badge bg-success">Approved</span></td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>

                                    </div>
                                </div>
                                {/* <!-- End Recent Sales --> */}


                                {/* <!-- Top Selling --> */}
                                <div className="col-12">
                                    <div className="card top-selling overflow-auto">

                                        <div className="filter">
                                            <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a className="dropdown-item" href="#">Today</a></li>
                                                <li><a className="dropdown-item" href="#">This Month</a></li>
                                                <li><a className="dropdown-item" href="#">This Year</a></li>
                                            </ul>
                                        </div>

                                        <div className="card-body pb-0">
                                            <h5 className="card-title">Top Selling <span>| Today</span></h5>

                                            <table className="table table-borderless">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Preview</th>
                                                        <th scope="col">Product</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Sold</th>
                                                        <th scope="col">Revenue</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row"><a href="#"><img src="assets/img/product-1./jpg" alt="" /></a></th>
                                                        <td><a href="#" className="text-primary fw-bold">Ut inventore ipsa voluptas nulla</a></td>
                                                        <td>$64</td>
                                                        <td className="fw-bold">124</td>
                                                        <td>$5,828</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#"><img src="assets/img/product-2.jpg" alt="" /></a></th>
                                                        <td><a href="#" className="text-primary fw-bold">Exercitationem similique doloremque</a></td>
                                                        <td>$46</td>
                                                        <td className="fw-bold">98</td>
                                                        <td>$4,508</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#"><img src="assets/img/product-3.jpg" alt="" /></a></th>
                                                        <td><a href="#" className="text-primary fw-bold">Doloribus nisi exercitationem</a></td>
                                                        <td>$59</td>
                                                        <td className="fw-bold">74</td>
                                                        <td>$4,366</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#"><img src="assets/img/product-4.jpg" alt="" /></a></th>
                                                        <td><a href="#" className="text-primary fw-bold">Officiis quaerat sint rerum error</a></td>
                                                        <td>$32</td>
                                                        <td className="fw-bold">63</td>
                                                        <td>$2,016</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#"><img src="assets/img/product-5.jpg" alt="" /></a></th>
                                                        <td><a href="#" className="text-primary fw-bold">Sit unde debitis delectus repellendus</a></td>
                                                        <td>$79</td>
                                                        <td className="fw-bold">41</td>
                                                        <td>$3,239</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>

                                    </div>
                                </div>
                                {/* <!-- End Top Selling --> */}

                            </div>
                        </div>
                        {/* <!-- End Left side columns --> */}


                        {/* <!-- Right side columns --> */}
                        <div className="col-lg-4">


                            {/* <!-- Recent Activity --> */}
                            <div className="card">
                                <div className="filter">
                                    <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>

                                        <li><a className="dropdown-item" href="#">Today</a></li>
                                        <li><a className="dropdown-item" href="#">This Month</a></li>
                                        <li><a className="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>

                                <div className="card-body">
                                    <h5 className="card-title">Recent Activity <span>| Today</span></h5>

                                    <div className="activity">

                                        <div className="activity-item d-flex">
                                            <div className="activite-label">32 min</div>
                                            <i class='bi bi-circle-fill activity-badge text-success align-self-start'></i>
                                            <div className="activity-content">
                                                Quia quae rerum <a href="#" className="fw-bold text-dark">explicabo officiis</a> beatae
                                            </div>
                                        </div>
                                        {/* <!-- End activity item--> */}

                                        <div className="activity-item d-flex">
                                            <div className="activite-label">56 min</div>
                                            <i class='bi bi-circle-fill activity-badge text-danger align-self-start'></i>
                                            <div className="activity-content">
                                                Voluptatem blanditiis blanditiis eveniet
                                            </div>
                                        </div>
                                        {/* <!-- End activity item--> */}

                                        <div className="activity-item d-flex">
                                            <div className="activite-label">2 hrs</div>
                                            <i class='bi bi-circle-fill activity-badge text-primary align-self-start'></i>
                                            <div className="activity-content">
                                                Voluptates corrupti molestias voluptatem
                                            </div>
                                        </div>
                                        {/* <!-- End activity item--> */}

                                        <div className="activity-item d-flex">
                                            <div className="activite-label">1 day</div>
                                            <i class='bi bi-circle-fill activity-badge text-info align-self-start'></i>
                                            <div className="activity-content">
                                                Tempore autem saepe <a href="#" className="fw-bold text-dark">occaecati voluptatem</a> tempore
                                            </div>
                                        </div>
                                        {/* <!-- End activity item--> */}

                                        <div className="activity-item d-flex">
                                            <div className="activite-label">2 days</div>
                                            <i class='bi bi-circle-fill activity-badge text-warning align-self-start'></i>
                                            <div className="activity-content">
                                                Est sit eum reiciendis exercitationem
                                            </div>
                                        </div>
                                        {/* <!-- End activity item--> */}

                                        <div className="activity-item d-flex">
                                            <div className="activite-label">4 weeks</div>
                                            <i class='bi bi-circle-fill activity-badge text-muted align-self-start'></i>
                                            <div className="activity-content">
                                                Dicta dolorem harum nulla eius. Ut quidem quidem sit quas
                                            </div>
                                        </div>
                                        {/* <!-- End activity item--> */}

                                    </div>

                                </div>
                            </div>
                            {/* <!-- End Recent Activity --> */}


                        </div>
                        {/* <!-- End Right side columns --> */}

                    </div>
                </section>
                {/* <!-- End Secion --> */}

            </main>
            {/* <!-- End Main --> */}
        </div >
    )
}

export default Users