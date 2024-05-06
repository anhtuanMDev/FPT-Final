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
    const { host, adminID, setID, adminDetail } = prop;

    document.title = 'Informations - Users';
    const chartRef = useRef(null);

    const navigate = useNavigate();
    let currentTime = new Date();

    const changePage = (link) => {
        navigate(link);
    };

    const logOut = () => {
        console.log("log out");
        setID('');
    }

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

        usersParticipants: [],
        restaurantParticipants: [],

        eventPage: 1,
        usersParticipantsPage: 1,
        restaurantParticipantsPage: 1,

        eventTotalPage: 1,
        usersParticipantsTotalPage: 1,
        restaurantParticipantsTotalPage: 1,
    };

    const [data, dispatchData] = useReducer((state, action) => {
        switch (action.type) {
            case 'GET_EVENTS':
                return { ...state, events: action.payload };

            case 'GET_EVENT_DETAIL':
                return { ...state, eventDetail: action.payload };

            case 'GET_EVENT_EDIT':
                return { ...state, eventEdit: action.payload };

            case 'GET_USER_PARTICIPANTS':
                return { ...state, userParticipants: action.payload };

            case 'GET_RESTAURANT_PARTICIPANTS':
                return { ...state, restaurantParticipants: action.payload };


            case 'SET_EVENTS_PAGE':
                return { ...state, eventPage: action.payload };

            case 'SET_USER_PARTICIPANTS_PAGE':
                return { ...state, usersParticipantsPage: action.payload };

            case 'SET_RESTAURANT_PARTICIPANTS_PAGE':
                return { ...state, restaurantParticipantsPage: action.payload };


            case 'SET_EVENTS_TOTAL_PAGE':
                return { ...state, eventTotalPage: action.payload };

            case 'SET_USER_PARTICIPANTS_TOTAL_PAGE':
                return { ...state, userParticipantsTotalPage: action.payload };

            case 'SET_RESTAURANT_PARTICIPANTS_TOTAL_PAGE':
                return { ...state, restaurantParticipantsTotalPage: action.payload };

            default:
                return state;
        }
    }, initialState)

    {/** End of declare event storage */ }

    const [showUserParticipants, setShowUserParticipants] = useState(false);

    const [usersParticipantsState, setUsersParticipantsState] = useState(data?.usersParticipants);
    const [usersParticipantsTotalPageState, setUsersParticipantsTotalPageState] = useState(data?.usersParticipantsTotalPage);

    function changeFilter(event, idChangeInnerText) {
        document.getElementById(idChangeInnerText).innerText = event.target.innerText;
        setShowUserParticipants(event.target.innerText === "Người dùng tham gia sự kiện");
    }

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
        // console.log(response.eventDetail);
        dispatchData({ type: "GET_EVENT_DETAIL", payload: response.data });
    }

    const setEventEdit = (eventInfo) => {
        dispatchData({ type: "GET_EVENT_EDIT", payload: eventInfo });
    }

    const loadEventParticipants = async (eventId) => {
        const response = await AxiosInstance().get("get-event-participants.php", { params: { id: eventId } });

        const usersParticipantsLength = response?.eventParticipants?.UsersParticipants?.length;
        const restaurantParticipantsLength = response?.eventParticipants?.RestaurantParticipants?.length;

        let numberItemDisplayed = 5;
        console.log(response);

        let usersParticipantsList = response?.eventParticipants?.UsersParticipants.slice(data?.usersParticipantsPage * numberItemDisplayed - numberItemDisplayed, data?.usersParticipantsPage * numberItemDisplayed);

        setUsersParticipantsState(usersParticipantsList);
        setUsersParticipantsTotalPageState(Math.ceil(usersParticipantsLength / numberItemDisplayed));

        dispatchData({ type: "GET_USER_PARTICIPANTS", payload: usersParticipantsList });
        dispatchData({ type: "SET_USER_PARTICIPANTS_TOTAL_PAGE", payload: Math.ceil(usersParticipantsLength / numberItemDisplayed) });
    }

    useEffect(() => {
        data?.eventDetail && loadEventParticipants(data?.eventDetail?.CouponID);
    }, [data.usersParticipantsPage, data.eventDetail])


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

            document.getElementById('eventTitle').value = '';
            document.getElementById('eventContent').value = '';
            document.getElementById('couponCode').value = '';
            document.getElementById('eventDiscount').value = 0;
            document.getElementById('typeCoupon').value = typeCouponsList[0];
            document.getElementById('couponAmount').value = '';
            document.getElementById('eventStart').value = '';
            document.getElementById('eventEnd').value = '';


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
                                <span className="d-none d-md-block dropdown-toggle ps-2">{adminDetail?.Name || <span className='c-4'>No name</span> } </span>
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
                        <a className="nav-link " data-bs-target="#forms-nav" data-bs-toggle="collapse">
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
                                <a onClick={() => changePage('/incomes/discount')} className='active'>
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
                    <h1>Giảm giá</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a>Thu nhập</a></li>
                            <li className="breadcrumb-item active">Giảm giá</li>
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
                                                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#event-list">Danh sách sự kiện</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#event-edit">Chỉnh sửa sự kiện</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#create-event">Tạo sự kiện mới</button>
                                                </li>

                                                {/* <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#coupon-edit">Coupon edit</button>
                                                </li> */}
                                            </ul>

                                            <div className="tab-content pt-2">

                                                {/*Event list*/}
                                                <div className="tab-pane fade show active" id="event-list">
                                                    <div className="tab-title search nav">
                                                        <h5 className="card-title">Danh sách sự kiện</h5>
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
                                                                    <th>Tiêu đề</th>
                                                                    {/* <th>Content</th> */}
                                                                    <th>Giảm giá</th>
                                                                    <th>Ngày bắt đầu</th>
                                                                    <th>Ngày kết thúc</th>
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
                                                        <h5 className="card-title text-center pb-0 fs-4">Chỉnh sửa sự kiện</h5>
                                                        {/* <p className="text-center small">Enter information to create</p> */}
                                                    </div>

                                                    <form className='row g-3 needs-validation .update-event'>
                                                        <div className='col-12'>
                                                            <label htmlFor="eventTitle-edit" className="form-label">Tiêu đề sự kiện</label>
                                                            <div className='input-group'>
                                                                <input type='text' className='form-control' id='eventTitle-edit' name='eventTitle-edit' required />
                                                            </div>
                                                            <div className='invalid-feedback'>Xin vui lòng nhập Tiêu đề sự kiện!</div>
                                                        </div>

                                                        <div className='col-12'>
                                                            <label htmlFor="eventContent-edit" className="form-label">Nội dung sự kiện</label>
                                                            <div className='input-group'>
                                                                <textarea type='text' className='form-control' id='eventContent-edit' name='eventContent-edit' rows="5" required />
                                                            </div>
                                                            <div className='invalid-feedback'>Xin vui lòng nhập Nội dung sự kiện!</div>
                                                        </div>

                                                        <div className="col-12" >
                                                            <div className='row'>
                                                                <div className="col-3" >
                                                                    <label htmlFor="couponCode-edit" className="form-label">Mã phiếu mua hàng</label>
                                                                    <div className='input-group'>
                                                                        <input type='text' className='form-control' id='couponCode-edit' name='couponCode-edit' required maxLength={6} />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Xin vui lòng nhập Mã phiếu mua hàng!</div>
                                                                </div>

                                                                <div className="col-3" >
                                                                    <label htmlFor="eventDiscount-edit" className="form-label">Giảm giá (%)</label>
                                                                    <div className='input-group'>
                                                                        <input type='number' className='form-control' id='eventDiscount-edit' name='eventDiscount-edit' required maxLength={2} min={0} max={100} />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Xin vui lòng nhập Giảm giá!</div>
                                                                </div>

                                                                <div className="col-3" >
                                                                    <label htmlFor="typeCoupon-edit" className="form-label">Loại phiếu mua hàng</label>
                                                                    <select className="form-select" id="typeCoupon-edit" required onChange={(event) => { setTypeCouponEdit(event.target.value) }}>
                                                                        {
                                                                            typeCouponsList.map((item, index) => (
                                                                                <option key={index} value={item} defaultValue={index === 1}>{item}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>

                                                                <div className="col-3 " >
                                                                    <label htmlFor="couponAmount-edit" className="form-label" >Số lượng phiếu mua hàng</label>
                                                                    <div className='input-group'>
                                                                        <input type='numcer' className='form-control' id='couponAmount-edit' name='couponAmount-edit' required disabled={typeCouponEdit !== "Count"} />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Xin vui lòng nhập Số lượng phiếu mua hàng!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12" >
                                                            <div className='row'>
                                                                <div className="col-6" >
                                                                    <label htmlFor="eventStart-edit" className="form-label">Ngày bắt đầu</label>
                                                                    <div className='input-group'>
                                                                        <input type='datetime-local' className='form-control' id='eventStart-edit' name='eventStart-edit' required />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Xin vui lòng nhập Ngày bắt đầu!</div>
                                                                </div>

                                                                <div className="col-6 " >
                                                                    <label htmlFor="eventEnd-edit" className="form-label">Ngày kết thúc</label>
                                                                    <div className='input-group'>
                                                                        <input type='datetime-local' className='form-control' id='eventEnd-edit' name='eventEnd-edit' required />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Xin vui lòng nhập Ngày kết thúc!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12">
                                                            <button className="btn btn-primary w-100" type="button" style={{ background: '#fd7e14', marginTop: 50, borderWidth: 0 }}
                                                                onClick={(event) => {
                                                                    console.log("press update event");
                                                                    handleUpdateEvent(event, data?.eventEdit);
                                                                }}>Cập nhật</button>
                                                        </div>
                                                    </form>
                                                </div>
                                                {/*End Event edit*/}

                                                {/*Create event*/}
                                                <div className="tab-pane fade" id="create-event">
                                                    <div className='row'>
                                                        {/* <div className="col-2 pt-4 pb-2 ">
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
                                                        </div> */}

                                                        <div className="col-12">
                                                            <div className="pt-4 pb-2 tab-title">
                                                                <h5 className="card-title text-center pb-0 fs-4">Tạo sự kiện</h5>
                                                                <p className="text-center small">Nhập thông tin để tạo</p>
                                                            </div>
                                                        </div>
                                                    </div>



                                                    <form className='row g-3 needs-validation create-event'>
                                                        <div className='col-12'>
                                                            <label htmlFor="eventTitle" className="form-label">Tiêu đề sự kiện</label>
                                                            <div className='input-group'>
                                                                <input type='text' className='form-control' id='eventTitle' name='eventTitle' required defaultValue={"Khuyến mãi mùa hè"}/>
                                                            </div>
                                                            <div className='invalid-feedback'>Xin vui lòng nhập Tiêu đề sự kiện!</div>
                                                        </div>

                                                        <div className='col-12'>
                                                            <label htmlFor="eventContent" className="form-label">Nội dung sự kiện</label>
                                                            <div className='input-group'>
                                                                <textarea type='text' className='form-control' id='eventContent' name='eventContent' rows="5" required defaultValue={"Giảm giá lên đến 30%"}/>
                                                            </div>
                                                            <div className='invalid-feedback'>Xin vui lòng nhập Nội dung sự kiện!</div>
                                                        </div>

                                                        <div className="col-12" >
                                                            <div className='row'>
                                                                <div className="col-3" >
                                                                    <label htmlFor="couponCode" className="form-label">Mã phiếu mua hàng</label>
                                                                    <div className='input-group'>
                                                                        <input type='text' className='form-control' id='couponCode' name='couponCode' required maxLength={6} defaultValue={"AHDUD6"}/>
                                                                    </div>
                                                                    <div className='invalid-feedback'>Xin vui lòng nhập Mã phiếu mua hàng!</div>
                                                                </div>

                                                                <div className="col-3" >
                                                                    <label htmlFor="eventDiscount" className="form-label">Giảm giá (%)</label>
                                                                    <div className='input-group'>
                                                                        <input type='number' className='form-control' id='eventDiscount' name='eventDiscount' required maxLength={2} min={0} max={100} defaultValue={20} />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Xin vui lòng nhập Giảm giá!</div>
                                                                </div>

                                                                <div className="col-3" >
                                                                    <label htmlFor="typeCoupon" className="form-label">Loại phiếu mua hàng</label>
                                                                    <select className="form-select" id="typeCoupon" required onChange={(event) => { setTypeCoupon(event.target.value) }}>
                                                                        {
                                                                            typeCouponsList.map((item, index) => (
                                                                                <option key={index} value={item} defaultValue={index === 1}>{item}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>

                                                                <div className="col-3 " >
                                                                    <label htmlFor="couponAmount" className="form-label" >Số lượng phiếu mua hàng</label>
                                                                    <div className='input-group'>
                                                                        <input type='numcer' className='form-control' id='couponAmount' name='couponAmount' required disabled={typeCoupon !== "Count"} />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Xin vui lòng nhập Số lượng phiếu mua hàng!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12" >
                                                            <div className='row'>
                                                                <div className="col-6" >
                                                                    <label htmlFor="eventStart" className="form-label">Ngày bắt đầu</label>
                                                                    <div className='input-group'>
                                                                        <input type='datetime-local' className='form-control' id='eventStart' name='eventStart' required/>
                                                                    </div>
                                                                    <div className='invalid-feedback'>Xin vui lòng nhập Ngày bắt đầu!</div>
                                                                </div>

                                                                <div className="col-6 " >
                                                                    <label htmlFor="eventEnd" className="form-label">Ngày kết thúc</label>
                                                                    <div className='input-group'>
                                                                        <input type='datetime-local' className='form-control' id='eventEnd' name='eventEnd' required />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Xin vui lòng nhập Ngày kết thúc!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12">
                                                            <button className="btn btn-primary w-100" type="button" style={{ background: '#fd7e14', marginTop: 50, borderWidth: 0 }}
                                                                onClick={(event) => {
                                                                    console.log("press create event");
                                                                    handleCreateEvent(event);

                                                                }}>Tạo</button>
                                                        </div>
                                                    </form>
                                                </div>
                                                {/*End Create event*/}

                                                {/*Coupon edit*/}
                                                <div className="tab-pane fade" id="coupon-edit">
                                                    <div className="pt-4 pb-2 tab-title">
                                                        <h5 className="card-title text-center pb-0 fs-4">Chỉnh sửa Phiếu mua hàng</h5>
                                                        {/* <p className="text-center small">Enter information to create</p> */}
                                                    </div>

                                                    <form className='row g-3 needs-validation'>
                                                        <div className='col-12'>
                                                            <label htmlFor="couponCode-editCoupon" className="form-label">Mã phiếu mua hàng</label>
                                                            <div className='input-group'>
                                                                <input type='text' className='form-control' id='couponCode-editCoupon' name='couponCode-editCoupon' required />
                                                            </div>
                                                            <div className='invalid-feedback'>Xin vui lòng nhập Mã phiếu mua hàng!</div>
                                                        </div>

                                                        <div className="col-12" >
                                                            <div className='row'>
                                                                <div className="col-6" >
                                                                    <label htmlFor="couponDiscount-editCoupon" className="form-label">Giảm giá (%)</label>
                                                                    <div className='input-group'>
                                                                        <input type='number' className='form-control' id='couponDiscount-editCoupon' name='couponDiscount-editCoupon' required min={0} max={100} />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Xin vui lòng nhập Giảm giá!</div>
                                                                </div>

                                                                <div className="col-3" >
                                                                    <label htmlFor="typeCoupon-editCoupon" className="form-label">Loại</label>
                                                                    <select className="form-select" id="typeCoupon-editCoupon" required onChange={(event) => { setTypeCouponCouponEdit(event.target.value) }}>
                                                                        {
                                                                            typeCouponsList.map((item, index) => (
                                                                                <option key={index} value={item} defaultValue={index === 1}>{item}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>

                                                                <div className="col-3 " >
                                                                    <label htmlFor="couponAmount-editCoupon" className="form-label" >Số lượng phiếu mua hàng</label>
                                                                    <div className='input-group'>
                                                                        <input type='numcer' className='form-control' id='couponAmount-editCoupon' name='couponAmount-editCoupon' required disabled={typeCouponEdit !== "Count"} />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Xin vui lòng nhập Số lượng phiếu mua hàng!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12" >
                                                            <div className='row'>
                                                                <div className="col-6" >
                                                                    <label htmlFor="couponStart-editCoupon" className="form-label">Ngày bắt đầu</label>
                                                                    <div className='input-group'>
                                                                        <input type='datetime-local' className='form-control' id='couponStart-editCoupon' name='couponStart-editCoupon' required />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Xin vui lòng nhập Ngày bắt đầu</div>
                                                                </div>

                                                                <div className="col-6 " >
                                                                    <label htmlFor="couponEnd-editCoupon" className="form-label">Ngày kết thúc</label>
                                                                    <div className='input-group'>
                                                                        <input type='datetime-local' className='form-control' id='couponEnd-editCoupon' name='couponEnd-editCoupon' required />
                                                                    </div>
                                                                    <div className='invalid-feedback'>Xin vui lòng nhập Ngày kết thúc!</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12">
                                                            <button className="btn btn-primary w-100" type="button" style={{ background: '#fd7e14', marginTop: 50, borderWidth: 0 }}
                                                                onClick={(event) => {
                                                                    console.log("press create admin");
                                                                    // handleCreateAccount(event);

                                                                }}>Cập nhật</button>
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
                    </div>
                    {
                        data?.eventDetail &&
                        <div className="row">

                            {/* <!-- Left side columns --> */}
                            <div className="col-lg-8">
                                <div className="row">

                                    {/* <!-- Event Detail --> */}

                                    <div className="col-12">
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
                                                <h5 className="card-title">Chi tiết sự kiện</h5>

                                                <dl className="detail">

                                                    <div className="my-3 bg-light">
                                                        <dt className="my-2 p-2">Tiêu đề</dt>
                                                        <dd className="ms-4 p-1 ">
                                                            {data?.eventDetail?.Title || " "}
                                                        </dd>
                                                    </div>

                                                    {/* <!-- End detail item--> */}

                                                    <div className="my-3 bg-light">
                                                        <dt className="my-2 p-2" >Nội dung</dt>
                                                        <dd className="ms-4 p-1 ">
                                                            {data?.eventDetail?.Content || " "}
                                                        </dd>
                                                    </div>
                                                    {/* <!-- End detail item--> */}

                                                    <div className="my-3 bg-light">
                                                        <dt className="my-2 p-2">Bắt đầu</dt>
                                                        <dd className="ms-4 p-1 ">
                                                            {data?.eventDetail?.Start || " "}
                                                        </dd>
                                                    </div>
                                                    {/* <!-- End detail item--> */}

                                                    <div className="my-3 bg-light">
                                                        <dt className="my-2 p-2">Kết thúc</dt>
                                                        <dd className="ms-4 p-1 ">
                                                            {data?.eventDetail?.End || " "}
                                                        </dd>
                                                    </div>
                                                    {/* <!-- End detail item--> */}

                                                    <div className="my-3 bg-light">
                                                        <dt className="my-2 p-2">Được tạo lúc</dt>
                                                        <dd className="ms-4 p-1 ">
                                                            {data?.eventDetail?.CreateAt || " "}
                                                        </dd>
                                                    </div>
                                                    {/* <!-- End detail item--> */}
                                                    <div className="my-3 bg-light">
                                                        <dt className="my-2 p-2">Được tạo bởi</dt>
                                                        <dd className="d-flex align-items-center ms-4 p-1 ">
                                                            <img src={data?.eventDetail?.ImageCreateBy ? `${host}/uploads/${data?.eventDetail?.ImageCreateBy}.jpg` : avatar} onError={(e) => { e.target.onerror = null; e.target.src = avatar }} alt="Avatar"
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
                                                            <dt className="my-2 p-2">Được cập nhật lúc</dt>
                                                            <dd className="ms-4 p-1 ">
                                                                {data?.eventDetail?.UpdateAt || " "}
                                                            </dd>
                                                        </div>
                                                    }
                                                    {/* <!-- End detail item--> */}

                                                    {
                                                        data?.eventDetail?.UpdateBy &&
                                                        <div className="my-3 bg-light">
                                                            <dt className="my-2 p-2">Được cập nhật bởi</dt>
                                                            <dd className="d-flex align-items-center ms-4 p-1 ">
                                                                <img src={data?.eventDetail?.ImageUpdateBy ? `${host}/uploads/${data?.eventDetail?.ImageUpdateBy}.jpg` : avatar} onError={(e) => { e.target.onerror = null; e.target.src = avatar }} alt="Avatar"
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
                                                        <dt className="my-2 p-2">Mã phiếu mua hàng</dt>
                                                        <dd className="ms-4 p-1 ">
                                                            {data?.eventDetail?.CouponCode || " "}
                                                        </dd>
                                                    </div>
                                                    {/* <!-- End detail item--> */}

                                                    <div className="my-3 bg-light">
                                                        <dt className="my-2 p-2">Giảm</dt>
                                                        <dd className="ms-4 p-1 ">
                                                            {data?.eventDetail?.Discount + '(%)' || " "}
                                                        </dd>
                                                    </div>
                                                    {/* <!-- End detail item--> */}

                                                    <div className="my-3 bg-light">
                                                        <dt className="my-2 p-2">Loại phiếu mua hàng</dt>
                                                        <dd className="ms-4 p-1 ">
                                                            {data?.eventDetail?.Type || " "}
                                                        </dd>
                                                    </div>
                                                    {/* <!-- End detail item--> */}
                                                    {
                                                        !(data?.eventDetail?.Amount === -1 || data?.eventDetail?.Amount === null) &&
                                                        <div className="my-3 bg-light">
                                                            <dt className="my-2 p-2">Số lượng</dt>
                                                            <dd className="ms-4 p-1 ">
                                                                {data?.eventDetail?.Amount}
                                                            </dd>
                                                        </div>
                                                    }
                                                    {/* <!-- End detail item--> */}

                                                </dl>

                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- End Event Detail --> */}

                                </div>
                            </div>
                            {/* <!-- End Left side columns --> */}


                            {/* <!-- Right side columns --> */}
                            <div className="col-lg-4">
                                {/* code here */}
                                <div className="col-12">
                                    <div className="card">
                                        <div className="filter" style={{ cursor: "pointer" }}>
                                            <a className="icon" data-bs-toggle="dropdown">
                                                <ReactSVG
                                                    src={more}
                                                />
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><button type="button" className="dropdown-item"

                                                    onClick={(event) => {
                                                        changeFilter(event, 'name-participating-list');
                                                    }}>Nhà hàng tham gia sự kiện</button></li>

                                                <li><button type="button" className="dropdown-item"

                                                    onClick={(event) => {
                                                        changeFilter(event, 'name-participating-list');
                                                    }}>Người dùng tham gia sự kiện</button></li>
                                            </ul>
                                        </div>

                                        <div className="card-body">
                                            <h5 className="card-title" id='name-participating-list'>Nhà hàng tham gia sự kiện</h5>
                                            {
                                                showUserParticipants &&
                                                <div className="showUserParticipants">
                                                    <div className="search nav">
                                                        <div className="datatable-search">
                                                            <input className="datatable-input" placeholder="Tìm..." type="search" title="Search within table" />
                                                        </div>
                                                    </div>
                                                    <div className='p-2'>
                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    <a className="page-link" aria-label="Previous" style={{ cursor: 'pointer' }} onClick={() => {
                                                                        dispatchData({ type: 'SET_USER_PARTICIPANTS_PAGE', payload: 1 })
                                                                    }}>
                                                                        <span aria-hidden="true">«</span>
                                                                    </a>
                                                                </li>
                                                                {
                                                                    Array.from({ length: usersParticipantsTotalPageState }, (_, index) => {
                                                                        if (usersParticipantsTotalPageState > 10) {
                                                                            if ((index >= data.usersParticipantsPage - 2 && index <= data.usersParticipantsPage + 1) || // 2 pages before and after current page
                                                                                index >= usersParticipantsTotalPageState - 2) { // last 2 pages
                                                                                return (
                                                                                    <li className={`page-item ${data.usersParticipantsPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                        <a className="page-link" onClick={() => dispatchData({ type: 'SET_USER_PARTICIPANTS_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                    </li>
                                                                                );
                                                                            }
                                                                        } else {
                                                                            return (
                                                                                <li className={`page-item ${data.usersParticipantsPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                    <a className="page-link" onClick={() => dispatchData({ type: 'SET_USER_PARTICIPANTS_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    })
                                                                }
                                                                <li className="page-item">
                                                                    <a className="page-link" aria-label="Next" style={{ cursor: 'pointer' }} onClick={() => { dispatchData({ type: 'SET_USER_PARTICIPANTS_PAGE', payload: usersParticipantsTotalPageState }) }}>
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
                                                                    <th>Ảnh</th>
                                                                    <th>Tên</th>
                                                                    <th>Email</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    usersParticipantsState?.map((item, index) => (
                                                                        <tr
                                                                            key={item.Id}
                                                                        // style={{ cursor: "pointer" }}
                                                                        >
                                                                            <td scope="row" style={{ textAlign: 'center' }}>
                                                                                <a><img src={item.Image ? `${host}/uploads/${item.Image}.jpg` : avatar}
                                                                                    onError={(e) => { e.target.onerror = null; e.target.src = avatar }} alt="Avatar"
                                                                                    className="me-2 avatar" style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                                                                                /></a>
                                                                            </td>
                                                                            <td style={{ justifyContent: 'center' }}>{item.Name}</td>
                                                                            <td className="fw-bold">{item.Email}</td>
                                                                        </tr>
                                                                    ))}
                                                            </tbody>
                                                        </table>

                                                    </div>

                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- End Right side columns --> */}

                        </div>
                    }
                </section>
                {/* <!-- End Secion --> */}

            </main>
            {/* <!-- End Main --> */}
        </div >
    )
}

export default Discounts