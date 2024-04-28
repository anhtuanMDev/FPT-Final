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
import new_user from '../assets/img/icons/new_user.svg';
import partnership from '../assets/img/icons/partnership.svg';
import user_banned from '../assets/img/icons/user_banned.svg';
import more from '../assets/img/icons/more.svg';

import Swal from 'sweetalert2'

// Image
import avatar from '../assets/img/images/ex_avatar.png';

// Conponent
import React, { isValidElement, useEffect, useReducer, useRef, useState } from 'react'
import ApexCharts from 'apexcharts'
import { ReactSVG } from 'react-svg';
import { Navigate, useNavigate, useHref } from 'react-router-dom';
import AxiosInstance from '../helpers/AxiosInstance.js';
// import Swal from 'sweetalert2'


const Discounts = (prop) => {
    const { host, adminID } = prop
    document.title = 'Informations - Users';
    const chartRef = useRef(null);

    const navigate = useNavigate();
    let currentTime = new Date();

    const changePage = (link) => {
        navigate(link);
    };

    const selectEventEditTab = () => {
        const tabToSwitch = document.querySelector('[data-bs-target="#event-edit"]'); // Lấy phần tử có data-bs-target="#event-edit"

        if (tabToSwitch) {
            // Kích hoạt sự kiện click trên phần tử để chuyển đến tab "event-edit"
            tabToSwitch.click();
        }
    }


    const typeCouponsList = ["Times", "Count"];
    const [typeCoupon, setTypeCoupon] = useState(typeCouponsList[0]);
    const [typeCouponEdit, setTypeCouponEdit] = useState(typeCouponsList[0]);
    const [typeCouponCouponEdit, setTypeCouponCouponEdit] = useState(typeCouponsList[0]);

    // image
    const [image, setImage] = useState(null);
    const [fileImage, setFileImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        file && setFileImage(file);

        reader.onload = () => {
            const imageDataURL = reader.result;
            setImage(imageDataURL);
        };

        reader.readAsDataURL(file);
    };




    {/** declare event storage */ }

    const initialState = {

        events: [],
        eventDetail: null,
        eventEdit: null,

        eventPage: 1,

        eventTotalPage: 1,

    };

    const [data, dispatchData] = useReducer((state, action) => {
        switch (action.type) {
            case 'GET_EVENTS':
                return { ...state, events: action.payload };

            case 'GET_EVENT_DETAIL':
                return { ...state, eventDetail: action.payload };

            case 'GET_EVENT_EDIT':
                return { ...state, eventEdit: action.payload };

            case 'SET_EVENTS_PAGE':
                return { ...state, eventPage: action.payload };

            case 'SET_EVENTS_TOTAL_PAGE':
                return { ...state, eventTotalPage: action.payload };


            default:
                return state;
        }
    }, initialState)

    {/** End of declare event storage */ }

    const loadAllEvents = async () => {
        const response = await AxiosInstance().get("get-all-events.php");

        const length = response.data.length;


        let numberItemDisplayed = 5;
        let list = response.data.slice(data.eventPage * numberItemDisplayed - numberItemDisplayed, data.eventPage * numberItemDisplayed);

        dispatchData({ type: "GET_EVENTS", payload: list });
        dispatchData({ type: "SET_EVENTS_TOTAL_PAGE", payload: Math.ceil(length / numberItemDisplayed) });
    }

    useEffect(() => {
        loadAllEvents();
    }, [data.eventPage])

    const loadEventDetail = async (eventId) => {
        const response = await AxiosInstance().get("get-event-detail.php", { params: { id: eventId } });
        console.log(response.eventDetail);
        dispatchData({ type: "GET_EVENT_DETAIL", payload: response.eventDetail });
    }

    const setEventEdit = (eventInfo) => {
        dispatchData({ type: "GET_EVENT_EDIT", payload: eventInfo });
    }

    const generateID = (prefix) => {
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = prefix;
        for (let i = 0; i < 17; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const setInfoEventEdit = (eventDe) => {
        let title = document.getElementById('eventTitle-edit');
        let content = document.getElementById('eventContent-edit');
        let code = document.getElementById('couponCode-edit');
        let discount = document.getElementById('eventDiscount-edit');
        let type = document.getElementById('typeCoupon-edit');
        let amount = document.getElementById('couponAmount-edit');
        let start = document.getElementById('eventStart-edit');
        let end = document.getElementById('eventEnd-edit');

        title.value = eventDe.Title;
        content.value = eventDe.Content;
        code.value = eventDe.CouponCode;
        discount.value = eventDe.Discount;
        type.value = eventDe.Type;
        setTypeCouponEdit(type.value);
        amount.value = eventDe.Amount !== -1 ? eventDe.Amount : "";
        start.value = eventDe.Start;
        end.value = eventDe.End;
    }

    const handleCreateEvent = async (event) => {
        event.preventDefault(); // prevent form submission
        console.log("press in")
        let boole = true;
        var needsValidation = document.querySelectorAll('.needs-validation.create-event');

        Array.prototype.slice.call(needsValidation)
            .forEach(function (form) {
                if (!form.checkValidity()) {
                    event.stopPropagation();
                    form.classList.add('was-validated');
                    boole = false;
                }
            });

        if (!boole) return;

        const title = document.getElementById('eventTitle').value;
        const content = document.getElementById('eventContent').value;
        const code = document.getElementById('couponCode').value;
        const discount = document.getElementById('eventDiscount').value;
        const type = document.getElementById('typeCoupon').value;
        const amount = document.getElementById('couponAmount').value;
        const start = document.getElementById('eventStart').value;
        const end = document.getElementById('eventEnd').value;

        const response = await AxiosInstance().post("create-event.php", { title, content, code, discount, type, amount, start, end, adminID });

        if (response.status) {
            console.log("success");
            Swal.fire({
                title: 'Success',
                text: 'Event successfully created',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            loadAllEvents();


            if (!fileImage) return;

            const formData = new FormData();
            const id = generateID('IMG');
            // console.log(fileImage);
            formData.append('image', fileImage, `${id}.jpg`);

            const result = await AxiosInstance('multipart/form-data').post('/upload-file.php', formData);
            // console.log(result);
            const data = {
                id: id,
                ownerID: response.data,
            };
            const upload = await AxiosInstance().post('/insert-image.php', data);
        } else {
            console.log("failed");
            Swal.fire({
                title: 'Failed',
                text: response.statusText,
                // text: 'Event creation failed',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    const handleUpdateEvent = async (event, eventInfo) => {
        event.preventDefault(); // prevent form submission
        console.log("press in")
        let boole = true;
        var needsValidation = document.querySelectorAll('.needs-validation.update-event');

        Array.prototype.slice.call(needsValidation)
            .forEach(function (form) {
                if (!form.checkValidity()) {
                    event.stopPropagation();
                    form.classList.add('was-validated');
                    boole = false;
                }
            });

        if (!boole) return;

        const eventId = eventInfo.Id;
        const couponId = eventInfo.CouponID;

        if (!eventId) {
            Swal.fire({
                title: 'Failed',
                text: 'No Id',
                icon: 'error',
                confirmButtonText: 'OK'
            })
            return;
        }

        const title = document.getElementById('eventTitle-edit').value;
        const content = document.getElementById('eventContent-edit').value;
        const code = document.getElementById('couponCode-edit').value;
        const discount = document.getElementById('eventDiscount-edit').value;
        const type = document.getElementById('typeCoupon-edit').value;
        const amount = document.getElementById('couponAmount-edit').value;
        const start = document.getElementById('eventStart-edit').value;
        const end = document.getElementById('eventEnd-edit').value;



        const response = await AxiosInstance().post("update-event.php", { id: eventId, couponId: couponId, title, content, code, discount, type, amount, start, end, adminID });

        if (response.status) {
            console.log("success");
            Swal.fire({
                title: 'Success',
                text: 'Event successfully updated',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            loadAllEvents();
        } else {
            console.log("failed");
            Swal.fire({
                title: 'Failed',
                text: 'Event updation failed',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }


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
                            <a className="nav-link nav-icon search-bar-toggle ">
                                <i className="bi bi-search"></i>
                            </a>
                        </li>
                        {/* <!-- End Search Icon--> */}

                        <li className="nav-item dropdown">

                            <a className="nav-link nav-icon" data-bs-toggle="dropdown">
                                <img src={notify} alt='Error notify icon' />
                                <span className="badge bg-primary badge-number">4</span>
                            </a>
                            {/* <!-- End Notification Icon --> */}

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                                <li className="dropdown-header">
                                    You have 4 new notifications
                                    <a><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
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
                                    <a>Show all notifications</a>
                                </li>

                            </ul>
                            {/* <!-- End Notification Dropdown Items --> */}

                        </li>
                        {/* <!-- End Notification Nav --> */}

                        <li className="nav-item dropdown">

                            <a className="nav-link nav-icon" data-bs-toggle="dropdown">
                                <img src={chat_box} alt='Error notify icon' />
                                <span className="badge bg-success badge-number">3</span>
                            </a>
                            {/* <!-- End Messages Icon --> */}

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                                <li className="dropdown-header">
                                    You have 3 new messages
                                    <a><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="message-item">
                                    <a>
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
                                    <a>
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
                                    <a>
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
                                    <a>Show all messages</a>
                                </li>

                            </ul>
                            {/* <!-- End Messages Dropdown Items --> */}

                        </li>
                        {/* <!-- End Messages Nav --> */}

                        <li className="nav-item dropdown pe-3">

                            <a className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
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
                                    <a className="dropdown-item d-flex align-items-center">
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
                        <a className="nav-link collapsed" onClick={() => changePage('/')}>
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
                        <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" aria-expanded="true">
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
                        <ul id="components-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                            <li>
                                <a onClick={() => changePage('/informations/users')}>
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
                                <a onClick={() => changePage('/informations/notifications')}>
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
                                <a onClick={() => changePage('/informations/restaurants')}>
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
                                <a onClick={() => changePage('/informations/foods')}>
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
                                <a onClick={() => changePage('/informations/history-files')}>
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
                        <a className="nav-link" data-bs-target="#forms-nav" data-bs-toggle="collapse">
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
                        <ul id="forms-nav" className="nav-content collapse show" data-bs-parent="#sidebar-nav">
                            <li>
                                <a onClick={() => changePage('/incomes/discount')} className='active'>
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
                            <li>
                                <a onClick={() => changePage('/incomes/orders')}>
                                    <ReactSVG
                                        src={dot}
                                        className='nav-link-subicon dot'
                                    />
                                    <ReactSVG
                                        src={discount}
                                        className='nav-link-subicon'
                                    />
                                    <span>Orders</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    {/* <!-- End Income Nav --> */}

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse">
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
                                <a onClick={() => changePage('/reports/report-errors')}>
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
                                <a onClick={() => changePage('/reports/report-restaurants')}>
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
                                <a onClick={() => changePage('/reports/report-foods')}>
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
                                <a onClick={() => changePage('/reports/report-users')}>
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
                        <a className="nav-link collapsed" onClick={() => changePage('/informations/staffs')}>
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
                    <h1>Discount</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a>Income</a></li>
                            <li className="breadcrumb-item active">Discount</li>
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

                                {/* <!-- Tab Bar --> */}
                                <div className="col-12">

                                    <div className="card">
                                        <div className="card-body pt-3">

                                            {/* <!-- Bordered Tabs --> */}
                                            <ul className="nav nav-tabs nav-tabs-bordered">

                                                <li className="nav-item">
                                                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#event-list">Event list</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#event-edit">Event edit</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#create-event">Create event</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#coupon-edit">Coupon edit</button>
                                                </li>
                                            </ul>

                                            <div className="tab-content pt-2">

                                                {/*Event list*/}
                                                <div className="tab-pane fade show active" id="event-list">
                                                    <div className="tab-title search nav">
                                                        <h5 className="card-title">Events List</h5>
                                                        <div className="datatable-search">
                                                            <input className="datatable-input" placeholder="Search..." type="search" title="Search within table" />
                                                        </div>

                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    <a className="page-link" aria-label="Previous" style={{ cursor: 'pointer' }} onClick={() => {
                                                                        dispatchData({ type: 'SET_EVENT_PAGE', payload: 1 })
                                                                    }}>
                                                                        <span aria-hidden="true">«</span>
                                                                    </a>
                                                                </li>
                                                                {
                                                                    Array.from({ length: data.eventTotalPage }, (_, index) => {
                                                                        if (data.eventTotalPage > 10) {
                                                                            if ((index >= data.eventPage - 2 && index <= data.eventPage + 1) || // 2 pages before and after current page
                                                                                index >= data.eventTotalPage - 2) { // last 2 pages
                                                                                return (
                                                                                    <li className={`page-item ${data.eventPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                        <a className="page-link" onClick={() => dispatchData({ type: 'SET_EVENT_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                    </li>
                                                                                );
                                                                            }
                                                                        } else {
                                                                            return (
                                                                                <li className={`page-item ${data.eventPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                    <a className="page-link" onClick={() => dispatchData({ type: 'SET_EVENT_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    })
                                                                }
                                                                <li className="page-item">
                                                                    <a className="page-link" aria-label="Next" style={{ cursor: 'pointer' }} onClick={() => { dispatchData({ type: 'SET_EVENT_PAGE', payload: data.eventTotalPage }) }}>
                                                                        <span aria-hidden="true">»</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </nav>
                                                    </div>
                                                    <div className="table-responsive">

                                                        <table className="table table-hover table-vcenter">
                                                            <thead>
                                                                <tr key={'thead'}>
                                                                    <th>Title</th>
                                                                    {/* <th>Content</th> */}
                                                                    <th>Discount</th>
                                                                    <th>Start date</th>
                                                                    <th>End date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data?.events?.map((item, index) => (
                                                                    <tr
                                                                        key={item.Id}
                                                                        style={{ cursor: "pointer" }}
                                                                        onClick={() => { loadEventDetail(item.Id) }}
                                                                    >
                                                                        <td>{item.Title}</td>
                                                                        {/* <td>{item.Content}</td> */}
                                                                        <td>{item.Discount}</td>
                                                                        <td>{item.Start}</td>
                                                                        <td>{item.End}</td>

                                                                        {/* <td className="fw-bold">
  
                                                                            <button onClick={() => {
                                                                                console.log("resetPass");
                                                                                handleResetPass(adminID, item.Id);
                                                                            }}
                                                                                type="button" className="btn btn-outline-warning btn-sm" >Reset Pass</button>
                                                                        </td> */}
                                                                    </tr>
                                                                ))}
                                                            </tbody>

                                                        </table>

                                                    </div>
                                                </div>
                                                {/*End Event list*/}

                                                {/*Event edit*/}
                                                <div className="tab-pane fade" id="event-edit">
                                                    <div className="pt-4 pb-2 tab-title">
                                                        <h5 className="card-title text-center pb-0 fs-4">Edit Event</h5>
                                                        {/* <p className="text-center small">Enter information to create</p> */}
                                                    </div>

                                                    <form className='row g-3 needs-validation .update-event'>
                                                        <div className='col-12'>
                                                            <label htmlFor="eventTitle-edit" className="form-label">Event title</label>
                                                            <div className='input-group'>
                                                                <input type='text' className='form-control' id='eventTitle-edit' name='eventTitle-edit' required />
                                                            </div>
                                                            <div className='invalid-feedback'>Please enter Event title!</div>
                                                        </div>

                                                        <div className='col-12'>
                                                            <label htmlFor="eventContent-edit" className="form-label">Event content</label>
                                                            <div className='input-group'>
                                                                <textarea type='text' className='form-control' id='eventContent-edit' name='eventContent-edit' rows="5" required />
                                                            </div>
                                                            <div className='invalid-feedback'>Please enter Event content!</div>
                                                        </div>

                                                        <div className="col-12" >
                                                            <div className='row'>
                                                                <div className="col-3" >
                                                                    <label htmlFor="couponCode-edit" className="form-label">Coupon Code</label>
                                                                    <div className='input-group'>
                                                                        <input type='text' className='form-control' id='couponCode-edit' name='couponCode-edit' required maxLength={6} />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Please enter Coupon Code!</div>
                                                                </div>

                                                                <div className="col-3" >
                                                                    <label htmlFor="eventDiscount-edit" className="form-label">Discount (%)</label>
                                                                    <div className='input-group'>
                                                                        <input type='number' className='form-control' id='eventDiscount-edit' name='eventDiscount-edit' required maxLength={2} min={0} max={100} />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Please enter Discount!</div>
                                                                </div>

                                                                <div className="col-3" >
                                                                    <label htmlFor="typeCoupon-edit" className="form-label">Type</label>
                                                                    <select className="form-select" id="typeCoupon-edit" required onChange={(event) => { setTypeCouponEdit(event.target.value) }}>
                                                                        {
                                                                            typeCouponsList.map((item, index) => (
                                                                                <option key={index} value={item} defaultValue={index === 1}>{item}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>

                                                                <div className="col-3 " >
                                                                    <label htmlFor="couponAmount-edit" className="form-label" >Coupon amount</label>
                                                                    <div className='input-group'>
                                                                        <input type='numcer' className='form-control' id='couponAmount-edit' name='couponAmount-edit' required disabled={typeCouponEdit !== "Count"} />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Please enter Coupon amount!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12" >
                                                            <div className='row'>
                                                                <div className="col-6" >
                                                                    <label htmlFor="eventStart-edit" className="form-label">Start date</label>
                                                                    <div className='input-group'>
                                                                        <input type='datetime-local' className='form-control' id='eventStart-edit' name='eventStart-edit' required />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Please enter Start date!</div>
                                                                </div>

                                                                <div className="col-6 " >
                                                                    <label htmlFor="eventEnd-edit" className="form-label">End date</label>
                                                                    <div className='input-group'>
                                                                        <input type='datetime-local' className='form-control' id='eventEnd-edit' name='eventEnd-edit' required />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Please enter End date!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12">
                                                            <button className="btn btn-primary w-100" type="button" style={{ background: '#fd7e14', marginTop: 50, borderWidth: 0 }}
                                                                onClick={(event) => {
                                                                    console.log("press create admin");
                                                                    handleUpdateEvent(event, data?.eventEdit);
                                                                }}>Submit</button>
                                                        </div>
                                                    </form>
                                                </div>
                                                {/*End Event edit*/}

                                                {/*Create event*/}
                                                <div className="tab-pane fade" id="create-event">
                                                    <div className='row'>
                                                        <div className="col-2 pt-4 pb-2 ">
                                                            <div className="card-body text-center">
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={handleImageUpload}
                                                                    style={{ display: 'none' }}
                                                                    id="image-upload"
                                                                />
                                                                <label htmlFor="image-upload" className="btn" style={{ width: '100px', height: '100px', padding: 0, border: '2px solid orange' }} >
                                                                    {image ? (
                                                                        <img src={image} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                    ) : (
                                                                        <img src={avatar} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                    )}
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className="col-8">
                                                            <div className="pt-4 pb-2 tab-title">
                                                                <h5 className="card-title text-center pb-0 fs-4">Create Event</h5>
                                                                <p className="text-center small">Enter information to create</p>
                                                            </div>
                                                        </div>
                                                    </div>



                                                    <form className='row g-3 needs-validation create-event'>
                                                        <div className='col-12'>
                                                            <label htmlFor="eventTitle" className="form-label">Event title</label>
                                                            <div className='input-group'>
                                                                <input type='text' className='form-control' id='eventTitle' name='eventTitle' required />
                                                            </div>
                                                            <div className='invalid-feedback'>Please enter Event title!</div>
                                                        </div>

                                                        <div className='col-12'>
                                                            <label htmlFor="eventContent" className="form-label">Event content</label>
                                                            <div className='input-group'>
                                                                <textarea type='text' className='form-control' id='eventContent' name='eventContent' rows="5" required />
                                                            </div>
                                                            <div className='invalid-feedback'>Please enter Event content!</div>
                                                        </div>

                                                        <div className="col-12" >
                                                            <div className='row'>
                                                                <div className="col-3" >
                                                                    <label htmlFor="couponCode" className="form-label">Coupon Code</label>
                                                                    <div className='input-group'>
                                                                        <input type='text' className='form-control' id='couponCode' name='couponCode' required maxLength={6} />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Please enter Coupon Code!</div>
                                                                </div>

                                                                <div className="col-3" >
                                                                    <label htmlFor="eventDiscount" className="form-label">Discount (%)</label>
                                                                    <div className='input-group'>
                                                                        <input type='number' className='form-control' id='eventDiscount' name='eventDiscount' required maxLength={2} min={0} max={100} defaultValue={0} />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Please enter Discount!</div>
                                                                </div>

                                                                <div className="col-3" >
                                                                    <label htmlFor="typeCoupon" className="form-label">Type</label>
                                                                    <select className="form-select" id="typeCoupon" required onChange={(event) => { setTypeCoupon(event.target.value) }}>
                                                                        {
                                                                            typeCouponsList.map((item, index) => (
                                                                                <option key={index} value={item} defaultValue={index === 1}>{item}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>

                                                                <div className="col-3 " >
                                                                    <label htmlFor="couponAmount" className="form-label" >Coupon amount</label>
                                                                    <div className='input-group'>
                                                                        <input type='numcer' className='form-control' id='couponAmount' name='couponAmount' required disabled={typeCoupon !== "Count"} />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Please enter Coupon amount!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12" >
                                                            <div className='row'>
                                                                <div className="col-6" >
                                                                    <label htmlFor="eventStart" className="form-label">Start date</label>
                                                                    <div className='input-group'>
                                                                        <input type='datetime-local' className='form-control' id='eventStart' name='eventStart' required />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Please enter Start date!</div>
                                                                </div>

                                                                <div className="col-6 " >
                                                                    <label htmlFor="eventEnd" className="form-label">End date</label>
                                                                    <div className='input-group'>
                                                                        <input type='datetime-local' className='form-control' id='eventEnd' name='eventEnd' required />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Please enter End date!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12">
                                                            <button className="btn btn-primary w-100" type="button" style={{ background: '#fd7e14', marginTop: 50, borderWidth: 0 }}
                                                                onClick={(event) => {
                                                                    console.log("press create event");
                                                                    handleCreateEvent(event);

                                                                }}>Create</button>
                                                        </div>
                                                    </form>
                                                </div>
                                                {/*End Create event*/}

                                                {/*Coupon edit*/}
                                                <div className="tab-pane fade" id="coupon-edit">
                                                    <div className="pt-4 pb-2 tab-title">
                                                        <h5 className="card-title text-center pb-0 fs-4">Edit Coupon</h5>
                                                        {/* <p className="text-center small">Enter information to create</p> */}
                                                    </div>

                                                    <form className='row g-3 needs-validation'>
                                                        <div className='col-12'>
                                                            <label htmlFor="couponCode-editCoupon" className="form-label">Coupon Code</label>
                                                            <div className='input-group'>
                                                                <input type='text' className='form-control' id='couponCode-editCoupon' name='couponCode-editCoupon' required />
                                                            </div>
                                                            <div className='invalid-feedback'>Please enter Coupon Code!</div>
                                                        </div>

                                                        <div className="col-12" >
                                                            <div className='row'>
                                                                <div className="col-6" >
                                                                    <label htmlFor="couponDiscount-editCoupon" className="form-label">Discount (%)</label>
                                                                    <div className='input-group'>
                                                                        <input type='number' className='form-control' id='couponDiscount-editCoupon' name='couponDiscount-editCoupon' required min={0} max={100} />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Please enter Discount!</div>
                                                                </div>

                                                                <div className="col-3" >
                                                                    <label htmlFor="typeCoupon-editCoupon" className="form-label">Type</label>
                                                                    <select className="form-select" id="typeCoupon-editCoupon" required onChange={(event) => { setTypeCouponCouponEdit(event.target.value) }}>
                                                                        {
                                                                            typeCouponsList.map((item, index) => (
                                                                                <option key={index} value={item} defaultValue={index === 1}>{item}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>

                                                                <div className="col-3 " >
                                                                    <label htmlFor="couponAmount-editCoupon" className="form-label" >Coupon amount</label>
                                                                    <div className='input-group'>
                                                                        <input type='numcer' className='form-control' id='couponAmount-editCoupon' name='couponAmount-editCoupon' required disabled={typeCouponEdit !== "Count"} />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Please enter Coupon amount!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12" >
                                                            <div className='row'>
                                                                <div className="col-6" >
                                                                    <label htmlFor="couponStart-editCoupon" className="form-label">Start date</label>
                                                                    <div className='input-group'>
                                                                        <input type='datetime-local' className='form-control' id='couponStart-editCoupon' name='couponStart-editCoupon' required />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Please enter Start date!</div>
                                                                </div>

                                                                <div className="col-6 " >
                                                                    <label htmlFor="couponEnd-editCoupon" className="form-label">End date</label>
                                                                    <div className='input-group'>
                                                                        <input type='datetime-local' className='form-control' id='couponEnd-editCoupon' name='couponEnd-editCoupon' required />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Please enter End date!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12">
                                                            <button className="btn btn-primary w-100" type="button" style={{ background: '#fd7e14', marginTop: 50, borderWidth: 0 }}
                                                                onClick={(event) => {
                                                                    console.log("press create admin");
                                                                    // handleCreateAccount(event);

                                                                }}>Submit</button>
                                                        </div>
                                                    </form>
                                                </div>
                                                {/*End Coupon edit*/}

                                            </div>
                                            {/* <!-- End Bordered Tabs --> */}

                                        </div>
                                    </div>

                                </div>
                                {/* <!-- End Tab Bar --> */}


                            </div>
                        </div>
                        {/* <!-- End Left side columns --> */}


                        {/* <!-- Right side columns --> */}
                        <div className="col-lg-4">


                            {/* <!-- Event Detail --> */}
                            {
                                data?.eventDetail &&
                                <div className="card">
                                    <div className="filter" style={{ cursor: "pointer" }}>
                                        <a className="icon" data-bs-toggle="dropdown">
                                            <ReactSVG
                                                src={more}
                                            />
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                            <li className="dropdown-header text-start">
                                                <h6>Action</h6>
                                            </li>

                                            <li><button type="button" className="dropdown-item"

                                                onClick={() => {
                                                    setInfoEventEdit(data?.eventDetail);
                                                    setEventEdit(data?.eventDetail);
                                                    selectEventEditTab();
                                                }}>Edit</button></li>
                                        </ul>
                                    </div>

                                    <div className="card-body">
                                        <h5 className="card-title">Event Detail</h5>

                                        <dl className="detail">

                                            <div className="my-3 bg-light">
                                                <dt className="my-2 bg-info p-2">Title</dt>
                                                <dd className="ms-4 p-1 ">
                                                    {data?.eventDetail?.Title || " "}
                                                </dd>
                                            </div>

                                            {/* <!-- End detail item--> */}

                                            <div className="my-3 bg-light">
                                                <dt className="my-2 bg-info p-2" >Content</dt>
                                                <dd className="ms-4 p-1 ">
                                                    {data?.eventDetail?.Content || " "}
                                                </dd>
                                            </div>
                                            {/* <!-- End detail item--> */}

                                            <div className="my-3 bg-light">
                                                <dt className="my-2 bg-info p-2">Start</dt>
                                                <dd className="ms-4 p-1 ">
                                                    {data?.eventDetail?.Start || " "}
                                                </dd>
                                            </div>
                                            {/* <!-- End detail item--> */}

                                            <div className="my-3 bg-light">
                                                <dt className="my-2 bg-info p-2">End</dt>
                                                <dd className="ms-4 p-1 ">
                                                    {data?.eventDetail?.End || " "}
                                                </dd>
                                            </div>
                                            {/* <!-- End detail item--> */}

                                            <div className="my-3 bg-light">
                                                <dt className="my-2 bg-info p-2">Created At</dt>
                                                <dd className="ms-4 p-1 ">
                                                    {data?.eventDetail?.CreateAt || " "}
                                                </dd>
                                            </div>
                                            {/* <!-- End detail item--> */}
                                            <div className="my-3 bg-light">
                                                <dt className="my-2 bg-info p-2">Created By</dt>
                                                <dd className="d-flex align-items-center ms-4 p-1 ">
                                                    <img src={data?.eventDetail?.ImageCreateBy ? `http://${host}/uploads/${data?.eventDetail?.ImageCreateBy}.jpg` : avatar} alt="Avatar"
                                                        className="me-2" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                                                    <div>
                                                        <span>{data?.eventDetail?.CreateBy || " "}</span>
                                                        <span className="ms-2">|</span>
                                                        <span className="ms-2">{data?.eventDetail?.EmailCreateBy}</span>
                                                    </div>
                                                </dd>
                                            </div>

                                            {/* <!-- End detail item--> */}

                                            {
                                                data?.eventDetail?.UpdateAt &&
                                                <div className="my-3 bg-light">
                                                    <dt className="my-2 bg-info p-2">Update At</dt>
                                                    <dd className="ms-4 p-1 ">
                                                        {data?.eventDetail?.UpdateAt || " "}
                                                    </dd>
                                                </div>
                                            }
                                            {/* <!-- End detail item--> */}

                                            {
                                                data?.eventDetail?.UpdateBy &&
                                                <div className="my-3 bg-light">
                                                    <dt className="my-2 bg-info p-2">Update By</dt>
                                                    <dd className="d-flex align-items-center ms-4 p-1 ">
                                                        <img src={data?.eventDetail?.ImageUpdateBy ? `http://${host}/uploads/${data?.eventDetail?.ImageUpdateBy}.jpg` : avatar} alt="Avatar"
                                                            className="me-2" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                                                        <div>
                                                            <span>{data?.eventDetail?.UpdateBy || " "}</span>
                                                            <span className="ms-2">|</span>
                                                            <span className="ms-2">{data?.eventDetail?.EmailUpdateBy}</span>
                                                        </div>
                                                    </dd>
                                                </div>
                                            }
                                            {/* <!-- End detail item--> */}

                                            <div className="my-3 bg-light">
                                                <dt className="my-2 bg-info p-2">Coupon Code</dt>
                                                <dd className="ms-4 p-1 ">
                                                    {data?.eventDetail?.CouponCode || " "}
                                                </dd>
                                            </div>
                                            {/* <!-- End detail item--> */}

                                            <div className="my-3 bg-light">
                                                <dt className="my-2 bg-info p-2">Discount</dt>
                                                <dd className="ms-4 p-1 ">
                                                    {data?.eventDetail?.Discount + '(%)' || " "}
                                                </dd>
                                            </div>
                                            {/* <!-- End detail item--> */}

                                            <div className="my-3 bg-light">
                                                <dt className="my-2 bg-info p-2">Coupon Type</dt>
                                                <dd className="ms-4 p-1 ">
                                                    {data?.eventDetail?.Type || " "}
                                                </dd>
                                            </div>
                                            {/* <!-- End detail item--> */}
                                            {
                                                data?.eventDetail?.Amount !== -1 &&
                                                <div className="my-3 bg-light">
                                                    <dt className="my-2 bg-info p-2">Amount</dt>
                                                    <dd className="ms-4 p-1 ">
                                                        {data?.eventDetail?.Amount}
                                                    </dd>
                                                </div>
                                            }
                                            {/* <!-- End detail item--> */}

                                        </dl>

                                    </div>
                                </div>
                            }
                            {/* <!-- End Event Detail --> */}


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

export default Discounts