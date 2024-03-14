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
import restaurant_banned from '../assets/img/icons/restaurant_banned.svg';
import more from '../assets/img/icons/more.svg';
// Image
import avatar from '../assets/img/images/ex_avatar.png';

// Conponent
import React, { useEffect, useReducer, useRef } from 'react'
import { ReactSVG } from 'react-svg';
import ApexCharts from 'apexcharts';
import { Navigate, useNavigate, useHref } from 'react-router-dom';
import Swal from 'sweetalert2'
import AxiosInstance from '../helpers/AxiosInstance.js';

const Restaurants = () => {
    const host = '192.168.1.4';
    document.title = 'Informations - Restaurants';
    const chartRef = useRef(null);
    const Swal = require('sweetalert2');

    const initialState = {
        allRestaurants: [],
        topRestaurants: [],
        restaurantCmms: [],
        banRestaurants: [],
        topSaleItems: [],
        recentSale: [],

        allResPage: 1,
        topResPage: 1,
        resCmmPage: 1,
        banResPage: 1,
        topSalePage: 1,
        recentPage: 1,

        allResTotalPage: 1,
        topResTotalPage: 1,
        resCmmTotalPage: 1,
        banResTotalPage: 1,
        topSaleTotalPage: 1,
        recentTotalPage: 1,
    }
    const [data, dispatchData] = useReducer((state, action) => {
        switch (action.type) {
            case 'GET_ALL_RESTAURANT':
                return { ...state, allRestaurants: action.payload };
            case "GET_TOP_RESTAURANT":
                return { ...state, topRestaurants: action.payload };
            case "GET_RES_COMMENT":
                return { ...state, restaurantCmms: action.payload };
            case "GET_BANNED_RESTAURANT":
                return { ...state, banRestaurants: action.payload };
            case "GET_TOP_SALE_ITEMS":
                return { ...state, topSaleItems: action.payload };
            case "GET_RECENT_SALE":
                return { ...state, recentSale: action.payload };

            case "SET_ALL_REST_PAGE":
                return { ...state, allResPage: action.payload };
            case "SET_TOP_REST_PAGE":
                return { ...state, topResPage: action.payload };
            case "SET_RES_CMM_PAGE":
                return { ...state, resCmmPage: action.payload };
            case "SET_BANNED_RES_PAGE":
                return { ...state, banResPage: action.payload };
            case "SET_TOP_SALE_PAGE":
                return { ...state, topSalePage: action.payload };
            case "SET_RECENT_SALE_PAGE":
                return { ...state, recentPage: action.payload };

            case "SET_ALL_REST_TOTALPAGE":
                return { ...state, allResTotalPage: action.payload };
            case "SET_TOP_REST_TOTALPAGE":
                return { ...state, topResTotalPage: action.payload };
            case "SET_RES_CMM_TOTALPAGE":
                return { ...state, resCmmTotalPage: action.payload };
            case "SET_BANNED_RES_TOTALPAGE":
                return { ...state, banResTotalPage: action.payload };
            case "SET_TOP_SALE_TOTALPAGE":
                return { ...state, topSaleTotalPage: action.payload };
            case "SET_RECENT_SALE_TOTALPAGE":
                return { ...state, recentTotalPage: action.payload };

            default:
                return state;
        }
    }, initialState);


    {/** Start of get all restaurants */ }

    async function loadAllRes() {
        let response = await AxiosInstance().get('getAll-res.php');
        const length = response.data.length;

        const foodPerPage = response.data.slice(data.allResPage * 5 - 5, data.allResPage * 5);;
        let list = await Promise.all(foodPerPage.map(async res => {
            let db = {};
            db.data = res;
            const picture = await AxiosInstance().get('/get-image.php', { params: { id: res.Id } });
            db.image = picture.img;
            const foods = await AxiosInstance().get('/get-foods.php', { params: { id: res.Id } });
            db.food = foods.foods; // Assuming foods is the response object from Axios
            return db;
        }));
        dispatchData({ type: 'GET_ALL_RESTAURANT', payload: list });
        dispatchData({ type: 'SET_ALL_REST_TOTALPAGE', payload: (Math.ceil(length / 5)) });
    }

    useEffect(() => {
        loadAllRes()
    }, [data.allResPage])

    {/** End of get all restaurants */ }

    {/** Start of get top restaurants */ }

    async function loadTopRes() {
        let response = await AxiosInstance().get('getAll-res.php')
        const res = response.data;

        let list = await Promise.all(res.map(async res => {
            let db = {};
            const allOrders = await AxiosInstance().get('/get-all-res-order.php', { params: { id: res.Id } });
            db.data = allOrders.orders;
            const picture = await AxiosInstance().get('/get-image.php', { params: { id: res.Id } });
            db.image = picture.img;
            const foods = await AxiosInstance().get('/get-foods.php', { params: { id: res.Id } });
            db.food = foods.foods;
            db.name = res.Name;
            db.email = res.Email;

            return db;
        })).then(list => list.map((res) => {
            const revenue = res.data.reduce((sum, order) => sum + Number(order.Price), 0);
            return { ...res, revenue };
        }).sort((a, b) => b.revenue - a.revenue).slice(data.topResPage * 5 - 5, data.topResPage * 5));

        dispatchData({ type: 'GET_TOP_RESTAURANT', payload: list });
        dispatchData({ type: 'SET_TOP_REST_TOTALPAGE', payload: (Math.ceil(res.length / 5)) });
    }

    useEffect(() => {
        loadTopRes()
    }, [data.topResPage])

    {/** End of get top restaurants */ }

    {/** Start of get banned restaurants */ }

    async function loadBanRes() {
        let response = await AxiosInstance().get('/get-banned-res.php');
        const length = response.res.length;
        const resPerPage = response.res.slice(data.banResPage * 5 - 5, data.banResPage * 5);
        let list = await Promise.all(resPerPage.map(async res => {
            let db = {};
            db.data = res;
            const picture = await AxiosInstance().get('/get-image.php', { params: { id: res.Id } });
            db.image = picture.img;
            return db;
        }));
        dispatchData({ type: 'GET_BANNED_RESTAURANT', payload: list });
        dispatchData({ type: 'SET_BANNED_RES_TOTALPAGE', payload: (Math.ceil(length / 5)) });
    }

    async function unBanRestaurant(resID, name) {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to unban ${name} restaurant?`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            preConfirm: async () => {
                try {
                    const response = await AxiosInstance().post('unbanned-res.php', { id: resID });
                    loadBanRes();
                } catch (error) {
                    Swal.fire('Error', error.message, 'error');
                }

            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    text: `${name} has been removed out of banned users`
                })
            }
        })
    }

    useEffect(() => {
        loadBanRes()
    }, [data.banResPage])

    {/** End of get banned restaurants */ }

    {/** Start of get top selling */ }

    const loadTopSelling = async () => {
        const response = await AxiosInstance().get('/get-top-selling-items.php');
        const items = response.data;
        const itemPerPage = items.slice(data.topSalePage * 5 - 5, data.topSalePage * 5);

        const list = await Promise.all(itemPerPage.map(async (res) => {
            const obj = {};
            const image = await AxiosInstance().get('/get-image.php', { params: { id: res.Id } });
            obj.image = image.img;
            obj.data = res;
            return obj
        }));

        dispatchData({ type: "GET_TOP_SALE_ITEMS", payload: list });
        dispatchData({ type: "SET_TOP_SALE_TOTALPAGE", payload: (Math.ceil(items.length / 5)) })
    }

    useEffect(() => {
        loadTopSelling()
    }, [data.topSalePage]);

    {/** End of get top selling */ }

    {/** Start of get recent sale */ }

    const loadRecentSale = async () => {
        const respsonse = await AxiosInstance().get('/get-recent-order.php');
        const order = respsonse.data;
        const orderPerPage = order.slice(data.recentPage * 5 - 5, data.recentPage * 5);

        console.log("orderPerPage", orderPerPage)

        dispatchData({ type: "GET_RECENT_SALE", payload: orderPerPage });
        dispatchData({ type: "SET_RECENT_SALE_TOTALPAGE", payload: (Math.ceil(order.length / 5)) })
    }

    useEffect(() => {
        loadRecentSale()
    }, [data.recentPage])

    {/** End of get recent sale */ }

    {/** Start of data board */ }

    useEffect(() => {
        let chart;
        if (chartRef.current) {
            chart = new ApexCharts(document.getElementById("reportsChart"), {
                series: [{
                    name: 'New Restaurants',
                    data: [31, 40, 28, 51, 42, 82, 56],
                }, {
                    name: 'Revenue',
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

    {/** End of data board */ }

    const navigate = useNavigate();

    const changePage = (path) => {
        navigate(path);
    }
    return (
        <div className=''>

            {/* <!-- ======= Header ======= --> */}
            <header id="header" className="header fixed-top d-flex align-items-center">

                <div className="d-flex align-items-center justify-content-between">
                    <img src={logo} alt="Orangic Logo" />
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
                                <a href='/informations/users' onClick={() => changePage('/informations/users')}>
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
                                <a href="#">
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
                                <a href='/informations/restaurants' onClick={() => changePage('/informations/restaurants')} className='active'>
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
                                <a href='/informations/foods' onClick={() => changePage('/informations/foods')}>
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
                                <a href="#">
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
                                <a href="#">
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
                                <a href="#">
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
                                <a href="#">
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
                                <a href='/errors/report-restaurants' onClick={() => changePage('/errors/report-restaurants')}>
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
                                <a href='/errors/report-foods' onClick={() => changePage('/errors/report-foods')}>
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
                                <a href='/errors/report-users' onClick={() => changePage('/errors/report-users')}>
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
                    <h1>Restaurant Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Informations</a></li>
                            <li className="breadcrumb-item active">Restaurants</li>
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


                                {/* <!-- New Restaurant Card --> */}
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card left-card">

                                        <div className="filter">
                                            <a className="icon" href="#" data-bs-toggle="dropdown">
                                                <ReactSVG
                                                    src={more}
                                                />
                                            </a>
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
                                            <h5 className="card-title">Restaurants <span>| Today</span></h5>

                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <ReactSVG
                                                        src={restaurant}
                                                        className='left-icon'
                                                    />
                                                </div>
                                                <div className="ps-3">
                                                    <h6>145</h6>
                                                    <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* <!-- End New Restaurants Card --> */}


                                {/* <!-- Revenue Card --> */}
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card middle-card">

                                        <div className="filter">
                                            <a className="icon" href="#" data-bs-toggle="dropdown">
                                                <ReactSVG
                                                    src={more}
                                                />
                                            </a>
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
                                            <h5 className="card-title">Revenue <span>| Total</span></h5>

                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <ReactSVG
                                                        src={income}
                                                        className='middle-icon'
                                                    />
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


                                {/* <!-- Users Banned Card --> */}
                                <div className="col-xxl-4 col-xl-12">

                                    <div className="card info-card right-card">

                                        <div className="filter">
                                            <a className="icon" href="#" data-bs-toggle="dropdown">
                                                <ReactSVG
                                                    src={more}
                                                />
                                            </a>
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
                                                    <ReactSVG
                                                        src={restaurant_banned}
                                                        className='right-icon'
                                                    />
                                                </div>
                                                <div className="ps-3">
                                                    <h6>1244</h6>
                                                    <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                {/* <!-- End Users Banned Card --> */}


                                {/* <!-- Reports --> */}
                                <div className="col-12">
                                    <div className="card">

                                        <div className="filter">
                                            <a className="icon" href="#" data-bs-toggle="dropdown">
                                                <ReactSVG
                                                    src={more}
                                                />
                                            </a>
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

                                        </div>

                                    </div>
                                </div>
                                {/* <!-- End Reports --> */}

                                {/* <!-- Tab Bar --> */}
                                <div className="col-12">

                                    <div className="card">
                                        <div className="card-body pt-3">

                                            {/* <!-- Bordered Tabs --> */}
                                            <ul className="nav nav-tabs nav-tabs-bordered">

                                                <li className="nav-item">
                                                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">List</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Leader Board</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">Comments</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Banned</button>
                                                </li>

                                            </ul>
                                            <div className="tab-content pt-2">

                                                {/* <!-- Restaurant List Table --> */}
                                                <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                                    <div className="tab-title search nav">
                                                        <h5 className="card-title">Restaurants List</h5>
                                                        <div className="datatable-search">
                                                            <input className="datatable-input" placeholder="Search..." type="search" title="Search within table" />
                                                        </div>

                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    <a className="page-link" href="#" aria-label="Previous">
                                                                        <span aria-hidden="true">«</span>
                                                                    </a>
                                                                </li>
                                                                {
                                                                    Array.from({ length: data.allResTotalPage }, (_, index) => {
                                                                        if (data.allResTotalPage > 10) {
                                                                            if ((index >= data.allResPage - 2 && index <= data.allResPage + 1) || // 2 pages before and after current page
                                                                                index >= data.allResTotalPage - 2) { // last 2 pages
                                                                                return (
                                                                                    <li className={`page-item ${data.allResPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                        <a className="page-link" onClick={() => dispatchData({ type: 'SET_ALL_REST_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                    </li>
                                                                                );
                                                                            }
                                                                        } else {
                                                                            return (
                                                                                <li className={`page-item ${data.allResPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                    <a className="page-link" onClick={() => dispatchData({ type: 'SET_ALL_REST_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    })
                                                                }
                                                                <li className="page-item">
                                                                    <a className="page-link" href="#" aria-label="Next">
                                                                        <span aria-hidden="true">»</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </nav>
                                                    </div>

                                                    <table className="table table-borderless"
                                                        style={{ textAlign: 'start' }}
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" style={{ textAlign: 'center' }}>Image</th>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">Email</th>
                                                                <th scope="col">Foods</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                data.allRestaurants.map((res, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <th scope="row"><a href="#"><img src={res.image.length != 0 ? `http://${host}:8686/uploads/${res.image[0].Id}.jpg` : avatar} style={{ width: 60, height: 50, resize: 'initial' }} alt="" className="avatar" /></a></th>
                                                                            <td><a href="#" className="fw-bold" style={{ color: 'orange' }}>{res.data.Name}</a></td>
                                                                            <td>{res.data.Email}</td>
                                                                            <td className="fw-bold">{res.food.length}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>

                                                </div>
                                                {/* <!-- End Restaurants List Tab --> */}

                                                {/* <!-- Leader Board Table --> */}


                                                <div className="tab-pane fade profile-edit pt-3" id="profile-edit">

                                                    <div className="filter">
                                                        <a className="icon" href="#" data-bs-toggle="dropdown">
                                                            <ReactSVG
                                                                src={more}
                                                            />
                                                        </a>
                                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                            <li className="dropdown-header text-start">
                                                                <h6>Filter</h6>
                                                            </li>

                                                            <li><a className="dropdown-item" href="#">Today</a></li>
                                                            <li><a className="dropdown-item" href="#">This Month</a></li>
                                                            <li><a className="dropdown-item" href="#">This Year</a></li>
                                                        </ul>
                                                    </div>

                                                    <h5 className="card-title">Restaurants Leader Board <span>| Today</span></h5>
                                                    <table className="table table-borderless"
                                                        style={{ textAlign: 'start' }}
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Image</th>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">Email</th>
                                                                <th scope="col">Foods</th>
                                                                <th scope="col">Orders</th>
                                                                <th scope="col">Revenue</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {
                                                                data.topRestaurants
                                                                    .map((res, index) => (
                                                                        <tr key={index}>
                                                                            <th scope="row"><a href="#"><img src={res.image.length != 0 ? `http://${host}:8686/uploads/${res.image[0].Id}.jpg` : avatar} style={{ width: 60, height: 50, resize: 'initial' }} alt="" className="avatar" /></a></th>
                                                                            <td><a href="#" className="fw-bold" style={{ color: 'orange' }}>{res.name}</a></td>
                                                                            <td>{res.email}</td>
                                                                            <td className="fw-bold" style={{ textAlign: 'center' }}>{res.food.length}</td>
                                                                            <td className="fw-bold" style={{ textAlign: 'center' }}>{res.data.length}</td>
                                                                            <td className="fw-bold" style={{ textAlign: 'center' }}>{res.revenue}</td>
                                                                        </tr>
                                                                    ))
                                                            }
                                                        </tbody>
                                                    </table>

                                                    <nav aria-label="Page navigation example" style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <ul className="pagination">
                                                            <li className="page-item">
                                                                <a className="page-link" href="#" aria-label="Previous">
                                                                    <span aria-hidden="true">«</span>
                                                                </a>
                                                            </li>
                                                            {
                                                                Array.from({ length: data.topResTotalPage }, (_, index) => {
                                                                    if (data.topResTotalPage > 10) {
                                                                        if ((index >= data.topResPage - 2 && index <= data.topResPage + 1) || // 2 pages before and after current page
                                                                            index >= data.topResTotalPage - 2) { // last 2 pages
                                                                            return (
                                                                                <li className={`page-item ${data.topResPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                    <a className="page-link" onClick={() => dispatchData({ type: 'SET_TOP_REST_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    } else {
                                                                        return (
                                                                            <li className={`page-item ${data.topResPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                <a className="page-link" onClick={() => dispatchData({ type: 'SET_TOP_REST_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                            </li>
                                                                        );
                                                                    }
                                                                })
                                                            }
                                                            <li className="page-item">
                                                                <a className="page-link" href="#" aria-label="Next">
                                                                    <span aria-hidden="true">»</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                    {/* <!-- End Leader Board Table --> */}

                                                </div>

                                                <div className="tab-pane fade pt-3" id="profile-settings">

                                                    {/* <!-- Comment Table --> */}
                                                    <div className="tab-title search nav">
                                                        <div className="datatable-search">
                                                            <input className="datatable-input" placeholder="Search..." type="search" title="Search within table" />
                                                        </div>

                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    <a className="page-link" href="#" aria-label="Previous">
                                                                        <span aria-hidden="true">«</span>
                                                                    </a>
                                                                </li>
                                                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                                <li className="page-item"><a className="page-link" href="#">4</a></li>
                                                                <li className="page-item"><a className="page-link" href="#">5</a></li>
                                                                <li className="page-item"><a className="page-link" href="#">6</a></li>
                                                                <li className="page-item"><a className="page-link" href="#">7</a></li>
                                                                <li className="page-item">
                                                                    <a className="page-link" href="#" aria-label="Next">
                                                                        <span aria-hidden="true">»</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </nav>
                                                    </div>
                                                    {/* <!-- End Comment Table --> */}

                                                    <h5 className="card-title">Nothing</h5>


                                                </div>

                                                <div className="tab-pane fade pt-3" id="profile-change-password">

                                                    {/* <!-- Banned Table --> */}
                                                    <div className="tab-title search nav">
                                                        <h5 className="card-title">Banned</h5>
                                                        <div className="datatable-search">
                                                            <input className="datatable-input" placeholder="Search..." type="search" title="Search within table" />
                                                        </div>

                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    <a className="page-link" href="#" aria-label="Previous">
                                                                        <span aria-hidden="true">«</span>
                                                                    </a>
                                                                </li>
                                                                {
                                                                    Array.from({ length: data.banResTotalPage }, (_, index) => {
                                                                        if (data.banResTotalPage > 10) {
                                                                            if ((index >= data.banResPage - 2 && index <= data.banResPage + 1) || // 2 pages before and after current page
                                                                                index >= data.banResTotalPage - 2) { // last 2 pages
                                                                                return (
                                                                                    <li className={`page-item ${data.banResPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                        <a className="page-link" onClick={() => dispatchData({ type: 'SET_BAN_REST_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                    </li>
                                                                                );
                                                                            }
                                                                        } else {
                                                                            return (
                                                                                <li className={`page-item ${data.banResPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                    <a className="page-link" onClick={() => dispatchData({ type: 'SET_BAN_REST_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    })
                                                                }
                                                                <li className="page-item">
                                                                    <a className="page-link" href="#" aria-label="Next">
                                                                        <span aria-hidden="true">»</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </nav>
                                                    </div>

                                                    <table className="table table-borderless"
                                                        style={{ textAlign: 'start' }}
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Image</th>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">Email</th>
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                data.banRestaurants.map((res, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <th scope="row" style={{ textAlign: 'center' }}><a href="#"><img src={res.image.length != 0 ? `http://${host}:8686/uploads/${res.image[0].Id}.jpg` : avatar} style={{ width: 60, height: 50, resize: 'initial' }} alt="" className="avatar" /></a></th>
                                                                            <td><a href="#" className="text-primary fw-bold">{res.data.Name}</a></td>
                                                                            <td>{res.data.Email}</td>
                                                                            <td>
                                                                                <button type="button" className="btn btn-warning btn-sm" onClick={() => unBanRestaurant(res.data.Id)}>UnBan</button>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                    {/* <!-- End Change Password Form --> */}

                                                </div>

                                            </div>
                                            {/* <!-- End Bordered Tabs --> */}

                                        </div>
                                    </div>

                                </div>
                                {/* <!-- End Tab Bar --> */}

                                {/* <!-- Top Selling --> */}
                                <div className="col-12">
                                    <div className="card top-selling overflow-auto">

                                        <div className="filter">
                                            <a className="icon" href="#" data-bs-toggle="dropdown">
                                                <ReactSVG
                                                    src={more}
                                                />
                                            </a>
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

                                            <table className="table table-borderless"
                                                style={{ textAlign: 'start' }}
                                            >
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Image</th>
                                                        <th scope="col">Food Name</th>
                                                        <th scope="col">Restaurant Name</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Orders</th>
                                                        <th scope="col">Revenue</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data.topSaleItems.map((res) => {
                                                            return (
                                                                <tr key={res.data.Id}>
                                                                    <th scope="row"><a href="#"><img src={res.image.length != 0 ? `http://${host}:8686/uploads/${res.image[0].Id}.jpg` : avatar} style={{ width: 50, height: 40, resize: 'initial' }} alt="" className="avatar" /></a></th>
                                                                    <td><a href="#" className="fw-bold" style={{ color: 'orange' }}>{res.data.FoodName}</a></td>
                                                                    <td>{res.data.RestaurantName}</td>
                                                                    <td className="fw-bold" style={{ textAlign: 'center' }}>{res.data.Price}</td>
                                                                    <td className="fw-bold" style={{ textAlign: 'center' }}>{res.data.Sold}</td>
                                                                    <td className="fw-bold" style={{ textAlign: 'center' }}>{res.data.Orders}</td>
                                                                    <td className="fw-bold" style={{ textAlign: 'center' }}>{res.data.Revenue}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>

                                            <nav aria-label="Page navigation example" style={{ float: 'right' }}>
                                                <ul className="pagination">
                                                    <li className="page-item">
                                                        <a className="page-link" href="#" aria-label="Previous">
                                                            <span aria-hidden="true">«</span>
                                                        </a>
                                                    </li>
                                                    {
                                                        Array.from({ length: data.topSaleTotalPage }, (_, index) => {
                                                            if (data.topSaleTotalPage > 10) {
                                                                if ((index >= data.topSalePage - 2 && index <= data.topSalePage + 1) || // 2 pages before and after current page
                                                                    index >= data.topSaleTotalPage - 2) { // last 2 pages
                                                                    return (
                                                                        <li className={`page-item ${data.topSalePage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                            <a className="page-link" onClick={() => dispatchData({ type: 'SET_TOP_SALE_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                        </li>
                                                                    );
                                                                }
                                                            } else {
                                                                return (
                                                                    <li className={`page-item ${data.topSalePage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                        <a className="page-link" onClick={() => dispatchData({ type: 'SET_TOP_SALE_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                    </li>
                                                                );
                                                            }
                                                        })
                                                    }
                                                    <li className="page-item">
                                                        <a className="page-link" href="#" aria-label="Next">
                                                            <span aria-hidden="true">»</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </nav>

                                        </div>

                                    </div>

                                </div>
                                {/* <!-- End Top Selling --> */}

                                {/* <!-- Recent Sales --> */}
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">

                                        <div className="filter">
                                            <a className="icon" href="#" data-bs-toggle="dropdown">
                                                <ReactSVG
                                                    src={more}
                                                />
                                            </a>
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

                                            <table className="table table-borderless"
                                                style={{ textAlign: 'start' }}
                                            >
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Item Name</th>
                                                        <th scope="col">Restaurant's Name</th>
                                                        <th scope="col">Items</th>
                                                        <th scope="col">Revenue</th>
                                                        <th scope="col">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data.recentSale.map((res) => {
                                                            return (
                                                                <tr>
                                                                    <td><a href="#" className="text-primary fw-bold">{res.FoodName}</a></td>
                                                                    <td>{res.RestaurantName}</td>
                                                                    <td className="fw-bold">{res.Quantity}</td>
                                                                    <td className="fw-bold">{res.Price}</td>
                                                                    <td className="fw-bold">{res.Status}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>

                                            <nav aria-label="Page navigation example" style={{ float: 'right' }}>
                                                <ul className="pagination">
                                                    <li className="page-item">
                                                        <a className="page-link" href="#" aria-label="Previous">
                                                            <span aria-hidden="true">«</span>
                                                        </a>
                                                    </li>
                                                    {
                                                        Array.from({ length: data.recentTotalPage }, (_, index) => {
                                                            if (data.recentTotalPage > 10) {
                                                                if ((index >= data.recentPage - 2 && index <= data.recentPage + 1) || // 2 pages before and after current page
                                                                    index >= data.recentTotalPage - 2) { // last 2 pages
                                                                    return (
                                                                        <li className={`page-item ${data.recentPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                            <a className="page-link" onClick={() => dispatchData({ type: 'SET_RECENT_SALE_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                        </li>
                                                                    );
                                                                }
                                                            } else {
                                                                return (
                                                                    <li className={`page-item ${data.recentPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                        <a className="page-link" onClick={() => dispatchData({ type: 'SET_RECENT_SALE_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                    </li>
                                                                );
                                                            }
                                                        })
                                                    }
                                                    <li className="page-item">
                                                        <a className="page-link" href="#" aria-label="Next">
                                                            <span aria-hidden="true">»</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </nav>

                                        </div>

                                    </div>
                                </div>
                                {/* <!-- End Recent Sales --> */}

                            </div>
                        </div>
                        {/* <!-- End Left side columns --> */}


                        {/* <!-- Right side columns --> */}
                        <div className="col-lg-4">


                            {/* <!-- Recent Activity --> */}
                            <div className="card">
                                <div className="filter">
                                    <a className="icon" href="#" data-bs-toggle="dropdown">
                                        <ReactSVG
                                            src={more}
                                            className='nav-link-icon'
                                        />
                                    </a>
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
                                            <div className="activity-content">
                                                Quia quae rerum <a href="#" className="fw-bold text-dark">explicabo officiis</a> beatae
                                            </div>
                                        </div>
                                        {/* <!-- End activity item--> */}

                                        <div className="activity-item d-flex">
                                            <div className="activite-label">56 min</div>
                                            <div className="activity-content">
                                                Voluptatem blanditiis blanditiis eveniet
                                            </div>
                                        </div>
                                        {/* <!-- End activity item--> */}

                                        <div className="activity-item d-flex">
                                            <div className="activite-label">2 hrs</div>
                                            <div className="activity-content">
                                                Voluptates corrupti molestias voluptatem
                                            </div>
                                        </div>
                                        {/* <!-- End activity item--> */}

                                        <div className="activity-item d-flex">
                                            <div className="activite-label">1 day</div>
                                            <div className="activity-content">
                                                Tempore autem saepe <a href="#" className="fw-bold text-dark">occaecati voluptatem</a> tempore
                                            </div>
                                        </div>
                                        {/* <!-- End activity item--> */}

                                        <div className="activity-item d-flex">
                                            <div className="activite-label">2 days</div>
                                            <div className="activity-content">
                                                Est sit eum reiciendis exercitationem
                                            </div>
                                        </div>
                                        {/* <!-- End activity item--> */}

                                        <div className="activity-item d-flex">
                                            <div className="activite-label">4 weeks</div>
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
        </div>
    )
}

export default Restaurants