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
import React from 'react'
import { ReactSVG } from 'react-svg';


const Foods = () => {
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
                                <a href="components-alerts.html">
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
                                <a href="components-breadcrumbs.html" className='active'>
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

            <main id="main" class="main">

                {/* <!-- ======= Main ======= --> */}
                <div className="pagetitle">
                    <h1>Foods Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Informations</a></li>
                            <li className="breadcrumb-item active">Foods</li>
                        </ol>
                    </nav>
                </div>
                {/* <!-- End Page Title --> */}

                {/* <!-- ======= Section ======= --> */}
                <section class="section dashboard">
                    <div class="row">


                        {/* <!-- Left side columns --> */}
                        <div class="col-lg-8">
                            <div class="row">


                                {/* <!-- Sales Card --> */}
                                <div class="col-xxl-4 col-md-6">
                                    <div class="card info-card sales-card">

                                        <div class="filter">
                                            <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li class="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a class="dropdown-item" href="#">Today</a></li>
                                                <li><a class="dropdown-item" href="#">This Month</a></li>
                                                <li><a class="dropdown-item" href="#">This Year</a></li>
                                            </ul>
                                        </div>

                                        <div class="card-body">
                                            <h5 class="card-title">New Users <span>| Today</span></h5>

                                            <div class="d-flex align-items-center">
                                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i class="bi bi-cart"></i>
                                                </div>
                                                <div class="ps-3">
                                                    <h6>145</h6>
                                                    <span class="text-success small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">increase</span>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* <!-- End Sales Card --> */}


                                {/* <!-- Revenue Card --> */}
                                <div class="col-xxl-4 col-md-6">
                                    <div class="card info-card revenue-card">

                                        <div class="filter">
                                            <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li class="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a class="dropdown-item" href="#">Today</a></li>
                                                <li><a class="dropdown-item" href="#">This Month</a></li>
                                                <li><a class="dropdown-item" href="#">Total</a></li>
                                            </ul>
                                        </div>

                                        <div class="card-body">
                                            <h5 class="card-title">Partnership <span>| Total</span></h5>

                                            <div class="d-flex align-items-center">
                                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i class="bi bi-currency-dollar"></i>
                                                </div>
                                                <div class="ps-3">
                                                    <h6>$3,264</h6>
                                                    <span class="text-success small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">increase</span>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* <!-- End Revenue Card --> */}


                                {/* <!-- Customers Card --> */}
                                <div class="col-xxl-4 col-xl-12">

                                    <div class="card info-card customers-card">

                                        <div class="filter">
                                            <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li class="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a class="dropdown-item" href="#">Today</a></li>
                                                <li><a class="dropdown-item" href="#">This Month</a></li>
                                                <li><a class="dropdown-item" href="#">This Year</a></li>
                                                <li><a class="dropdown-item" href="#">Total</a></li>
                                            </ul>
                                        </div>

                                        <div class="card-body">
                                            <h5 class="card-title">Banned <span>| Today</span></h5>

                                            <div class="d-flex align-items-center">
                                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i class="bi bi-people"></i>
                                                </div>
                                                <div class="ps-3">
                                                    <h6>1244</h6>
                                                    <span class="text-danger small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">decrease</span>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                {/* <!-- End Customers Card --> */}


                                {/* <!-- Reports --> */}
                                <div class="col-12">
                                    <div class="card">

                                        <div class="filter">
                                            <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li class="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a class="dropdown-item" href="#">Today</a></li>
                                                <li><a class="dropdown-item" href="#">This Month</a></li>
                                                <li><a class="dropdown-item" href="#">This Year</a></li>
                                            </ul>
                                        </div>

                                        <div class="card-body">
                                            <h5 class="card-title">Reports <span>/Today</span></h5>


                                            {/* <!-- Line Chart --> */}
                                            <div id="reportsChart"></div>

                                            {/* <script>
                    document.addEventListener("DOMContentLoaded", () => {
                                                    new ApexCharts(document.querySelector("#reportsChart"), {
                                                        series: [{
                                                            name: 'Sales',
                                                            data: [31, 40, 28, 51, 42, 82, 56],
                                                        }, {
                                                            name: 'Revenue',
                                                            data: [11, 32, 45, 32, 34, 52, 41]
                                                        }, {
                                                            name: 'Customers',
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
                                                    }).render();
                    });
                                            </script> */}

                                            {/* <!-- End Line Chart --> */}

                                        </div>

                                    </div>
                                </div>
                                {/* <!-- End Reports --> */}

                                {/* <!-- Tab Bar --> */}
                                <div class="col-12">

                                    <div class="card">
                                        <div class="card-body pt-3">

                                            {/* <!-- Bordered Tabs --> */}
                                            <ul class="nav nav-tabs nav-tabs-bordered">

                                                <li class="nav-item">
                                                    <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                                                </li>

                                                <li class="nav-item">
                                                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                                                </li>

                                                <li class="nav-item">
                                                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">Settings</button>
                                                </li>

                                                <li class="nav-item">
                                                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                                                </li>

                                            </ul>
                                            <div class="tab-content pt-2">

                                                <div class="tab-pane fade show active profile-overview" id="profile-overview">
                                                    <h5 class="card-title">About</h5>
                                                    <p class="small fst-italic">Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.</p>

                                                    <h5 class="card-title">Profile Details</h5>

                                                    <div class="row">
                                                        <div class="col-lg-3 col-md-4 label ">Full Name</div>
                                                        <div class="col-lg-9 col-md-8">Kevin Anderson</div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-lg-3 col-md-4 label">Company</div>
                                                        <div class="col-lg-9 col-md-8">Lueilwitz, Wisoky and Leuschke</div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-lg-3 col-md-4 label">Job</div>
                                                        <div class="col-lg-9 col-md-8">Web Designer</div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-lg-3 col-md-4 label">Country</div>
                                                        <div class="col-lg-9 col-md-8">USA</div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-lg-3 col-md-4 label">Address</div>
                                                        <div class="col-lg-9 col-md-8">A108 Adam Street, New York, NY 535022</div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-lg-3 col-md-4 label">Phone</div>
                                                        <div class="col-lg-9 col-md-8">(436) 486-3538 x29071</div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-lg-3 col-md-4 label">Email</div>
                                                        <div class="col-lg-9 col-md-8">k.anderson@example.com</div>
                                                    </div>

                                                </div>
                                                {/* <!-- End Profile Overview Tab --> */}

                                                <div class="tab-pane fade profile-edit pt-3" id="profile-edit">

                                                    {/* <!-- Profile Edit Form --> */}
                                                    <form>
                                                        <div class="row mb-3">
                                                            <label for="profileImage" class="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                                                            <div class="col-md-8 col-lg-9">
                                                                <img src="assets/img/profile-img.jpg" alt="Profile" />
                                                                <div class="pt-2">
                                                                    <a href="#" class="btn btn-primary btn-sm" title="Upload new profile image"><i class="bi bi-upload"></i></a>
                                                                    <a href="#" class="btn btn-danger btn-sm" title="Remove my profile image"><i class="bi bi-trash"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="row mb-3">
                                                            <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Full Name</label>
                                                            <div class="col-md-8 col-lg-9">
                                                                <input name="fullName" type="text" class="form-control" id="fullName" value="Kevin Anderson" />
                                                            </div>
                                                        </div>

                                                        <div className="row mb-3">
                                                            <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label">About</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <textarea name="about" className="form-control" id="about" style={{ height: '100px' }}>Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.</textarea>
                                                            </div>
                                                        </div>

                                                        <div class="row mb-3">
                                                            <label for="company" class="col-md-4 col-lg-3 col-form-label">Company</label>
                                                            <div class="col-md-8 col-lg-9">
                                                                <input name="company" type="text" class="form-control" id="company" value="Lueilwitz, Wisoky and Leuschke" />
                                                            </div>
                                                        </div>

                                                        <div class="row mb-3">
                                                            <label for="Job" class="col-md-4 col-lg-3 col-form-label">Job</label>
                                                            <div class="col-md-8 col-lg-9">
                                                                <input name="job" type="text" class="form-control" id="Job" value="Web Designer" />
                                                            </div>
                                                        </div>

                                                        <div class="row mb-3">
                                                            <label for="Country" class="col-md-4 col-lg-3 col-form-label">Country</label>
                                                            <div class="col-md-8 col-lg-9">
                                                                <input name="country" type="text" class="form-control" id="Country" value="USA" />
                                                            </div>
                                                        </div>

                                                        <div class="row mb-3">
                                                            <label for="Address" class="col-md-4 col-lg-3 col-form-label">Address</label>
                                                            <div class="col-md-8 col-lg-9">
                                                                <input name="address" type="text" class="form-control" id="Address" value="A108 Adam Street, New York, NY 535022" />
                                                            </div>
                                                        </div>

                                                        <div class="row mb-3">
                                                            <label for="Phone" class="col-md-4 col-lg-3 col-form-label">Phone</label>
                                                            <div class="col-md-8 col-lg-9">
                                                                <input name="phone" type="text" class="form-control" id="Phone" value="(436) 486-3538 x29071" />
                                                            </div>
                                                        </div>

                                                        <div class="row mb-3">
                                                            <label for="Email" class="col-md-4 col-lg-3 col-form-label">Email</label>
                                                            <div class="col-md-8 col-lg-9">
                                                                <input name="email" type="email" class="form-control" id="Email" value="k.anderson@example.com" />
                                                            </div>
                                                        </div>

                                                        <div class="row mb-3">
                                                            <label for="Twitter" class="col-md-4 col-lg-3 col-form-label">Twitter Profile</label>
                                                            <div class="col-md-8 col-lg-9">
                                                                <input name="twitter" type="text" class="form-control" id="Twitter" value="https://twitter.com/#" />
                                                            </div>
                                                        </div>

                                                        <div class="row mb-3">
                                                            <label for="Facebook" class="col-md-4 col-lg-3 col-form-label">Facebook Profile</label>
                                                            <div class="col-md-8 col-lg-9">
                                                                <input name="facebook" type="text" class="form-control" id="Facebook" value="https://facebook.com/#" />
                                                            </div>
                                                        </div>

                                                        <div class="row mb-3">
                                                            <label for="Instagram" class="col-md-4 col-lg-3 col-form-label">Instagram Profile</label>
                                                            <div class="col-md-8 col-lg-9">
                                                                <input name="instagram" type="text" class="form-control" id="Instagram" value="https://instagram.com/#" />
                                                            </div>
                                                        </div>

                                                        <div class="row mb-3">
                                                            <label for="Linkedin" class="col-md-4 col-lg-3 col-form-label">Linkedin Profile</label>
                                                            <div class="col-md-8 col-lg-9">
                                                                <input name="linkedin" type="text" class="form-control" id="Linkedin" value="https://linkedin.com/#" />
                                                            </div>
                                                        </div>

                                                        <div class="text-center">
                                                            <button type="submit" class="btn btn-primary">Save Changes</button>
                                                        </div>
                                                    </form>
                                                    {/* <!-- End Profile Edit Form --> */}

                                                </div>

                                                <div class="tab-pane fade pt-3" id="profile-settings">

                                                    {/* <!-- Settings Form --> */}
                                                    <form>

                                                        <div class="row mb-3">
                                                            <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Email Notifications</label>
                                                            <div class="col-md-8 col-lg-9">
                                                                <div class="form-check">
                                                                    <input class="form-check-input" type="checkbox" id="changesMade" checked />
                                                                    <label class="form-check-label" for="changesMade">
                                                                        Changes made to your account
                                                                    </label>
                                                                </div>
                                                                <div class="form-check">
                                                                    <input class="form-check-input" type="checkbox" id="newProducts" checked />
                                                                    <label class="form-check-label" for="newProducts">
                                                                        Information on new products and services
                                                                    </label>
                                                                </div>
                                                                <div class="form-check">
                                                                    <input class="form-check-input" type="checkbox" id="proOffers" />
                                                                    <label class="form-check-label" for="proOffers">
                                                                        Marketing and promo offers
                                                                    </label>
                                                                </div>
                                                                <div class="form-check">
                                                                    <input class="form-check-input" type="checkbox" id="securityNotify" checked disabled />
                                                                    <label class="form-check-label" for="securityNotify">
                                                                        Security alerts
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="text-center">
                                                            <button type="submit" class="btn btn-primary">Save Changes</button>
                                                        </div>
                                                    </form>
                                                    {/* <!-- End settings Form --> */}

                                                </div>

                                                <div class="tab-pane fade pt-3" id="profile-change-password">

                                                    {/* <!-- Change Password Form --> */}
                                                    <form>

                                                        <div class="row mb-3">
                                                            <label for="currentPassword" class="col-md-4 col-lg-3 col-form-label">Current Password</label>
                                                            <div class="col-md-8 col-lg-9">
                                                                <input name="password" type="password" class="form-control" id="currentPassword" />
                                                            </div>
                                                        </div>

                                                        <div class="row mb-3">
                                                            <label for="newPassword" class="col-md-4 col-lg-3 col-form-label">New Password</label>
                                                            <div class="col-md-8 col-lg-9">
                                                                <input name="newpassword" type="password" class="form-control" id="newPassword" />
                                                            </div>
                                                        </div>

                                                        <div class="row mb-3">
                                                            <label for="renewPassword" class="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                                                            <div class="col-md-8 col-lg-9">
                                                                <input name="renewpassword" type="password" class="form-control" id="renewPassword" />
                                                            </div>
                                                        </div>

                                                        <div class="text-center">
                                                            <button type="submit" class="btn btn-primary">Change Password</button>
                                                        </div>
                                                    </form>
                                                    {/* <!-- End Change Password Form --> */}

                                                </div>

                                            </div>
                                            {/* <!-- End Bordered Tabs --> */}

                                        </div>
                                    </div>

                                </div>
                                {/* <!-- End Tab Bar --> */}

                                {/* <!-- Recent Sales --> */}
                                <div class="col-12">
                                    <div class="card recent-sales overflow-auto">

                                        <div class="filter">
                                            <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li class="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a class="dropdown-item" href="#">Today</a></li>
                                                <li><a class="dropdown-item" href="#">This Month</a></li>
                                                <li><a class="dropdown-item" href="#">This Year</a></li>
                                            </ul>
                                        </div>

                                        <div class="card-body">
                                            <h5 class="card-title">Recent Sales <span>| Today</span></h5>

                                            <table class="table table-borderless datatable">
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
                                                        <td><a href="#" class="text-primary">At praesentium minu</a></td>
                                                        <td>$64</td>
                                                        <td><span class="badge bg-success">Approved</span></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#">#2147</a></th>
                                                        <td>Bridie Kessler</td>
                                                        <td><a href="#" class="text-primary">Blanditiis dolor omnis similique</a></td>
                                                        <td>$47</td>
                                                        <td><span class="badge bg-warning">Pending</span></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#">#2049</a></th>
                                                        <td>Ashleigh Langosh</td>
                                                        <td><a href="#" class="text-primary">At recusandae consectetur</a></td>
                                                        <td>$147</td>
                                                        <td><span class="badge bg-success">Approved</span></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#">#2644</a></th>
                                                        <td>Angus Grady</td>
                                                        <td><a href="#" class="text-primar">Ut voluptatem id earum et</a></td>
                                                        <td>$67</td>
                                                        <td><span class="badge bg-danger">Rejected</span></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#">#2644</a></th>
                                                        <td>Raheem Lehner</td>
                                                        <td><a href="#" class="text-primary">Sunt similique distinctio</a></td>
                                                        <td>$165</td>
                                                        <td><span class="badge bg-success">Approved</span></td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>

                                    </div>
                                </div>
                                {/* <!-- End Recent Sales --> */}


                                {/* <!-- Top Selling --> */}
                                <div class="col-12">
                                    <div class="card top-selling overflow-auto">

                                        <div class="filter">
                                            <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li class="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a class="dropdown-item" href="#">Today</a></li>
                                                <li><a class="dropdown-item" href="#">This Month</a></li>
                                                <li><a class="dropdown-item" href="#">This Year</a></li>
                                            </ul>
                                        </div>

                                        <div class="card-body pb-0">
                                            <h5 class="card-title">Top Selling <span>| Today</span></h5>

                                            <table class="table table-borderless">
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
                                                        <td><a href="#" class="text-primary fw-bold">Ut inventore ipsa voluptas nulla</a></td>
                                                        <td>$64</td>
                                                        <td class="fw-bold">124</td>
                                                        <td>$5,828</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#"><img src="assets/img/product-2.jpg" alt="" /></a></th>
                                                        <td><a href="#" class="text-primary fw-bold">Exercitationem similique doloremque</a></td>
                                                        <td>$46</td>
                                                        <td class="fw-bold">98</td>
                                                        <td>$4,508</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#"><img src="assets/img/product-3.jpg" alt="" /></a></th>
                                                        <td><a href="#" class="text-primary fw-bold">Doloribus nisi exercitationem</a></td>
                                                        <td>$59</td>
                                                        <td class="fw-bold">74</td>
                                                        <td>$4,366</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#"><img src="assets/img/product-4.jpg" alt="" /></a></th>
                                                        <td><a href="#" class="text-primary fw-bold">Officiis quaerat sint rerum error</a></td>
                                                        <td>$32</td>
                                                        <td class="fw-bold">63</td>
                                                        <td>$2,016</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#"><img src="assets/img/product-5.jpg" alt="" /></a></th>
                                                        <td><a href="#" class="text-primary fw-bold">Sit unde debitis delectus repellendus</a></td>
                                                        <td>$79</td>
                                                        <td class="fw-bold">41</td>
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
                        <div class="col-lg-4">


                            {/* <!-- Recent Activity --> */}
                            <div class="card">
                                <div class="filter">
                                    <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li class="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>

                                        <li><a class="dropdown-item" href="#">Today</a></li>
                                        <li><a class="dropdown-item" href="#">This Month</a></li>
                                        <li><a class="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>

                                <div class="card-body">
                                    <h5 class="card-title">Recent Activity <span>| Today</span></h5>

                                    <div class="activity">

                                        <div class="activity-item d-flex">
                                            <div class="activite-label">32 min</div>
                                            <i class='bi bi-circle-fill activity-badge text-success align-self-start'></i>
                                            <div class="activity-content">
                                                Quia quae rerum <a href="#" class="fw-bold text-dark">explicabo officiis</a> beatae
                                            </div>
                                        </div>
                                        {/* <!-- End activity item--> */}

                                        <div class="activity-item d-flex">
                                            <div class="activite-label">56 min</div>
                                            <i class='bi bi-circle-fill activity-badge text-danger align-self-start'></i>
                                            <div class="activity-content">
                                                Voluptatem blanditiis blanditiis eveniet
                                            </div>
                                        </div>
                                        {/* <!-- End activity item--> */}

                                        <div class="activity-item d-flex">
                                            <div class="activite-label">2 hrs</div>
                                            <i class='bi bi-circle-fill activity-badge text-primary align-self-start'></i>
                                            <div class="activity-content">
                                                Voluptates corrupti molestias voluptatem
                                            </div>
                                        </div>
                                        {/* <!-- End activity item--> */}

                                        <div class="activity-item d-flex">
                                            <div class="activite-label">1 day</div>
                                            <i class='bi bi-circle-fill activity-badge text-info align-self-start'></i>
                                            <div class="activity-content">
                                                Tempore autem saepe <a href="#" class="fw-bold text-dark">occaecati voluptatem</a> tempore
                                            </div>
                                        </div>
                                        {/* <!-- End activity item--> */}

                                        <div class="activity-item d-flex">
                                            <div class="activite-label">2 days</div>
                                            <i class='bi bi-circle-fill activity-badge text-warning align-self-start'></i>
                                            <div class="activity-content">
                                                Est sit eum reiciendis exercitationem
                                            </div>
                                        </div>
                                        {/* <!-- End activity item--> */}

                                        <div class="activity-item d-flex">
                                            <div class="activite-label">4 weeks</div>
                                            <i class='bi bi-circle-fill activity-badge text-muted align-self-start'></i>
                                            <div class="activity-content">
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
        </div>
    )
}

export default Foods