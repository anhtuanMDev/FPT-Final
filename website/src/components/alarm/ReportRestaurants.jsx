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
import discount from '../assets/img/icons/discount.svg';
import error from '../assets/img/icons/error.svg';
import report from '../assets/img/icons/report.svg';
import dot from '../assets/img/icons/dot.svg';
import Swal from 'sweetalert2';

// Image
import avatar from '../assets/img/images/ex_avatar.png';

// Conponent
import React, { useEffect, useReducer, useRef } from 'react'
import { ReactSVG } from 'react-svg';
import { Navigate, useNavigate, useHref } from 'react-router-dom';
import AxiosInstance from '../helpers/AxiosInstance.js';

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. \
Integer sed venenatis leo. Phasellusnon ultrices mauris."

const ReportRestaurants = (prop) => {
    document.title = 'Errors - Users';
    const { host, adminID, setID, adminDetail } = prop;
    const navigate = useNavigate();

    const changePage = (link) => {
        navigate(link)
    }

    const logOut = () => {
        console.log("log out");
        setID('');
    }

    const initialState = {
        loading: false,
        error: [],
        errorPage: 1,
        errorTotal: 1,
        reportInformation: {}
    }

    const [state, setState] = useReducer((state, action) => {
        switch (action.type) {
            case 'LOAD_ERRORS':
                return {
                    ...state,
                    error: action.payload
                }
            case 'CHANGE_TOTALPAGE':
                return {
                    ...state,
                    errorTotal: action.payload
                }
            case 'CHANGE_PAGE':
                return {
                    ...state,
                    errorPage: action.payload
                }
            case 'REPORT_INFORMATION':
                return {
                    ...state,
                    reportInformation: action.payload
                }
            default:
                return state;
        }
    }, initialState)

    {/** Start of getting report Restaurants */ }

    const getReportRestaurants = async () => {
        const response = await AxiosInstance().get('/get-report-restaurants.php');
        if (response.length === 0) {
            setState({ type: 'LOAD_ERRORS', payload: [] })
            setState({ type: 'CHANGE_TOTALPAGE', payload: 1 })
            setState({ type: 'CHANGE_PAGE', payload: 1 })
            return;
        }
        const errorPerPage = response.slice(state.errorPage * 6 - 6, state.errorPage * 6);
        setState({ type: 'LOAD_ERRORS', payload: errorPerPage })
        setState({ type: 'CHANGE_TOTALPAGE', payload: Math.ceil(response.length / 6) })
    }

    useEffect(() => {
        getReportRestaurants();
    }, [])

    {/** End of getting report Restaurants */ }

    {/** Start of reply reports */ }
    const replyUserReports = async (reportID, name, adminID) => {
        Swal.fire({
            title: `Bạn muốn nói gì với ${name}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Gửi',
            input: "textarea",
            inputPlaceholder: "Gõ tin nhắn của bạn ở đây...",
            inputAttributes: {
                "aria-label": "Gõ tin nhắn của bạn ở đây"
            },
            showLoaderOnConfirm: true,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "Rất tiếc thông tin nhập của bạn không hợp lệ!";
                }
            },
            preConfirm: async (resp) => {
                try {
                    const body = {
                        id: reportID,
                        replyBy: adminID,
                        reply: resp
                    }
                    const response = await AxiosInstance().post('/post-report-reply.php', body);
                    if (!response.status) {
                        throw new Error(response.message);
                    }
                    console.log(response)
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        text: `Yêu cầu không thành công: ${error}`
                    })
                }
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    text: `Tin nhắn của bạn đã được gửi tới ${name}`
                })
            }
        })
    }
    {/** End of reply reports */ }

    {/** Start of banning restaurants */ }

    const banRestaurants = async (reportID, name, adminID, status) => {
        Swal.fire({
            title: `Bạn có muốn cấm nhà hàng ${name}`,
            text: "Nhấn nút xác nhận để tiếp tục",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            showLoaderOnConfirm: true,
            preConfirm: async (res) => {
                try {
                    if (res) {
                        const body = {
                            id: reportID,
                            replyBy: adminID,
                            status: status
                        }
                        const response = await AxiosInstance().post('/post-update-status.php', body);
                        if (!response.status) {
                            throw new Error(response.message);
                        }
                        getReportRestaurants();
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        text: `Yêu cầu không thành công: ${error}`
                    })
                }
            },
        });
    }

    {/** End of banning restaurants */ }

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
                        <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" >
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
                        <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li >
                                <a onClick={() => changePage('/informations/users')} >
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
                        <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" aria-expanded="true">
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
                        <a className="nav-link " data-bs-target="#tables-nav" data-bs-toggle="collapse">
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
                        <ul id="tables-nav" className="nav-content collapse show" data-bs-parent="#sidebar-nav">
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
                                <a onClick={() => changePage('/reports/report-restaurants')} className='active'>
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
                    <h1>Báo cáo nhà hàng</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Lỗi</a></li>
                            <li className="breadcrumb-item active">Nhà hàng</li>
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
                                            <div className="tab-content pt-2">

                                                <div className="tab-pane fade show active profile-overview" id="list-users-overview">

                                                    <div className="tab-title search nav">
                                                        <h5 className="card-title">Người dùng xấu</h5>
                                                        <div className="datatable-search">
                                                            <input className="datatable-input" placeholder="Tìm..." type="search" title="Tìm kiếm trong bảng" />
                                                        </div>

                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item" style={{ cursor: 'pointer' }}>
                                                                    <a className="page-link" aria-label="Previous" onClick={() => setState({ type: 'CHANGE_PAGE', payload: 1 })}>
                                                                        <span aria-hidden="true">«</span>
                                                                    </a>
                                                                </li>
                                                                {
                                                                    Array.from({ length: state.errorTotal }, (_, index) => {
                                                                        if (state.errorTotal > 10) {
                                                                            if (index === 0 ||
                                                                                index === state.errorTotal - 1 ||
                                                                                (index >= state.errorPage - 2 && index <= state.errorPage) ||
                                                                                (index === 1 && state.errorPage > 3) ||
                                                                                (index >= state.errorTotal - 2 && state.errorPage <= state.errorTotal - 2)
                                                                            ) {

                                                                                return (
                                                                                    <li className={`page-item ${state.errorPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                        <a className="page-link" onClick={() => {
                                                                                            setState({ type: 'CHANGE_PAGE', payload: index + 1 });

                                                                                        }}>{index + 1}</a>
                                                                                    </li>
                                                                                );
                                                                            } else if ((index === 2 && state.errorPage >= 4) || (index >= state.errorTotal - 3 && state.errorPage <= state.errorTotal - 3)) {

                                                                                return (
                                                                                    <li key={index + 1} className={`page-item disabled`}><a className="page-link">...</a></li>
                                                                                )
                                                                            }
                                                                        } else {
                                                                            return (
                                                                                <li className={`page-item ${state.errorPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                    <a className="page-link" onClick={() => setState({ type: 'CHANGE_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    })
                                                                }
                                                                <li className="page-item" style={{ cursor: 'pointer' }}>
                                                                    <a className="page-link" aria-label="Next" onClick={() => setState({ type: 'CHANGE_PAGE', payload: state.errorTotal })}>
                                                                        <span aria-hidden="true">»</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </nav>
                                                    </div>

                                                    <div className='report-table'>
                                                        <table className="table table-borderless"
                                                        >
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">ID</th>
                                                                    <th scope="col">Người báo cáo</th>
                                                                    <th scope="col">Báo cáo</th>
                                                                    <th scope="col">Hành động</th>
                                                                </tr>
                                                            </thead>
                                                            {
                                                                state.error.map((item, index) => {
                                                                    return (
                                                                        <tbody key={index}>
                                                                            <tr>
                                                                                <td onMouseOver={() => {
                                                                                    console.log(item.Id)
                                                                                }}
                                                                                >{item.Id}</td>
                                                                                <td><a className="text-ember fw-bold">{item.UserName}</a></td>
                                                                                <td className="fw-bold">{item.TargetName}</td>
                                                                                <td className="fw-bold" style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                                    <button type="button" className='btn btn-warning'
                                                                                        onClick={() => replyUserReports(item.Id, item.UserName, "ADM7ANKA7YA7SVSNL5B6")}
                                                                                    >Trả lời</button>
                                                                                    <button type="button" className='btn btn-danger' style={{ marginLeft: 10 }}
                                                                                        onClick={() => banRestaurants(item.Id, item.TargetName, "ADM7ANKA7YA7SVSNL5B6", "Banned")}
                                                                                    >Cấm</button>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 700 }}>Reason for Reporting</td>
                                                                                <td colSpan={3}><a className="text-ember fw-bold">{item.Content || lorem}</a></td>
                                                                            </tr>
                                                                            <tr><td colSpan="4" style={{ height: 45, alignItems: 'center', display: 'flex' }}>
                                                                                <div style={{ width: '100%', height: 1, backgroundColor: 'rgb(204 204 204)', flex: 1 }} />
                                                                            </td></tr>
                                                                        </tbody>
                                                                    )
                                                                }
                                                                )
                                                            }
                                                        </table>
                                                    </div>
                                                </div>
                                                {/* <!-- End List Users Overview Tab --> */}

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

                                <div className="card-body">
                                    <h5 className="card-title">Thông tin báo cáo</h5>

                                    <div className="activity">

                                        {/* <div className="activity-item d-flex">
                                            <div className="activite-label">32 min</div>
                                            <div className="activity-content">
                                                Quia quae rerum <a href="#" className="fw-bold text-dark">explicabo officiis</a> beatae
                                            </div>
                                        </div> */}

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

export default ReportRestaurants