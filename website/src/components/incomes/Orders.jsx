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
import danger from '../assets/img/icons/danger.svg';
import employee from '../assets/img/icons/employee.svg';
import users from '../assets/img/icons/users.svg';
import send_notify from '../assets/img/icons/send_notify.svg';
import restaurant from '../assets/img/icons/restaurant.svg';
import food from '../assets/img/icons/food.svg';
import history from '../assets/img/icons/history.svg';
import discount from '../assets/img/icons/discount.svg';
import error from '../assets/img/icons/error.svg';
import report from '../assets/img/icons/report.svg';
import dot from '../assets/img/icons/dot.svg';
import more from '../assets/img/icons/more.svg';

import Swal from 'sweetalert2'

// Image
import avatar from '../assets/img/images/ex_avatar.png';

// Conponent
import React, { useEffect, useReducer, useRef, useState } from 'react'
import ApexCharts from 'apexcharts'
import { ReactSVG } from 'react-svg';
import { Navigate, useNavigate, useHref } from 'react-router-dom';
import AxiosInstance from '../helpers/AxiosInstance.js';


const Discounts = (prop) => {
    const { host, adminID, setID, adminDetail } = prop;

    document.title = 'Informations - Users';
    const navigate = useNavigate();

    const changePage = (link) => {
        navigate(link);
    };

    const logOut = () => {
        console.log("log out");
        setID('');
    }

    const [idItemSelected, setIdItemSelected] = useState();

    const initialState = {
        pendingPage: 1,
        approvedPage: 1,
        canclePage: 1,
        deniedPage: 1,
        donePage: 1,
        inDeliveryPage: 1,
        madePage: 1,
        orderDetailItemsPage: 1,


        pendingTotalPage: 1,
        approvedTotalPage: 1,
        cancleTotalPage: 1,
        deniedTotalPage: 1,
        doneTotalPage: 1,
        inDeliveryTotalPage: 1,
        madeTotalPage: 1,
        orderDetailItemsTotalPage: 1,

        pending: [],
        approved: [],
        cancle: [],
        denied: [],
        done: [],
        inDelivery: [],
        made: [],
        orderDetail: {},
        orderDetailItems: [],

    }

    const [data, dispatchData] = useReducer((state, action) => {
        switch (action.type) {
            case 'SET_PENDING_PAGE':
                return { ...state, pendingPage: action.payload };
            case 'SET_APPROVED_PAGE':
                return { ...state, approvedPage: action.payload };
            case 'SET_CANCLED_PAGE':
                return { ...state, canclePage: action.payload };
            case 'SET_DENIED_PAGE':
                return { ...state, deniedPage: action.payload };
            case 'SET_DONE_PAGE':
                return { ...state, donePage: action.payload };
            case 'SET_IN_DELIVERY_PAGE':
                return { ...state, inDeliveryPage: action.payload };
            case 'SET_MADE_PAGE':
                return { ...state, madePage: action.payload };
            case 'SET_ORDER_DETAIL_ITEMS_PAGE':
                return { ...state, orderDetailItemsPage: action.payload };

            case 'SET_PENDING_TOTAL_PAGE':
                return { ...state, pendingTotalPage: action.payload };
            case 'SET_APPROVED_TOTAL_PAGE':
                return { ...state, approvedTotalPage: action.payload };
            case 'SET_CANCLED_TOTAL_PAGE':
                return { ...state, cancleTotalPage: action.payload };
            case 'SET_DENIED_TOTAL_PAGE':
                return { ...state, deniedTotalPage: action.payload };
            case 'SET_DONE_TOTAL_PAGE':
                return { ...state, doneTotalPage: action.payload };
            case 'SET_IN_DELIVERY_TOTAL_PAGE':
                return { ...state, inDeliveryTotalPage: action.payload };
            case 'SET_MADE_TOTAL_PAGE':
                return { ...state, madeTotalPage: action.payload };
            case 'SET_ORDER_DETAIL_ITEMS_TOTAL_PAGE':
                return { ...state, orderDetailItemsTotalPage: action.payload };


            case 'SET_PENDING':
                return { ...state, pending: action.payload };
            case 'SET_APPROVED':
                return { ...state, approved: action.payload };
            case 'SET_CANCLED':
                return { ...state, cancle: action.payload };
            case 'SET_DENIED':
                return { ...state, denied: action.payload };
            case 'SET_DONE':
                return { ...state, done: action.payload };
            case 'SET_IN_DELIVERY':
                return { ...state, inDelivery: action.payload };
            case 'SET_MADE':
                return { ...state, made: action.payload };
            case 'SET_ORDER_DETAIL':
                return { ...state, orderDetail: action.payload };
            case 'SET_ORDER_DETAIL_ITEMS':
                return { ...state, orderDetailItems: action.payload };

            case 'RESET':
                return initialState;
        }
    }, initialState);

    const getWaitingOrders = async () => {
        const response = await AxiosInstance().get('/get-waiting-order-for-website.php');
        if (response.status) {
            const length = response.data.length;
            let list = response.data.slice(data.pendingPage * 5 - 5, data.pendingPage * 5);
            console.log(list)
            dispatchData({ type: 'SET_PENDING', payload: list });
            dispatchData({ type: 'SET_PENDING_TOTAL_PAGE', payload: (Math.ceil(length / 5)) });
        } else {
            console.log(response)
        }
    }

    useEffect(() => {
        getWaitingOrders()
    }, [data.pendingPage])

    const getApprovedOrders = async () => {
        const response = await AxiosInstance().get('/get-approved-order-for-website.php');
        if (response.status) {
            const length = response.data.length;
            let list = response.data.slice(data.approvedPage * 5 - 5, data.approvedPage * 5);
            console.log(list)
            dispatchData({ type: 'SET_APPROVED', payload: list });
            dispatchData({ type: 'SET_APPROVED_TOTAL_PAGE', payload: (Math.ceil(length / 5)) });
        } else {
            console.log(response)
        }
    }

    useEffect(() => {
        getApprovedOrders()
    }, [data.approvedPage])

    const getCancledOrders = async () => {
        const response = await AxiosInstance().get('/get-cancled-order-for-website.php');
        if (response.status) {
            const length = response.data.length;
            let list = response.data.slice(data.canclePage * 5 - 5, data.canclePage * 5);
            console.log(list)
            dispatchData({ type: 'SET_CANCLED', payload: list });
            dispatchData({ type: 'SET_CANCLED_TOTAL_PAGE', payload: (Math.ceil(length / 5)) });
        } else {
            console.log(response)
        }
    }

    useEffect(() => {
        getCancledOrders()
    }, [data.canclePage])

    const getDeniedOrders = async () => {
        const response = await AxiosInstance().get('/get-denied-order-for-website.php');
        if (response.status) {
            const length = response.data.length;
            let list = response.data.slice(data.deniedPage * 5 - 5, data.deniedPage * 5);
            console.log(list)
            dispatchData({ type: 'SET_DENIED', payload: list });
            dispatchData({ type: 'SET_DENIED_TOTAL_PAGE', payload: (Math.ceil(length / 5)) });
        } else {
            console.log(response)
        }
    }

    useEffect(() => {
        getDeniedOrders()
    }, [data.deniedPage])

    const getDoneOrders = async () => {
        const response = await AxiosInstance().get('/get-done-order-for-website.php');
        if (response.status) {
            const length = response.data.length;
            let list = response.data.slice(data.donePage * 5 - 5, data.donePage * 5);
            console.log(list)
            dispatchData({ type: 'SET_DONE', payload: list });
            dispatchData({ type: 'SET_DONE_TOTAL_PAGE', payload: (Math.ceil(length / 5)) });
        } else {
            console.log(response)
        }
    }

    useEffect(() => {
        getDoneOrders()
    }, [data.donePage])

    const getInDeliveryOrders = async () => {
        const response = await AxiosInstance().get('/get-in-delivery-order-for-website.php');
        if (response.status) {
            const length = response.data.length;
            let list = response.data.slice(data.inDeliveryPage * 5 - 5, data.inDeliveryPage * 5);
            console.log(list)
            dispatchData({ type: 'SET_IN_DELIVERY', payload: list });
            dispatchData({ type: 'SET_IN_DELIVERY_TOTAL_PAGE', payload: (Math.ceil(length / 5)) });
        } else {
            console.log(response)
        }
    }

    useEffect(() => {
        getInDeliveryOrders()
    }, [data.inDeliveryPage])

    const getMadeOrders = async () => {
        const response = await AxiosInstance().get('/get-made-order-for-website.php');
        if (response.status) {
            const length = response.data.length;
            let list = response.data.slice(data.madePage * 5 - 5, data.madePage * 5);
            console.log(list)
            dispatchData({ type: 'SET_MADE', payload: list });
            dispatchData({ type: 'SET_MADE_TOTAL_PAGE', payload: (Math.ceil(length / 5)) });
        } else {
            console.log(response)
        }
    }

    useEffect(() => {
        getMadeOrders()
    }, [data.madePage])


    const getOrderDetail = async (id) => {
        // console.log(id)
        const response = await AxiosInstance().post('/get-order-with-id.php', { orderId: id });
        if (response.status) {
            dispatchData({ type: 'SET_ORDER_DETAIL', payload: response.data });
            dispatchData({ type: 'SET_ORDER_DETAIL_ITEMS_PAGE', payload: 1 });

            const length = response.data.Items.length;
            let list = response.data.Items.slice(data.orderDetailItemsPage * 2 - 2, data.orderDetailItemsPage * 2);

            dispatchData({ type: 'SET_ORDER_DETAIL_ITEMS', payload: list });
            dispatchData({ type: 'SET_ORDER_DETAIL_ITEMS_TOTAL_PAGE', payload: (Math.ceil(length / 2)) });
        } else {
            console.log(response)
        }
    }

    const getOrderItems = (page) => {
        if (data?.orderDetail?.Items?.length === 0) return;
        console.log("data.orderDetail.Items", data.orderDetail.Items)
        dispatchData({ type: 'SET_ORDER_DETAIL_ITEMS_PAGE', payload: page })

        let length = data.orderDetail.Items.length;
        let list = data.orderDetail.Items.slice(page * 2 - 2, page * 2);

        dispatchData({ type: 'SET_ORDER_DETAIL_ITEMS', payload: list });
        dispatchData({ type: 'SET_ORDER_DETAIL_ITEMS_TOTAL_PAGE', payload: (Math.ceil(length / 2)) });
        console.log(data.orderDetailItems)
    }

    const handleOrderDetail = (itemId, orderId) => {
        setIdItemSelected(itemId);
        getOrderDetail(orderId);

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
                        <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" aria-expanded="true">
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
                                <a onClick={() => changePage('/informations/history-files')}>
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
                        <a className="nav-link" data-bs-target="#forms-nav" data-bs-toggle="collapse">
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
                        <ul id="forms-nav" className="nav-content collapse show" data-bs-parent="#sidebar-nav">
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
                            <li >
                                <a onClick={() => changePage('/incomes/orders')} className='active'>
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
                    <h1>Thống kê đơn hàng</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a>Thu nhập</a></li>
                            <li className="breadcrumb-item active">Đơn hàng</li>
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
                                                    {/** The button will re render item if it getting press at another tab */}
                                                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#waiting-order" onMouseDown={(e) => {
                                                        if (!e.target.classList.contains('active')) {
                                                        }
                                                    }}>Đang chờ</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#approved-order" onMouseDown={(e) => {
                                                        if (e.target.classList.contains('active')) {
                                                        }
                                                    }} >Chấp thuận</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#cancled-order" onMouseDown={(e) => {
                                                        if (e.target.classList.contains('active')) {
                                                        }
                                                    }} >Đã hủy</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#denied-order" onMouseDown={(e) => {
                                                        if (e.target.classList.contains('active')) {
                                                        }
                                                    }} > Bị từ chối</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#made-order" onMouseDown={(e) => {
                                                        if (e.target.classList.contains('active')) {
                                                        }
                                                    }} >Đang làm</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#indelivery-order" onMouseDown={(e) => {
                                                        if (e.target.classList.contains('active')) {
                                                        }
                                                    }} >Đang giao</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#done-order" onMouseDown={(e) => {
                                                        if (e.target.classList.contains('active')) {
                                                        }
                                                    }} >Hoàn tất</button>
                                                </li>

                                            </ul>
                                            <div className="tab-content pt-2">

                                                <div className="tab-pane fade show active profile-overview" id="waiting-order">

                                                    <div className="tab-title search nav">
                                                        <h5 className="card-title">Đơn hàng đang chờ</h5>
                                                        <div className="datatable-search">
                                                            <input className="datatable-input" placeholder="Tìm..." type="search" title="Tìm kiếm trong bảng" />
                                                        </div>

                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    <a className="page-link" aria-label="Previous" style={{ cursor: 'pointer' }} onClick={() => {
                                                                        if (data.pendingPage !== 1) {
                                                                            dispatchData({ type: 'SET_PENDING_PAGE', payload: 1 });
                                                                        }
                                                                    }}>
                                                                        <span aria-hidden="true">«</span>
                                                                    </a>
                                                                </li>

                                                                {
                                                                    Array.from({ length: data.pendingTotalPage }, (_, index) => {
                                                                        if (data.pendingTotalPage > 10) {
                                                                            if (index === 0 ||
                                                                                index === data.pendingTotalPage - 1 ||
                                                                                (index >= data.pendingPage - 2 && index <= data.pendingPage) ||
                                                                                (index === 1 && data.pendingPage > 3) ||
                                                                                (index >= data.pendingTotalPage - 2 && data.pendingPage <= data.pendingTotalPage - 2)
                                                                            ) {

                                                                                return (
                                                                                    <li className={`page-item ${data.pendingPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                        <a className="page-link" onClick={() => {
                                                                                            dispatchData({ type: 'SET_PENDING_PAGE', payload: index + 1 });

                                                                                        }}>{index + 1}</a>
                                                                                    </li>
                                                                                );
                                                                            } else if ((index === 2 && data.pendingPage >= 4) || (index >= data.pendingTotalPage - 3 && data.pendingPage <= data.pendingTotalPage - 3)) {

                                                                                return (
                                                                                    <li key={index + 1} className={`page-item disabled`}><a className="page-link">...</a></li>
                                                                                )
                                                                            }
                                                                        } else {
                                                                            return (
                                                                                <li className={`page-item ${data.pendingPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                    <a className="page-link" onClick={() => dispatchData({ type: 'SET_PENDING_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    })
                                                                }

                                                                <li className="page-item">
                                                                    <a className="page-link" aria-label="Next" style={{ cursor: 'pointer' }} onClick={() => {
                                                                        if (data.pendingPage !== data.pendingTotalPage) {
                                                                            dispatchData({ type: 'SET_PENDING_PAGE', payload: data.pendingTotalPage });
                                                                        }
                                                                    }}>
                                                                        <span aria-hidden="true">»</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </nav>
                                                    </div>

                                                    <table className="table table-hover table-vcenter table-borderless"
                                                    >
                                                        <thead>
                                                            <tr key={'thead'}>
                                                                <th scope="col" style={{ textAlign: 'center' }}>Ảnh</th>
                                                                <th scope="col">Tên</th>
                                                                <th scope="col">Đơn hàng của người dùng</th>
                                                                <th scope="col">Số lượng</th>
                                                                <th scope="col">Giá trị</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data.pending.map((item, index) => (
                                                                <tr key={item.Id}
                                                                    style={{ cursor: "pointer" }}
                                                                    onClick={() => { handleOrderDetail(item.Id, item.OrderID)  }}
                                                                >
                                                                    <th scope="row" style={{ textAlign: 'center' }}>
                                                                        <a><img src={item.FoodImage ? `${host}/uploads/${item.FoodImage}.jpg` : avatar} alt="" className="avatar" /></a>
                                                                    </th>
                                                                    <td>{item.FoodName}</td>
                                                                    <td className="fw-bold">{item.UserName}</td>
                                                                    <td className="fw-bold">{item.Quantity}</td>
                                                                    <td className="fw-bold">{item.Value} K VNĐ</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className="tab-pane fade profile-edit pt-3" id="approved-order">

                                                    {/* <!-- Users LeaderBoard table --> */}
                                                    <div className="tab-title search nav">
                                                        <h5 className="card-title">Phê duyệt đơn hàng</h5>
                                                        <div className="datatable-search">
                                                            <input className="datatable-input" placeholder="Tìm..." type="search" title="Tìm kiếm trong bảng" />
                                                        </div>

                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    <a className="page-link" aria-label="Previous" style={{ cursor: 'pointer' }} onClick={() => {
                                                                        if (data.approvedPage !== 1) {
                                                                            dispatchData({ type: 'SET_APPROVED_PAGE', payload: 1 });
                                                                        }
                                                                    }}>
                                                                        <span aria-hidden="true">«</span>
                                                                    </a>
                                                                </li>

                                                                {
                                                                    Array.from({ length: data.approvedTotalPage }, (_, index) => {
                                                                        if (data.approvedTotalPage > 10) {
                                                                            if (index === 0 ||
                                                                                index === data.approvedTotalPage - 1 ||
                                                                                (index >= data.approvedPage - 2 && index <= data.approvedPage) ||
                                                                                (index === 1 && data.approvedPage > 3) ||
                                                                                (index >= data.approvedTotalPage - 2 && data.approvedPage <= data.approvedTotalPage - 2)
                                                                            ) {

                                                                                return (
                                                                                    <li className={`page-item ${data.approvedPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                        <a className="page-link" onClick={() => {
                                                                                            dispatchData({ type: 'SET_APPROVED_PAGE', payload: index + 1 });

                                                                                        }}>{index + 1}</a>
                                                                                    </li>
                                                                                );
                                                                            } else if ((index === 2 && data.approvedPage >= 4) || (index >= data.approvedTotalPage - 3 && data.approvedPage <= data.approvedTotalPage - 3)) {

                                                                                return (
                                                                                    <li key={index + 1} className={`page-item disabled`}><a className="page-link">...</a></li>
                                                                                )
                                                                            }
                                                                        } else {
                                                                            return (
                                                                                <li className={`page-item ${data.approvedPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                    <a className="page-link" onClick={() => dispatchData({ type: 'SET_APPROVED_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    })
                                                                }

                                                                <li className="page-item">
                                                                    <a className="page-link" aria-label="Next" style={{ cursor: 'pointer' }} onClick={() => {
                                                                        if (data.approvedPage !== data.approvedTotalPage) {
                                                                            dispatchData({ type: 'SET_APPROVED_PAGE', payload: data.approvedTotalPage });
                                                                        }
                                                                    }}>
                                                                        <span aria-hidden="true">»</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </nav>
                                                    </div>

                                                    <table className="table table-hover table-vcenter table-borderless"
                                                        style={{ textAlign: 'start' }}
                                                    >
                                                        <thead>
                                                            <tr key={'thead'}>
                                                                <th scope="col" style={{ textAlign: 'center' }}>Ảnh</th>
                                                                <th scope="col">Tên</th>
                                                                <th scope="col">Đơn hàng của người dùng</th>
                                                                <th scope="col">Số lượng</th>
                                                                <th scope="col">Giá trị</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data.approved.map((item, index) => (
                                                                <tr key={item.Id}
                                                                    style={{ cursor: "pointer" }}
                                                                    onClick={() => { handleOrderDetail(item.Id, item.OrderID)  }}
                                                                >
                                                                    <th scope="row" style={{ textAlign: 'center' }}>
                                                                        <a><img src={item.FoodImage ? `${host}/uploads/${item.FoodImage}.jpg` : avatar} alt="" className="avatar" /></a>
                                                                    </th>
                                                                    <td>{item.FoodName}</td>
                                                                    <td className="fw-bold">{item.UserName}</td>
                                                                    <td className="fw-bold">{item.Quantity}</td>
                                                                    <td className="fw-bold">{item.Value} K VNĐ</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    {/* <!-- Users LeaderBoard table --> */}

                                                </div>

                                                <div className="tab-pane fade pt-3" id="cancled-order">

                                                    {/* <!-- Comment Table --> */}
                                                    <div className="tab-title search nav">
                                                        <h5 className="card-title">Đơn hàng đã hủy</h5>

                                                        <div className="datatable-search">
                                                            <input className="datatable-input" placeholder="Tìm..." type="search" title="Tìm kiếm trong bảng" />
                                                        </div>

                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    <a className="page-link" aria-label="Previous" style={{ cursor: 'pointer' }} onClick={() => {
                                                                        if (data.canclePage !== 1) {
                                                                            dispatchData({ type: 'SET_CANCLED_PAGE', payload: 1 });
                                                                        }
                                                                    }}>
                                                                        <span aria-hidden="true">«</span>
                                                                    </a>
                                                                </li>

                                                                {
                                                                    Array.from({ length: data.cancleTotalPage }, (_, index) => {
                                                                        if (data.cancleTotalPage > 10) {
                                                                            if (index === 0 ||
                                                                                index === data.cancleTotalPage - 1 ||
                                                                                (index >= data.canclePage - 2 && index <= data.canclePage) ||
                                                                                (index === 1 && data.canclePage > 3) ||
                                                                                (index >= data.cancleTotalPage - 2 && data.canclePage <= data.cancleTotalPage - 2)
                                                                            ) {

                                                                                return (
                                                                                    <li className={`page-item ${data.canclePage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                        <a className="page-link" onClick={() => {
                                                                                            dispatchData({ type: 'SET_CANCLED_PAGE', payload: index + 1 });

                                                                                        }}>{index + 1}</a>
                                                                                    </li>
                                                                                );
                                                                            } else if ((index === 2 && data.canclePage >= 4) || (index >= data.cancleTotalPage - 3 && data.canclePage <= data.cancleTotalPage - 3)) {

                                                                                return (
                                                                                    <li key={index + 1} className={`page-item disabled`}><a className="page-link">...</a></li>
                                                                                )
                                                                            }
                                                                        } else {
                                                                            return (
                                                                                <li className={`page-item ${data.canclePage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                    <a className="page-link" onClick={() => dispatchData({ type: 'SET_CANCLED_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    })
                                                                }

                                                                <li className="page-item">
                                                                    <a className="page-link" aria-label="Next" style={{ cursor: 'pointer' }} onClick={() => {
                                                                        if (data.canclePage !== data.cancleTotalPage) {
                                                                            dispatchData({ type: 'SET_CANCLED_PAGE', payload: data.cancleTotalPage });
                                                                        }
                                                                    }}>
                                                                        <span aria-hidden="true">»</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </nav>

                                                        <table className="table table-hover table-vcenter table-borderless"
                                                            style={{ textAlign: 'start' }}
                                                        >
                                                            <thead>
                                                                <tr key={'thead'}>
                                                                    <th scope="col" style={{ textAlign: 'center' }}>Ảnh</th>
                                                                    <th scope="col">Tên</th>
                                                                    <th scope="col">Đơn hàng của người dùng</th>
                                                                    <th scope="col">Số lượng</th>
                                                                    <th scope="col">Giá trị</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data.cancle.map((item, index) => (
                                                                    <tr key={item.Id}
                                                                        style={{ cursor: "pointer" }}
                                                                        onClick={() => { handleOrderDetail(item.Id, item.OrderID)  }}
                                                                    >
                                                                        <th scope="row" style={{ textAlign: 'center' }}>
                                                                            <a><img src={item.FoodImage ? `${host}/uploads/${item.FoodImage}.jpg` : avatar} alt="" className="avatar" /></a>
                                                                        </th>
                                                                        <td>{item.FoodName}</td>
                                                                        <td className="fw-bold">{item.UserName}</td>
                                                                        <td className="fw-bold">{item.Quantity}</td>
                                                                        <td className="fw-bold">{item.Value} K VNĐ</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    {/* <!-- End Comment Table --> */}

                                                </div>

                                                <div className="tab-pane fade pt-3" id="denied-order">

                                                    {/* <!-- Users Banned List table --> */}
                                                    <div className="tab-title search nav">
                                                        <h5 className="card-title">Đơn hàng bị từ chối</h5>
                                                        <div className="datatable-search">
                                                            <input className="datatable-input" placeholder="Tìm..." type="search" title="Tìm kiếm trong bảng" />
                                                        </div>

                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    <a className="page-link" style={{ cursor: 'pointer' }} aria-label="Previous" onClick={() => {
                                                                        if (data.deniedPage !== 1) {
                                                                            dispatchData({ type: 'SET_DENIED_PAGE', payload: 1 })
                                                                        }
                                                                    }}>
                                                                        <span aria-hidden="true">«</span>
                                                                    </a>
                                                                </li>

                                                                {
                                                                    Array.from({ length: data.deniedTotalPage }, (_, index) => {
                                                                        if (data.deniedTotalPage > 10) {
                                                                            if (index === 0 ||
                                                                                index === data.deniedTotalPage - 1 ||
                                                                                (index >= data.deniedPage - 2 && index <= data.deniedPage) ||
                                                                                (index === 1 && data.deniedPage > 3) ||
                                                                                (index >= data.deniedTotalPage - 2 && data.deniedPage <= data.deniedTotalPage - 2)
                                                                            ) {

                                                                                return (
                                                                                    <li className={`page-item ${data.deniedPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                        <a className="page-link" onClick={() => {
                                                                                            dispatchData({ type: 'SET_DENIED_PAGE', payload: index + 1 });

                                                                                        }}>{index + 1}</a>
                                                                                    </li>
                                                                                );
                                                                            } else if ((index === 2 && data.deniedPage >= 4) || (index >= data.deniedTotalPage - 3 && data.deniedPage <= data.deniedTotalPage - 3)) {

                                                                                return (
                                                                                    <li key={index + 1} className={`page-item disabled`}><a className="page-link">...</a></li>
                                                                                )
                                                                            }
                                                                        } else {
                                                                            return (
                                                                                <li className={`page-item ${data.deniedPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                    <a className="page-link" onClick={() => dispatchData({ type: 'SET_DENIED_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    })
                                                                }
                                                                <li className="page-item">
                                                                    <a className="page-link" style={{ cursor: 'pointer' }} aria-label="Next" onClick={() => {
                                                                        if (data.deniedPage !== 1) {
                                                                            dispatchData({ type: 'SET_DENIED_PAGE', payload: data.deniedPage })
                                                                        }
                                                                    }}>
                                                                        <span aria-hidden="true">»</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </nav>
                                                    </div>

                                                    <table className="table table-hover table-vcenter table-borderless"
                                                        style={{ textAlign: 'start' }}>
                                                        <thead>
                                                            <tr key={'thead'}>
                                                                <th scope="col" style={{ textAlign: 'center' }}>Ảnh</th>
                                                                <th scope="col">Tên</th>
                                                                <th scope="col">Đơn hàng của người dùng</th>
                                                                <th scope="col">Số lượng</th>
                                                                <th scope="col">Giá trị</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data.denied.map((item, index) => (
                                                                <tr key={item.Id}
                                                                    style={{ cursor: "pointer" }}
                                                                    onClick={() => { handleOrderDetail(item.Id, item.OrderID)  }}
                                                                >
                                                                    <th scope="row" style={{ textAlign: 'center' }}>
                                                                        <a><img src={item.FoodImage ? `${host}/uploads/${item.FoodImage}.jpg` : avatar} alt="" className="avatar" /></a>
                                                                    </th>
                                                                    <td>{item.FoodName}</td>
                                                                    <td className="fw-bold">{item.UserName}</td>
                                                                    <td className="fw-bold">{item.Quantity}</td>
                                                                    <td className="fw-bold">{item.Value} K VNĐ</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    {/* <!-- Users Banned List table --> */}

                                                </div>

                                                <div className="tab-pane fade pt-3" id="made-order">

                                                    {/* <!-- Comment Table --> */}
                                                    <div className="tab-title search nav">
                                                        <h5 className="card-title">Đơn hàng đang làm</h5>

                                                        <div className="datatable-search">
                                                            <input className="datatable-input" placeholder="Tìm..." type="search" title="Tìm kiếm trong bảng" />
                                                        </div>

                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    <a className="page-link" style={{ cursor: 'pointer' }} aria-label="Previous" onClick={() => {
                                                                        if (data.madePage !== 1) {
                                                                            dispatchData({ type: 'SET-SET_MADE_PAGE', payload: 1 })
                                                                        }
                                                                    }}>
                                                                        <span aria-hidden="true">«</span>
                                                                    </a>
                                                                </li>

                                                                {
                                                                    Array.from({ length: data.madeTotalPage }, (_, index) => {
                                                                        if (data.madeTotalPage > 10) {
                                                                            if (index === 0 ||
                                                                                index === data.madeTotalPage - 1 ||
                                                                                (index >= data.madePage - 2 && index <= data.madePage) ||
                                                                                (index === 1 && data.madePage > 3) ||
                                                                                (index >= data.madeTotalPage - 2 && data.madePage <= data.madeTotalPage - 2)
                                                                            ) {

                                                                                return (
                                                                                    <li className={`page-item ${data.madePage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                        <a className="page-link" onClick={() => {
                                                                                            dispatchData({ type: 'SET-SET_MADE_PAGE', payload: index + 1 });

                                                                                        }}>{index + 1}</a>
                                                                                    </li>
                                                                                );
                                                                            } else if ((index === 2 && data.madePage >= 4) || (index >= data.madeTotalPage - 3 && data.madePage <= data.madeTotalPage - 3)) {

                                                                                return (
                                                                                    <li key={index + 1} className={`page-item disabled`}><a className="page-link">...</a></li>
                                                                                )
                                                                            }
                                                                        } else {
                                                                            return (
                                                                                <li className={`page-item ${data.madePage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                    <a className="page-link" onClick={() => dispatchData({ type: 'SET-SET_MADE_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    })
                                                                }
                                                                <li className="page-item">
                                                                    <a className="page-link" style={{ cursor: 'pointer' }} aria-label="Next" onClick={() => {
                                                                        if (data.madePage !== 1) {
                                                                            dispatchData({ type: 'SET-SET_MADE_PAGE', payload: data.madeTotalPage })
                                                                        }
                                                                    }}>
                                                                        <span aria-hidden="true">»</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </nav>

                                                        <table className="table table-hover table-vcenter table-borderless"
                                                            style={{ textAlign: 'start' }}>
                                                            <thead>
                                                                <tr key={'thead'}>
                                                                    <th scope="col" style={{ textAlign: 'center' }}>Ảnh</th>
                                                                    <th scope="col">Tên</th>
                                                                    <th scope="col">Đơn hàng của người dùng</th>
                                                                    <th scope="col">Số lượng</th>
                                                                    <th scope="col">Giá trị</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data.made.map((item, index) => (
                                                                    <tr key={item.Id}
                                                                        style={{ cursor: "pointer" }}
                                                                        onClick={() => { handleOrderDetail(item.Id, item.OrderID)  }}
                                                                    >
                                                                        <th scope="row" style={{ textAlign: 'center' }}>
                                                                            <a><img src={item.FoodImage ? `${host}/uploads/${item.FoodImage}.jpg` : avatar} alt="" className="avatar" /></a>
                                                                        </th>
                                                                        <td>{item.FoodName}</td>
                                                                        <td className="fw-bold">{item.UserName}</td>
                                                                        <td className="fw-bold">{item.Quantity}</td>
                                                                        <td className="fw-bold">{item.Value} K VNĐ</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    {/* <!-- End Comment Table --> */}

                                                </div>

                                                <div className="tab-pane fade pt-3" id="indelivery-order">

                                                    {/* <!-- Users Banned List table --> */}
                                                    <div className="tab-title search nav">
                                                        <h5 className="card-title">Người dùng bị cấm</h5>
                                                        <div className="datatable-search">
                                                            <input className="datatable-input" placeholder="Tìm..." type="search" title="Tìm kiếm trong bảng" />
                                                        </div>

                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    <a className="page-link" style={{ cursor: 'pointer' }} aria-label="Previous" onClick={() => {
                                                                        if (data.inDeliveryPage !== 1) {
                                                                            dispatchData({ type: 'SET_IN_DELIVERY_PAGE', payload: 1 })
                                                                        }
                                                                    }}>
                                                                        <span aria-hidden="true">«</span>
                                                                    </a>
                                                                </li>

                                                                {
                                                                    Array.from({ length: data.inDeliveryTotalPage }, (_, index) => {
                                                                        if (data.inDeliveryTotalPage > 10) {
                                                                            if (index === 0 ||
                                                                                index === data.inDeliveryTotalPage - 1 ||
                                                                                (index >= data.inDeliveryPage - 2 && index <= data.inDeliveryPage) ||
                                                                                (index === 1 && data.inDeliveryPage > 3) ||
                                                                                (index >= data.inDeliveryTotalPage - 2 && data.inDeliveryPage <= data.inDeliveryTotalPage - 2)
                                                                            ) {

                                                                                return (
                                                                                    <li className={`page-item ${data.inDeliveryPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                        <a className="page-link" onClick={() => {
                                                                                            dispatchData({ type: 'SET_IN_DELIVERY_PAGE', payload: index + 1 });

                                                                                        }}>{index + 1}</a>
                                                                                    </li>
                                                                                );
                                                                            } else if ((index === 2 && data.inDeliveryPage >= 4) || (index >= data.inDeliveryTotalPage - 3 && data.inDeliveryPage <= data.inDeliveryTotalPage - 3)) {

                                                                                return (
                                                                                    <li key={index + 1} className={`page-item disabled`}><a className="page-link">...</a></li>
                                                                                )
                                                                            }
                                                                        } else {
                                                                            return (
                                                                                <li className={`page-item ${data.inDeliveryPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                    <a className="page-link" onClick={() => dispatchData({ type: 'SET_IN_DELIVERY_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    })
                                                                }
                                                                <li className="page-item">
                                                                    <a className="page-link" style={{ cursor: 'pointer' }} aria-label="Next" onClick={() => {
                                                                        if (data.inDeliveryPage !== 1) {
                                                                            dispatchData({ type: 'SET_IN_DELIVERY_PAGE', payload: data.inDeliveryTotalPage })
                                                                        }
                                                                    }}>
                                                                        <span aria-hidden="true">»</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </nav>

                                                        <table className="table table-hover table-vcenter table-borderless"
                                                            style={{ textAlign: 'start' }}>
                                                            <thead>
                                                                <tr key={'thead'}>
                                                                    <th scope="col" style={{ textAlign: 'center' }}>Ảnh</th>
                                                                    <th scope="col">Tên</th>
                                                                    <th scope="col">Đơn hàng của người dùng</th>
                                                                    <th scope="col">Số lượng</th>
                                                                    <th scope="col">Giá trị</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data.inDelivery.map((item, index) => (
                                                                    <tr key={item.Id}
                                                                        style={{ cursor: "pointer" }}
                                                                        onClick={() => { handleOrderDetail(item.Id, item.OrderID)  }}
                                                                    >
                                                                        <th scope="row" style={{ textAlign: 'center' }}>
                                                                            <a><img src={item.FoodImage ? `${host}/uploads/${item.FoodImage}.jpg` : avatar} alt="" className="avatar" /></a>
                                                                        </th>
                                                                        <td>{item.FoodName}</td>
                                                                        <td className="fw-bold">{item.UserName}</td>
                                                                        <td className="fw-bold">{item.Quantity}</td>
                                                                        <td className="fw-bold">{item.Value} K VNĐ</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    {/* <!-- Users Banned List table --> */}

                                                </div>

                                                <div className="tab-pane fade pt-3" id="done-order">

                                                    {/* <!-- Comment Table --> */}
                                                    <div className="tab-title search nav">
                                                        <h5 className="card-title">Đơn hàng đã hoàn tất</h5>
                                                        <div className="datatable-search">
                                                            <input className="datatable-input" placeholder="Tìm..." type="search" title="Tìm kiếm trong bảng" />
                                                        </div>

                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    <a className="page-link" style={{ cursor: 'pointer' }} aria-label="Previous" onClick={() => {
                                                                        if (data.donePage !== 1) {
                                                                            dispatchData({ type: 'SET_DONE_PAGE', payload: 1 })
                                                                        }
                                                                    }}>
                                                                        <span aria-hidden="true">«</span>
                                                                    </a>
                                                                </li>

                                                                {
                                                                    Array.from({ length: data.doneTotalPage }, (_, index) => {
                                                                        if (data.doneTotalPage > 10) {
                                                                            if (index === 0 ||
                                                                                index === data.doneTotalPage - 1 ||
                                                                                (index >= data.donePage - 2 && index <= data.donePage) ||
                                                                                (index === 1 && data.donePage > 3) ||
                                                                                (index >= data.doneTotalPage - 2 && data.donePage <= data.doneTotalPage - 2)
                                                                            ) {

                                                                                return (
                                                                                    <li className={`page-item ${data.donePage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                        <a className="page-link" onClick={() => {
                                                                                            dispatchData({ type: 'SET_DONE_PAGE', payload: index + 1 });

                                                                                        }}>{index + 1}</a>
                                                                                    </li>
                                                                                );
                                                                            } else if ((index === 2 && data.donePage >= 4) || (index >= data.doneTotalPage - 3 && data.donePage <= data.doneTotalPage - 3)) {

                                                                                return (
                                                                                    <li key={index + 1} className={`page-item disabled`}><a className="page-link">...</a></li>
                                                                                )
                                                                            }
                                                                        } else {
                                                                            return (
                                                                                <li className={`page-item ${data.donePage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                    <a className="page-link" onClick={() => dispatchData({ type: 'SET_DONE_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    })
                                                                }
                                                                <li className="page-item">
                                                                    <a className="page-link" style={{ cursor: 'pointer' }} aria-label="Next" onClick={() => {
                                                                        if (data.donePage !== 1) {
                                                                            dispatchData({ type: 'SET_DONE_PAGE', payload: data.donePage })
                                                                        }
                                                                    }}>
                                                                        <span aria-hidden="true">»</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </nav>

                                                        <table className="table table-hover table-vcenter table-borderless"
                                                            style={{ textAlign: 'start' }}
                                                        >
                                                            <thead>
                                                                <tr key={'thead'}>
                                                                    <th scope="col" style={{ textAlign: 'center' }}>Ảnh</th>
                                                                    <th scope="col">Tên</th>
                                                                    <th scope="col">Đơn hàng của người dùng</th>
                                                                    <th scope="col">Số lượng</th>
                                                                    <th scope="col">Giá trị</th>
                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                {data.done.map((item, index) => (
                                                                    <tr key={item.Id}
                                                                        style={{ cursor: "pointer" }}
                                                                        onClick={() => { handleOrderDetail(item.Id, item.OrderID) }}
                                                                    >
                                                                        <th scope="row" style={{ textAlign: 'center' }}>
                                                                            <a><img src={item.FoodImage ? `${host}/uploads/${item.FoodImage}.jpg` : avatar} alt="" className="avatar" /></a>
                                                                        </th>
                                                                        <td>{item.FoodName}</td>
                                                                        <td className="fw-bold">{item.UserName}</td>
                                                                        <td className="fw-bold">{item.Quantity}</td>
                                                                        <td className="fw-bold">{item.Value} K VNĐ</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    {/* <!-- End Comment Table --> */}

                                                </div>


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


                            {/* <!-- Recent Activity --> */}
                            <div className="card">
                                {/* <div className="filter">
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
                                </div> */}

                                <div className="card-body">

                                    <h5 className="card-title">Chi tiết đơn hàng</h5>

                                    {
                                        data?.orderDetail?.Id &&
                                        <div className="detail">

                                            <div className="my-3 bg-light">
                                                <dt className="my-2 p-2 pb-1">Mã đơn hàng</dt>
                                                <dd className="ms-4 p-1 ">
                                                    {data?.orderDetail?.Id || " "}
                                                </dd>
                                            </div>

                                            <div className="my-3 bg-light">
                                                <dt className="my-2 p-2 pb-1">Tổng giá tiền</dt>
                                                <dd className="ms-4 p-1 ">
                                                    {data?.orderDetail?.TotalValue + " K VNĐ" || " "}
                                                </dd>
                                            </div>

                                            <div className="my-3 bg-light">
                                                <dt className="my-2 p-2 pb-1">Ngày đặt</dt>
                                                <dd className="ms-4 p-1 ">
                                                    {data?.orderDetail?.CreateAt || " "}
                                                </dd>
                                            </div>

                                            <div className="my-3 bg-light">
                                                <dt className="my-2 p-2 pb-1">Người đặt</dt>
                                                <dd className="d-flex align-items-center ms-4 p-1 ">
                                                    <img src={data?.orderDetail?.UserImage ? `${host}/uploads/${data?.orderDetail?.UserImage}.jpg` : avatar} onError={(e) => { e.target.onerror = null; e.target.src = avatar }} alt="Avatar"
                                                        className="me-2" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                                                    <div>
                                                        <span>{data?.orderDetail?.UserName || " "}</span>
                                                        <span className="ms-2">|</span>
                                                        <span className="ms-2">{data?.orderDetail?.UserEmail}</span>
                                                    </div>
                                                </dd>
                                            </div>

                                            <div className="my-3 bg-light">
                                                <dt className="my-2 p-2 pb-1">Món</dt>
                                                <nav aria-label="Page navigation example">
                                                    <ul className="pagination">
                                                        <li className="page-item">
                                                            <a className="page-link" style={{ cursor: 'pointer' }} aria-label="Previous" onClick={() => {
                                                                if (data.orderDetailItemsPage !== 1) {
                                                                    getOrderItems(1);

                                                                }
                                                            }}>
                                                                <span aria-hidden="true">«</span>
                                                            </a>
                                                        </li>

                                                        {
                                                            Array.from({ length: data.orderDetailItemsTotalPage }, (_, index) => {
                                                                if (data.orderDetailItemsTotalPage > 10) {
                                                                    if (index === 0 ||
                                                                        index === data.orderDetailItemsTotalPage - 1 ||
                                                                        (index >= data.orderDetailItemsPage - 2 && index <= data.orderDetailItemsPage) ||
                                                                        (index === 1 && data.orderDetailItemsPage > 3) ||
                                                                        (index >= data.orderDetailItemsTotalPage - 2 && data.orderDetailItemsPage <= data.orderDetailItemsTotalPage - 2)
                                                                    ) {

                                                                        return (
                                                                            <li className={`page-item ${data.orderDetailItemsPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                <a className="page-link" onClick={() => {
                                                                                    getOrderItems(index + 1);

                                                                                }}>{index + 1}</a>
                                                                            </li>
                                                                        );
                                                                    } else if ((index === 2 && data.orderDetailItemsPage >= 4) || (index >= data.orderDetailItemsTotalPage - 3 && data.orderDetailItemsPage <= data.orderDetailItemsTotalPage - 3)) {

                                                                        return (
                                                                            <li key={index + 1} className={`page-item disabled`}><a className="page-link">...</a></li>
                                                                        )
                                                                    }
                                                                } else {
                                                                    return (
                                                                        <li className={`page-item ${data.orderDetailItemsPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                            <a className="page-link" onClick={() => {
                                                                                getOrderItems(index + 1);
                                                                            }}>{index + 1}</a>
                                                                        </li>
                                                                    );
                                                                }
                                                            })
                                                        }
                                                        <li className="page-item">
                                                            <a className="page-link" style={{ cursor: 'pointer' }} aria-label="Next" onClick={() => {
                                                                if (data.orderDetailItemsPage !== data.orderDetailItemsTotalPage) {
                                                                    getOrderItems(data.orderDetailItemsTotalPage);
                                                                }
                                                            }}>
                                                                <span aria-hidden="true">»</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                                <dd className="ms-4 d-flex align-items-center justify-content-center flex-column">
                                                    {
                                                        // data?.orderDetail?.Items &&
                                                        data?.orderDetailItems?.map((item, index) => (
                                                            <div className={`my-3 row rounded  ${item.Id === idItemSelected ? " bg-secondary text-white" : " bg-white"}`}
                                                                key={item.Id}
                                                                style={{ width: "95%" }}>

                                                                <div className="col-3 d-flex align-items-center justify-content-center">
                                                                    <img src={item.FoodImage ? `${host}/uploads/${item.FoodImage}.jpg` : avatar}
                                                                        onError={(e) => { e.target.onerror = null; e.target.src = avatar }}
                                                                        style={{ width: 60, height: 60, borderRadius: '50%' }}
                                                                        alt="foodImage" className="avatar" />
                                                                </div>

                                                                <div className='col-9'>
                                                                    <div className="col-12">
                                                                        <dt className='p-1 m-0'>
                                                                            Tên
                                                                        </dt>
                                                                        <dd className='ms-3'>
                                                                            {item.FoodName}
                                                                        </dd>
                                                                    </div>

                                                                    <div className='col-12' >
                                                                        <div className='row'>
                                                                            <div className='col-6 '>
                                                                                <dt className='p-1 m-0'>
                                                                                    Số lượng
                                                                                </dt>
                                                                                <dd className='ms-3'>
                                                                                    {item.Quantity}
                                                                                </dd>
                                                                            </div>

                                                                            <div className='col-6 '>
                                                                                <dt className='p-1 m-0'>
                                                                                    Trạng thái
                                                                                </dt>
                                                                                <dd className='ms-3'>
                                                                                    {item.Status === "Waiting" ? "Chờ" : item.Status === "Approved" ? "Đã duyệt" : item.Status === "Cancled" ? "Đã hủy" : item.Status === "Denied" ? "Từ chối" : item.Status === "Made" ? "Đang làm" : item.Status === "InDelivery" ? "Đang giao" : "Hoàn tất"}
                                                                                </dd>
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                </div>


                                                            </div>
                                                        ))
                                                    }
                                                </dd>

                                            </div>

                                        </div>
                                    }

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

export default Discounts