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
import more from '../assets/img/icons/more.svg';
import food_banned from '../assets/img/icons/food_banned.svg'
import sold from '../assets/img/icons/sold.svg'
// Image
import avatar from '../assets/img/images/ex_avatar.png';

// Conponent
import React, { useEffect, useReducer, useRef } from 'react'
import { Navigate, useNavigate, useHref } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import ApexCharts from 'apexcharts';
import AxiosInstance from '../helpers/AxiosInstance.js';


const HistoryFiles = (prop) => {
    const { host, adminID, setID, adminDetail } = prop;

    document.title = 'Informations - Foods';
    const chartRef = useRef(null);

    const navigate = useNavigate();

    const changePage = (link) => {
        navigate(link);
    };

    const logOut = () => {
        console.log("log out");
        setID('');
    }

    const initialState = {
        allFood: [],
        topFood: [],
        foodCMM: [],
        banFood: [],
        recentSales: [],
        failOrders: [],

        allFoodPage: 1,
        topFoodPage: 1,
        foodCMMPage: 1,
        banFoodPage: 1,
        recentSalesPage: 1,
        failOrdersPage: 1,

        allFoodTotalPage: 1,
        topFoodTotalPage: 1,
        foodCMMTotalPage: 1,
        banFoodTotalPage: 1,
        recentSalesTotalPage: 1,
        failOrdersTotalPage: 1
    }

    const [data, dispatchData] = useReducer((state, action) => {
        switch (action.type) {
            case "GET_ALL_FOOD":
                return { ...state, allFood: action.payload }
            case "GET_TOP_FOOD":
                return { ...state, topFood: action.payload }
            case "GET_FOOD_CMM":
                return { ...state, foodCMM: action.payload }
            case "GET_BAN_FOOD":
                return { ...state, banFood: action.payload }
            case "GET_RECENT_SALES":
                return { ...state, recentSales: action.payload }
            case "GET_FAIL_ORDERS":
                return { ...state, failOrders: action.payload }

            case "SET_ALL_FOOD_PAGE":
                return { ...state, allFoodPage: action.payload }
            case "SET_TOP_FOOD_PAGE":
                return { ...state, topFoodPage: action.payload }
            case "SET_FOOD_CMM_PAGE":
                return { ...state, foodCMMPage: action.payload }
            case "SET_BAN_FOOD_PAGE":
                return { ...state, banFoodPage: action.payload }
            case "SET_RECENT_SALES_PAGE":
                return { ...state, recentSalesPage: action.payload }
            case "SET_FAIL_ORDERS_PAGE":
                return { ...state, failOrdersPage: action.payload }

            case "SET_ALL_FOOD_TOTAL_PAGE":
                return { ...state, allFoodTotalPage: action.payload }
            case "SET_TOP_FOOD_TOTAL_PAGE":
                return { ...state, topFoodTotalPage: action.payload }
            case "SET_FOOD_CMM_TOTAL_PAGE":
                return { ...state, foodCMMTotalPage: action.payload }
            case "SET_BAN_FOOD_TOTAL_PAGE":
                return { ...state, banFoodTotalPage: action.payload }
            case "SET_RECENT_SALES_TOTAL_PAGE":
                return { ...state, recentSalesTotalPage: action.payload }
            case "SET_FAIL_ORDERS_TOTAL_PAGE":
                return { ...state, failOrdersTotalPage: action.payload }
        }
    }, initialState)

    {/** Start of getting food list */ }

    const loadAllFood = async () => {
        const response = await AxiosInstance().get('/get-all-foods.php');
        const foods = response.data;

        const foodPerPage = foods.slice(data.allFoodPage * 5 - 5, data.allFoodPage * 5);
        // const list = await Promise.all(foodPerPage.map(async (res) => {
        //     const obj = {};
        //     obj.data = res
        //     const imgaes = await AxiosInstance().get('/get-image.php', { params: { id: res.Id } });
        //     obj.image = imgaes.img;
        //     return obj;
        // }))

        dispatchData({ type: "GET_ALL_FOOD", payload: foodPerPage });
        dispatchData({ type: "SET_ALL_FOOD_TOTAL_PAGE", payload: Math.ceil((foods.length / 5)) })

    }

    useEffect(() => {
        loadAllFood()
    }, [data.allFoodPage])

    {/** End of getting food list */ }

    {/** Start of getting top food list */ }

    const loadTopFood = async () => {
        const response = await AxiosInstance().get('/get-all-popular-foods-admin.php');
        const foods = response.data;
        console.log(foods)
        const foodPerPage = foods.slice(data.topFoodPage * 5 - 5, data.topFoodPage * 5);

        dispatchData({ type: "GET_TOP_FOOD", payload: foodPerPage });
        dispatchData({ type: "SET_TOP_FOOD_TOTAL_PAGE", payload: Math.ceil((foods.length / 5)) })
    }

    useEffect(() => {
        loadTopFood()
    }, [data.topFoodPage])

    {/** End of getting top food list */ }

    {/** Start of getting banned foods */ }

    const loadBanFood = async () => {
        const response = await AxiosInstance().get('/get-all-banned-foods.php');
        const foods = response.data;

        console.log(foods)

        const foodPerPage = foods.slice(data.banFoodPage * 5 - 5, data.banFoodPage * 5);

        dispatchData({ type: "GET_BAN_FOOD", payload: foodPerPage });
        dispatchData({ type: "SET_BAN_FOOD_TOTAL_PAGE", payload: Math.ceil((foods.length / 5)) })
    }

    useEffect(() => {
        loadBanFood()
    }, [data.banFoodPage])

    {/** End of getting banned foods */ }

    {/** Start of getting recent sales */ }

    const loadRecentSales = async () => {
        const response = await AxiosInstance().get('/get-all-recent-sales.php');
        const foods = response.data;

        const foodPerPage = foods.slice(data.recentSalesPage * 5 - 5, data.recentSalesPage * 5);

        dispatchData({ type: "GET_RECENT_SALES", payload: foodPerPage });
        dispatchData({ type: "SET_RECENT_SALES_TOTAL_PAGE", payload: Math.ceil((foods.length / 5)) })
    }

    useEffect(() => {
        loadRecentSales()
    }, [data.recentSalesPage])

    {/** Start of getting recent sales */ }

    {/** Start of getting FAIL sales */ }

    const loadFailOrders = async () => {
        const response = await AxiosInstance().get('/get-all-fail-orders.php');
        const foods = response.data;

        const foodPerPage = foods.slice(data.failOrdersPage * 5 - 5, data.failOrdersPage * 5);
        console.log("Fail order", foodPerPage);

        dispatchData({ type: "GET_FAIL_ORDERS", payload: foodPerPage });
        dispatchData({ type: "SET_FAIL_ORDERS_TOTAL_PAGE", payload: Math.ceil((foods.length / 5)) })
        console.log(data.failOrdersTotalPage);
    }

    useEffect(() => {
        loadFailOrders()
    }, [data.recentSalesPage])

    {/** End of getting FAIL sales */ }


    {/** Start of data board */ }

    useEffect(() => {
        let chart;
        if (chartRef.current) {
            chart = new ApexCharts(document.getElementById("reportsChart"), {
                series: [{
                    name: 'Nhà hàng mới',
                    data: [31, 40, 28, 51, 42, 82, 56],
                }, {
                    name: 'Doanh thu',
                    data: [11, 32, 45, 32, 34, 52, 41]
                }, {
                    name: 'Bị cấm',
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
                        <input type="text" name="query" placeholder="Tìm..." title="Nhập từ khóa tìm kiếm" />
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
                                    Bạn có 4 thông báo mới
                                    <a><span className="badge rounded-pill bg-primary p-2 ms-2">Xem tất cả</span></a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="notification-item">
                                    <i className="bi bi-exclamation-circle text-warning"></i>
                                    <div>
                                        <h4>Lorem Ipsum</h4>
                                        <p>Tôi ghét nỗi đau của sự thật của họ</p>
                                        <p>30 phút trước</p>
                                    </div>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="notification-item">
                                    <i className="bi bi-x-circle text-danger"></i>
                                    <div>
                                        <h4>Atque rerum nesciunt</h4>
                                        <p>Tôi ghét nỗi đau của sự thật của họ</p>
                                        <p>1 giờ trước</p>
                                    </div>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="notification-item">
                                    <i className="bi bi-check-circle text-success"></i>
                                    <div>
                                        <h4>Sit rerum fuga</h4>
                                        <p>Tôi ghét nỗi đau của sự thật của họ</p>
                                        <p>2 giờ trước</p>
                                    </div>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="notification-item">
                                    <i className="bi bi-info-circle text-primary"></i>
                                    <div>
                                        <h4>Anh ấy chỉ trích những gì anh ấy nói</h4>
                                        <p>Tôi ghét nỗi đau của sự thật của họ</p>
                                        <p>4 giờ trước</p>
                                    </div>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li className="dropdown-footer">
                                    <a>Hiển thị tất cả thông báo</a>
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
                                    Bạn có 3 tin nhắn mới
                                    <a><span className="badge rounded-pill bg-primary p-2 ms-2">Xem tất cả</span></a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="message-item">
                                    <a>
                                        <img src="assets/img/messages-1.jpg" alt="" className="rounded-circle" />
                                        <div>
                                            <h4>Maria Hudson</h4>
                                            <p>Nó muốn trở nên cứng rắn hơn và chúng ta dẫn đến việc từ chối nhiệm vụ công việc một cách lỏng lẻo để...</p>
                                            <p>4 giờ trước</p>
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
                                            <p>Nó muốn trở nên cứng rắn hơn và chúng ta dẫn đến việc từ chối nhiệm vụ công việc một cách lỏng lẻo để...</p>
                                            <p>6 giờ trước</p>
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
                                            <p>Nó muốn trở nên cứng rắn hơn và chúng ta dẫn đến việc từ chối nhiệm vụ công việc một cách lỏng lẻo để...</p>
                                            <p>8 giờ trước</p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="dropdown-footer">
                                    <a>Hiển thị tất cả tin nhắn</a>
                                </li>

                            </ul>
                            {/* <!-- End Messages Dropdown Items --> */}

                        </li>
                        {/* <!-- End Messages Nav --> */}

                        <li className="nav-item dropdown pe-3">

                            <a className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
                                <img src={adminDetail?.Image ? `${host}/uploads/${adminDetail?.Image}.jpg` : avatar}
                                    style={{ width: '40px', height: '40px' }}
                                    onError={(e) => { e.target.onerror = null; e.target.src = avatar }}
                                    alt="Error Profile" className="rounded-circle" />
                                <span className="d-none d-md-block dropdown-toggle ps-2">{adminDetail?.Name || <span className='c-4'>No name</span>} </span>
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
                                        <span>Hồ sơ của tôi</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                        <i className="bi bi-gear"></i>
                                        <span>Cài đặt tài khoản</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="pages-faq.html">
                                        <i className="bi bi-question-circle"></i>
                                        <span>Cần giúp đỡ?</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <a className="dropdown-item d-flex align-items-center" onClick={() => { logOut() }}>
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span>Đăng xuất</span>
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
                            <span>Thống kê</span>
                        </a>
                    </li>
                    {/* <!-- End Dashboard Nav --> */}

                    <li className="nav-heading">Ứng dụng</li>

                    <li className="nav-item">
                        <a className="nav-link " data-bs-target="#components-nav" data-bs-toggle="collapse" aria-expanded="true">
                            <ReactSVG
                                src={infor}
                                className='nav-link-icon'
                            />
                            <span>Thông tin</span>
                            <ReactSVG
                                src={dropdown}
                                className='nav-link-icon ms-auto'
                            />
                        </a>
                        <ul id="components-nav" className="nav-content collapse show" data-bs-parent="#sidebar-nav">
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
                                    <span>Người dùng</span>
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
                                    <span>Thông báo</span>
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
                                    <span>Nhà hàng</span>
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
                                    <span>Món ăn</span>
                                </a>
                            </li>
                            <li>
                                <a onClick={() => changePage('/informations/history-files')} className='active'>
                                    <ReactSVG
                                        src={dot}
                                        className='nav-link-subicon dot'
                                    />
                                    <ReactSVG
                                        src={history}
                                        className='nav-link-subicon'
                                    />
                                    <span>Tệp lịch sử</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    {/* <!-- End Information Nav --> */}

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse">
                            <ReactSVG
                                src={income}
                                className='nav-link-icon'
                            />
                            <span>Thu nhập</span>
                            <ReactSVG
                                src={dropdown}
                                className='nav-link-icon ms-auto'
                            />
                        </a>
                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a onClick={() => changePage('/incomes/discount')} >
                                    <ReactSVG
                                        src={dot}
                                        className='nav-link-subicon dot'
                                    />
                                    <ReactSVG
                                        src={discount}
                                        className='nav-link-subicon'
                                    />
                                    <span>Giảm giá</span>
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
                                    <span>Đơn hàng</span>
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
                            <span>Lỗi</span>
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
                                    <span>Báo cáo lỗi</span>
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
                                    <span>Báo cáo nhà hàng</span>
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
                                    <span>Báo cáo món ăn</span>
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
                                    <span>Báo cáo người dùng</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    {/* <!-- End Errors Nav --> */}

                    <li className="nav-heading">Trang</li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" onClick={() => changePage('/informations/staffs')}>
                            <ReactSVG
                                src={employee}
                                className='nav-link-icon'
                            />
                            <span>Nhân viên</span>
                        </a>
                    </li>
                    {/* <!-- End Empployee Page Nav --> */}

                </ul>

            </aside>
            {/* <!-- End Sidebar--> */}

            <main id="main" className="main">

                {/* <!-- ======= Main ======= --> */}
                <div className="pagetitle">
                    <h1>Tệp lịch sử</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a>Thông tin</a></li>
                            <li className="breadcrumb-item active">Tệp lịch sử</li>
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


                                {/* <!-- Foods Card --> */}
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card left-card">

                                        <div className="filter">
                                            <a className="icon" data-bs-toggle="dropdown">
                                                <ReactSVG
                                                    src={more}
                                                />
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Lọc</h6>
                                                </li>

                                                <li><a className="dropdown-item">Hôm nay</a></li>
                                                <li><a className="dropdown-item">Tháng này</a></li>
                                                <li><a className="dropdown-item">Năm này</a></li>
                                            </ul>
                                        </div>

                                        <div className="card-body">
                                            <h5 className="card-title">Món ăn <span>| Hôm nay</span></h5>

                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <ReactSVG
                                                        src={food}
                                                        className='left-icon'
                                                    />
                                                </div>
                                                <div className="ps-3">
                                                    <h6>145</h6>
                                                    <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">Tăng</span>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* <!-- End Foods Card --> */}


                                {/* <!-- Sold Card --> */}
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card middle-card">

                                        <div className="filter">
                                            <a className="icon" data-bs-toggle="dropdown">
                                                <ReactSVG
                                                    src={more}
                                                />
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Lọc</h6>
                                                </li>

                                                <li><a className="dropdown-item">Hôm nay</a></li>
                                                <li><a className="dropdown-item">Tháng này</a></li>
                                                <li><a className="dropdown-item">Tổng</a></li>
                                            </ul>
                                        </div>

                                        <div className="card-body">
                                            <h5 className="card-title">Bán ra <span>| Tổng</span></h5>

                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <ReactSVG
                                                        src={sold}
                                                        className='middle-icon'
                                                    />
                                                </div>
                                                <div className="ps-3">
                                                    <h6>$3,264</h6>
                                                    <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">Tăng</span>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* <!-- End Sold Card --> */}


                                {/* <!-- Customers Card --> */}
                                <div className="col-xxl-4 col-xl-12">

                                    <div className="card info-card right-card">

                                        <div className="filter">
                                            <a className="icon" data-bs-toggle="dropdown">
                                                <ReactSVG
                                                    src={more}
                                                />
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Lọc</h6>
                                                </li>

                                                <li><a className="dropdown-item">Hôm nay</a></li>
                                                <li><a className="dropdown-item">Tháng này</a></li>
                                                <li><a className="dropdown-item">Năm này</a></li>
                                                <li><a className="dropdown-item">Tổng</a></li>
                                            </ul>
                                        </div>

                                        <div className="card-body">
                                            <h5 className="card-title">Bị cấm <span>| Hôm nay</span></h5>

                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <ReactSVG
                                                        src={food_banned}
                                                        className='right-icon'
                                                    />
                                                </div>
                                                <div className="ps-3">
                                                    <h6>1244</h6>
                                                    <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">giảm</span>

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
                                            <a className="icon" data-bs-toggle="dropdown">
                                                <ReactSVG
                                                    src={more}
                                                />
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Lọc</h6>
                                                </li>

                                                <li><a className="dropdown-item">Hôm nay</a></li>
                                                <li><a className="dropdown-item">Tháng này</a></li>
                                                <li><a className="dropdown-item">Năm này</a></li>
                                            </ul>
                                        </div>

                                        <div className="card-body">
                                            <h5 className="card-title">Báo cáo <span>/Hôm nay</span></h5>


                                            {/* <!-- Line Chart --> */}
                                            <div id="reportsChart" ref={chartRef}></div>

                                            {/* <!-- End Line Chart --> */}

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
                                                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Danh sách</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Bảng xếp hạng</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">Bình luận</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Bị cấm</button>
                                                </li>

                                            </ul>
                                            <div className="tab-content pt-2">

                                                {/* <!-- Foods List Table --> */}

                                                <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                                    <div className="tab-title search nav">
                                                        <h5 className="card-title">Danh sách món ăn</h5>
                                                        <div className="datatable-search">
                                                            <input className="datatable-input" placeholder="Tìm..." type="search" title="Tìm kiếm trong bảng" />
                                                        </div>

                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    <a className="page-link" aria-label="Previous" style={{ cursor: 'pointer' }} onClick={() => {
                                                                        dispatchData({ type: 'SET_ALL_FOOD_PAGE', payload: 1 })
                                                                    }}>
                                                                        <span aria-hidden="true">«</span>
                                                                    </a>
                                                                </li>
                                                                {
                                                                    Array.from({ length: data.allFoodTotalPage }, (_, index) => {
                                                                        if (data.allFoodTotalPage > 10) {
                                                                            if ((index >= data.allFoodPage - 2 && index <= data.allFoodPage + 1) || // 2 pages before and after current page
                                                                                index >= data.allFoodTotalPage - 2) { // last 2 pages
                                                                                return (
                                                                                    <li className={`page-item ${data.allFoodPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                        <a className="page-link" onClick={() => dispatchData({ type: 'SET_ALL_FOOD_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                    </li>
                                                                                );
                                                                            }
                                                                        } else {
                                                                            return (
                                                                                <li className={`page-item ${data.allFoodPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                    <a className="page-link" onClick={() => dispatchData({ type: 'SET_ALL_FOOD_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    })
                                                                }
                                                                <li className="page-item">
                                                                    <a className="page-link" aria-label="Next" style={{ cursor: 'pointer' }} onClick={() => { dispatchData({ type: 'SET_ALL_FOOD_PAGE', payload: data.allFoodTotalPage }) }}>
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
                                                                <th scope="col">Ảnh</th>
                                                                <th scope="col">Tên</th>
                                                                <th scope="col">Giá</th>
                                                                <th scope="col">Từ</th>
                                                                <th scope="col">Trạng thái</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                data.allFood.map((res) => {
                                                                    return (
                                                                        <tr>
                                                                            <th scope="row" style={{ textAlign: 'center' }}>
                                                                                <a>
                                                                                    <img src={res.Imgae ? `${host}/uploads/${res.image[0].Id}.jpg` : avatar}
                                                                                        style={{ width: 50, height: 40, resize: 'initial' }} alt="" className="avatar" />
                                                                                </a>
                                                                            </th>
                                                                            <td>{res.Name}</td>
                                                                            <td className="fw-bold">{res.Price}</td>
                                                                            <td>{res.ResName}</td>
                                                                            <td><a className="text-primary fw-bold">{res.Status}</a></td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>

                                                </div>
                                                {/* <!-- End Foods List Table --> */}

                                                <div className="tab-pane fade profile-edit pt-3" id="profile-edit">

                                                    {/* <!-- Leader Board Table --> */}
                                                    <div className="tab-title search nav">
                                                        <h5 className="card-title">Leader Board</h5>
                                                        <div className="datatable-search">
                                                            <input className="datatable-input" placeholder="Tìm..." type="search" title="Tìm kiếm trong bảng" />
                                                        </div>

                                                        <div className="filter">
                                                            <a className="icon" data-bs-toggle="dropdown">
                                                                <ReactSVG
                                                                    src={more}
                                                                />
                                                            </a>
                                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                                <li className="dropdown-header text-start">
                                                                    <h6>Lọc</h6>
                                                                </li>

                                                                <li><a className="dropdown-item">Hôm nay</a></li>
                                                                <li><a className="dropdown-item">Tháng này</a></li>
                                                                <li><a className="dropdown-item">Năm này</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <table className="table table-borderless"
                                                        style={{ textAlign: 'start' }}
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Ảnh</th>
                                                                <th scope="col">Tên</th>
                                                                <th scope="col">Giá</th>
                                                                <th scope="col">Bán ra</th>
                                                                <th scope="col">Doanh thu</th>
                                                                <th scope="col">Từ</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                data.topFood.map((res) => {
                                                                    return (
                                                                        <tr>
                                                                            <>
                                                                                <th scope="row" style={{ textAlign: 'center' }}>
                                                                                    <a>
                                                                                        <img src={res.Image ? `${host}/uploads/${res.Image}.jpg` : avatar}
                                                                                            style={{ width: 50, height: 40 }} alt="" className="avatar" />
                                                                                    </a>
                                                                                </th>
                                                                                <td>{res.Name}</td>
                                                                                <td className="fw-bold">{res.Price}</td>
                                                                                <td className="fw-bold">{res.Sold}</td>
                                                                                <td style={{ textAlign: 'center' }}><a className="text-primary fw-bold">{res.Revenue || "0"}</a></td>
                                                                                <td>{res.ResName}</td>
                                                                            </>
                                                                        </tr>
                                                                    )

                                                                })
                                                            }
                                                        </tbody>
                                                    </table>

                                                    <nav aria-label="Page navigation example" style={{ float: 'right' }}>
                                                        <ul className="pagination">
                                                            <li className="page-item">
                                                                <a className="page-link" aria-label="Previous" style={{ cursor: 'pointer' }} onClick={() => {
                                                                    dispatchData({ type: 'SET_TOP_FOOD_PAGE', payload: 1 })
                                                                }}>
                                                                    <span aria-hidden="true">«</span>
                                                                </a>
                                                            </li>
                                                            {
                                                                Array.from({ length: data.topFoodTotalPage }, (_, index) => {
                                                                    if (data.topFoodTotalPage > 10) {
                                                                        if ((index >= data.topFoodPage - 2 && index <= data.topFoodPage + 1) || // 2 pages before and after current page
                                                                            index >= data.topFoodTotalPage - 2) { // last 2 pages
                                                                            return (
                                                                                <li className={`page-item ${data.topFoodPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                    <a className="page-link" onClick={() => dispatchData({ type: 'SET_TOP_FOOD_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    } else {
                                                                        return (
                                                                            <li className={`page-item ${data.topFoodPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                <a className="page-link" onClick={() => dispatchData({ type: 'SET_TOP_FOOD_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                            </li>
                                                                        );
                                                                    }
                                                                })
                                                            }
                                                            <li className="page-item">
                                                                <a className="page-link" aria-label="Next" style={{ cursor: 'pointer' }} onClick={() => { dispatchData({ type: 'SET_TOP_FOOD_PAGE', payload: data.topFoodTotalPage }) }}>
                                                                    <span aria-hidden="true">»</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                    {/* <!-- End Leader Board Table --> */}

                                                </div>

                                                <div className="tab-pane fade pt-3" id="profile-settings">

                                                    {/* <!-- Comments Table --> */}
                                                    <div className="tab-title search nav">
                                                        <div className="datatable-search">
                                                            <input className="datatable-input" placeholder="Tìm..." type="search" title="Tìm kiếm trong bảng" />
                                                        </div>

                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    <a className="page-link" aria-label="Previous">
                                                                        <span aria-hidden="true">«</span>
                                                                    </a>
                                                                </li>
                                                                <li className="page-item active"><a className="page-link">1</a></li>
                                                                <li className="page-item"><a className="page-link">2</a></li>
                                                                <li className="page-item"><a className="page-link">3</a></li>
                                                                <li className="page-item"><a className="page-link">4</a></li>
                                                                <li className="page-item"><a className="page-link">5</a></li>
                                                                <li className="page-item"><a className="page-link">6</a></li>
                                                                <li className="page-item"><a className="page-link">7</a></li>
                                                                <li className="page-item">
                                                                    <a className="page-link" aria-label="Next">
                                                                        <span aria-hidden="true">»</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </nav>
                                                    </div>

                                                    <h5 className="card-title">Không có gì...</h5>


                                                    {/* <!-- End Comments Table --> */}

                                                </div>

                                                <div className="tab-pane fade pt-3" id="profile-change-password">

                                                    {/* <!-- Banned Table --> */}
                                                    <div className="tab-title search nav">
                                                        <h5 className="card-title">Danh sách món ăn bị cấm</h5>
                                                        <div className="datatable-search">
                                                            <input className="datatable-input" placeholder="Tìm..." type="search" title="Tìm kiếm trong bảng" />
                                                        </div>

                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    <a className="page-link" aria-label="Previous" style={{ cursor: 'pointer' }} onClick={() => {
                                                                        dispatchData({ type: 'SET_BAN_FOOD_PAGE', payload: 1 })
                                                                    }}>
                                                                        <span aria-hidden="true">«</span>
                                                                    </a>
                                                                </li>
                                                                {
                                                                    Array.from({ length: data.banFoodTotalPage || 1 }, (_, index) => {
                                                                        if (data.banFoodTotalPage > 10) {
                                                                            if ((index >= data.banFoodPage - 1 && index <= data.banFoodPage + 1) || // 2 pages before and after current page
                                                                                index >= data.banFoodTotalPage - 2) { // last 2 pages
                                                                                return (
                                                                                    <li className={`page-item ${data.banFoodPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                        <a className="page-link" onClick={() => dispatchData({ type: 'SET_BAN_FOOD_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                    </li>
                                                                                );
                                                                            }
                                                                        } else {
                                                                            return (
                                                                                <li className={`page-item ${data.banFoodPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                    <a className="page-link" onClick={() => dispatchData({ type: 'SET_BAN_FOOD_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    })
                                                                }
                                                                <li className="page-item">
                                                                    <a className="page-link" aria-label="Next" style={{ cursor: 'pointer' }} onClick={() => { dispatchData({ type: 'SET_BAN_FOOD_PAGE', payload: data.banFoodTotalPage }) }}>
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
                                                                <>
                                                                    <th scope="col">Ảnh</th>
                                                                    <th scope="col">Tên</th>
                                                                    <th scope="col">Từ</th>
                                                                    <th scope="col">Giá</th>
                                                                    <th scope="col">Hành động</th>
                                                                </>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                data.banFood.length > 0 ? data.banFood.map((res, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <th scope="row"><a><img src={res.Image ? `${host}/uploads/${res.image[0].Id}.jpg` : avatar} style={{ width: 60, height: 50, resize: 'initial' }} alt="" className="avatar" /></a></th>
                                                                            <td>{res.Name}</td>
                                                                            <td>{res.ResName}</td>
                                                                            <td><a className="text-primary fw-bold">{res.Price}</a></td>
                                                                            <td>
                                                                                <button type="button" className="btn btn-danger btn-sm">UnBan</button>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                }) : (
                                                                    <tr>
                                                                        <td colSpan={5} className=''>Don't have banned food</td>
                                                                    </tr>
                                                                )
                                                            }
                                                        </tbody>
                                                    </table>
                                                    {/* <!-- End Banned Table --> */}

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
                                            <a className="icon" data-bs-toggle="dropdown">
                                                <ReactSVG
                                                    src={more}
                                                />
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Lọc</h6>
                                                </li>

                                                <li><a className="dropdown-item">Hôm nay</a></li>
                                                <li><a className="dropdown-item">Tháng này</a></li>
                                                <li><a className="dropdown-item">Năm này</a></li>
                                            </ul>
                                        </div>

                                        <div className="card-body">
                                            <h5 className="card-title">Bán hàng gần đây <span>| Hôm nay</span></h5>

                                            <table className="table table-borderless"
                                                style={{ textAlign: 'start' }}
                                            >
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Tên khách hàng</th>
                                                        <th scope="col">Danh sách</th>
                                                        <th scope="col">Mặt hàng</th>
                                                        <th scope="col">Doanh thu</th>
                                                        <th scope="col">Trạng thái</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data.recentSales.map((res, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td style={{ minWidth: 200 }}><a className="text-primary fw-bold">{res.Name}</a></td>
                                                                    <td>{res.FoodName}</td>
                                                                    <td className="fw-bold">{res.Quantity}</td>
                                                                    <td className="fw-bold">{res.Price || '0'}</td>
                                                                    <td className="fw-bold">{res.Status}</td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                            </table>

                                            <nav aria-label="Page navigation example" style={{ justifyContent: 'flex-end', display: 'flex' }}>
                                                <ul className="pagination">
                                                    <li className="page-item">
                                                        <a className="page-link" aria-label="Previous" style={{ cursor: 'pointer' }} onClick={() => {
                                                            dispatchData({ type: 'SET_RECENT_SALES_PAGE', payload: 1 })
                                                        }}>
                                                            <span aria-hidden="true">«</span>
                                                        </a>
                                                    </li>
                                                    {
                                                        Array.from({ length: data.recentSalesTotalPage || 1 }, (_, index) => {
                                                            if (data.recentSalesTotalPage > 10) {
                                                                if ((index >= data.recentSalesPage - 1 && index <= data.recentSalesPage + 1) || // 2 pages before and after current page
                                                                    index >= data.recentSalesTotalPage - 2) { // last 2 pages
                                                                    return (
                                                                        <li className={`page-item ${data.recentSalesPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                            <a className="page-link" onClick={() => dispatchData({ type: 'SET_RECENT_SALES_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                        </li>
                                                                    );
                                                                }
                                                            } else {
                                                                return (
                                                                    <li className={`page-item ${data.recentSalesPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                        <a className="page-link" onClick={() => dispatchData({ type: 'SET_RECENT_SALES_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                    </li>
                                                                );
                                                            }
                                                        })
                                                    }
                                                    <li className="page-item">
                                                        <a className="page-link" aria-label="Next" style={{ cursor: 'pointer' }} onClick={() => {
                                                            dispatchData({ type: 'SET_RECENT_SALES_PAGE', payload: data.recentSalesTotalPage })
                                                        }}>
                                                            <span aria-hidden="true">»</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </nav>

                                        </div>

                                    </div>
                                </div>
                                {/* <!-- End Recent Sales --> */}

                                {/* <!-- Declined/Cancelled Orders --> */}
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">

                                        <div className="filter">
                                            <a className="icon" data-bs-toggle="dropdown">
                                                <ReactSVG
                                                    src={more}
                                                />
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Lọc</h6>
                                                </li>

                                                <li><a className="dropdown-item">Hôm nay</a></li>
                                                <li><a className="dropdown-item">Tháng này</a></li>
                                                <li><a className="dropdown-item">Năm này</a></li>
                                            </ul>
                                        </div>

                                        <div className="card-body">
                                            <h5 className="card-title">Đơn đặt hàng bị từ chối/hủy <span>| Hôm nay</span></h5>

                                            <table className="table table-borderless"
                                                style={{ textAlign: 'start' }}
                                            >
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Tên khách hàng</th>
                                                        <th scope="col">Danh sách</th>
                                                        <th scope="col">Mặt hàng</th>
                                                        <th scope="col">Doanh thu</th>
                                                        <th scope="col">Trạng thái</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data.failOrders.map((res, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td style={{ minWidth: 200 }}><a className="text-primary fw-bold">{res.Name}</a></td>
                                                                    <td>{res.FoodName}</td>
                                                                    <td className="fw-bold">{res.Quantity}</td>
                                                                    <td className="fw-bold">{res.Price || '0'}</td>
                                                                    <td className="fw-bold">{res.Status}</td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                            </table>

                                            <nav aria-label="Page navigation example" style={{ justifyContent: 'flex-end', display: 'flex' }}>
                                                <ul className="pagination">
                                                    <li className="page-item">
                                                        <a className="page-link" aria-label="Previous" style={{ cursor: 'pointer' }} onClick={() => {
                                                            dispatchData({ type: 'SET_FAIL_ORDERS_PAGE', payload: 1 })
                                                        }}>
                                                            <span aria-hidden="true">«</span>
                                                        </a>
                                                    </li>
                                                    {
                                                        Array.from({ length: data.failOrdersTotalPage || 1 }, (_, index) => {
                                                            if (data.failOrdersTotalPage > 10) {
                                                                if ((index >= data.failOrdersPage - 1 && index <= data.failOrdersPage + 1) || // 2 pages before and after current page
                                                                    index >= data.failOrdersTotalPage - 2) { // last 2 pages
                                                                    return (
                                                                        <li className={`page-item ${data.failOrdersPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                            <a className="page-link" onClick={() => dispatchData({ type: 'SET_FAIL_ORDERS_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                        </li>
                                                                    );
                                                                }
                                                            } else {
                                                                return (
                                                                    <li className={`page-item ${data.failOrdersPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                        <a className="page-link" onClick={() => dispatchData({ type: 'SET_FAIL_ORDERS_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                    </li>
                                                                );
                                                            }
                                                        })
                                                    }
                                                    <li className="page-item">
                                                        <a className="page-link" aria-label="Next" style={{ cursor: 'pointer' }} onClick={() => {
                                                            dispatchData({ type: 'SET_FAIL_ORDERS_PAGE', payload: data.failOrdersTotalPage })
                                                        }}>
                                                            <span aria-hidden="true">»</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </nav>

                                        </div>

                                    </div>
                                </div>
                                {/* <!-- End Declined/Cancelled Orders --> */}


                            </div>
                        </div>
                        {/* <!-- End Left side columns --> */}


                        {/* <!-- Right side columns --> */}
                        <div className="col-lg-4">




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

export default HistoryFiles