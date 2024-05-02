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
import eye_open from '../assets/img/icons/eye-open.svg';
import eye_close from '../assets/img/icons/eye-close.svg';
import restaurant_banned from '../assets/img/icons/restaurant_banned.svg';
import more from '../assets/img/icons/more.svg';
// Image
import avatar from '../assets/img/images/ex_avatar.png';

// Conponent
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { ReactSVG } from 'react-svg';
import ApexCharts from 'apexcharts';
import { Navigate, useNavigate, useHref } from 'react-router-dom';
import Swal from 'sweetalert2'
import AxiosInstance from '../helpers/AxiosInstance.js';


const Staffs = (prop) => {
    const { host, adminID, setID, adminDetail } = prop;

    document.title = 'Informations - Staffs';
    const chartRef = useRef(null);
    const navigate = useNavigate();
    const [color, setColor] = useState('#4154f1');

    const changePage = (link) => {
        navigate(link);
    };

    const logOut = () => {
        console.log("log out");
        setID('');
    }

    const jobList = ['Admin', 'Manager', 'Other'];

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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

    const initialState = {
        allStaffs: [],
        reqPassChange: [],

        allStaffPage: 1,
        reqPassChangePage: 1,

        allStaffTotalPage: 1,
        reqPassChangeTotalPage: 1
    }

    const [data, dispatchData] = useReducer((state, action) => {
        switch (action.type) {
            case 'GET_ALL_STAFFS':
                return { ...state, allStaffs: action.payload };
            case 'GET_REQ_PASS_CHANGE':
                return { ...state, reqPassChange: action.payload };

            case 'SET_ALL_STAFF_PAGE':
                return { ...state, allStaffPage: action.payload };
            case 'SET_REQ_PASS_CHANGE_PAGE':
                return { ...state, reqPassChangePage: action.payload };

            case 'SET_ALL_STAFF_TOTAL_PAGE':
                return { ...state, allStaffTotalPage: action.payload };
            case 'SET_REQ_PASS_CHANGE_TOTAL_PAGE':
                return { ...state, reqPassChangeTotalPage: action.payload };

            default:
                return state;
        }
    }, initialState);


    {/** Get staff list */ }

    const loadAllStaffs = async () => {
        try {
            const response = await AxiosInstance().get('/get-all-staffs.php');
            // only take 5 users
            const length = response.staffs.length;
            console.log(response);

            let list = response.staffs.slice(data.allStaffPage * 5 - 5, data.allStaffPage * 5);

            dispatchData({ type: 'GET_ALL_STAFFS', payload: list });
            dispatchData({ type: 'SET_ALL_STAFF_TOTAL_PAGE', payload: (Math.ceil(length / 5)) });
        } catch (error) {
            console.log("Fail to get staffs because of: " + error);
        }
    }

    useEffect(() => {
        loadAllStaffs();
    }, [data.allStaffPage]);

    {/** End of get staff list */ }

    {/** Get staff list request password change */ }

    const loadAllStaffsReqPassChange = async () => {
        try {
            const response = await AxiosInstance().get('/get-staffs-req-pass-change.php');
            // only take 5 users
            const length = response.staffs.length;

            let list = response.staffs.slice(data.allStaffPage * 5 - 5, data.allStaffPage * 5);

            dispatchData({ type: 'GET_REQ_PASS_CHANGE', payload: list });
            dispatchData({ type: 'SET_REQ_PASS_CHANGE_TOTAL_PAGE', payload: (Math.ceil(length / 5)) });
        } catch (error) {
            console.log("Fail to get staffs because of: " + error);
        }
    }

    useEffect(() => {
        loadAllStaffsReqPassChange();
    }, [data.reqPassChangePage]);

    {/** End of get staff list request password change */ }


    const generateID = (prefix) => {
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = prefix;
        for (let i = 0; i < 17; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const generateRandomOTP = () => {
        const length = 6; // Độ dài của mã OTP
        let otp = '';
        for (let i = 0; i < length; i++) {
            otp += Math.floor(Math.random() * 10); // Chọn một số ngẫu nhiên từ 0 đến 9 và thêm vào chuỗi OTP
        }
        return otp;
    };

    const sendOTP = async () => {
        let email = document.getElementById('yourUsername').value;
        Swal.fire({
            title: 'Đang gửi',
            html: 'Vui lòng chờ...',
            allowOutsideClick: false,
        });
        const response = await AxiosInstance().post('/post-send-register-email-admin.php', { email, token: generateRandomOTP(), type: 'Đăng ký tài khoản' });
        console.log(response);

        if (response.status) {
            console.log("success");
            Swal.fire({
                title: 'Thành công',
                text: 'Mã xác thực đã được gửi',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        } else {
            console.log("failed");
            Swal.fire({
                title: 'Thất bại',
                text: response.statusText,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    };


    const handleCreateAccount = async (event) => {
        event.preventDefault(); // prevent form submission
        console.log("press in")
        let boole = true;
        var needsValidation = document.querySelectorAll('.needs-validation');

        Array.prototype.slice.call(needsValidation)
            .forEach(function (form) {
                if (!form.checkValidity()) {
                    event.stopPropagation();
                    form.classList.add('was-validated');
                    boole = false;
                }
            });

        if (!boole) return;

        let name = document.getElementById('yourName').value;
        let email = document.getElementById('yourUsername').value;
        let password = document.getElementById('yourPassword').value;
        let job = document.getElementById('yourJob').value;
        console.log(email, password);


        const response = await AxiosInstance().post('/create-admin.php', { name, email, password, job });
        console.log(response.statusText);

        if (response.status) {
            console.log("success");
            Swal.fire({
                title: 'Thành công',
                text: 'Tạo tài khoản thành công',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            if (!fileImage) return;

            const formData = new FormData();
            const id = generateID('IMG');
            // console.log(fileImage);
            formData.append('image', fileImage, `${id}.jpg`);

            // formData.append('image', {
            //     uri: image,
            //     name: `${id}.jpg`,
            //     type: 'image/jpg',
            // });
            // console.log(formData);

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
                title: 'Thât bại',
                // text: 'Account creation failed',
                text: response.statusText,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }


    }

    const handleResetPass = async (resetterId, resetRequesterId) => {
        const response = await AxiosInstance().post('/reset-pass-admin.php', { resetterId, resetRequesterId });
        console.log(response.statusText);

        if (response.status) {
            console.log("success");
            loadAllStaffsReqPassChange();
            Swal.fire({
                title: 'Thành công',
                text: 'Đặt lại mật khẩu thành công',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        } else {
            console.log("failed");
            Swal.fire({
                title: 'Thất bại',
                text: 'Đặt lại mật khẩu thất bại',
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
                        <a className="nav-link" onClick={() => changePage('/informations/staffs')}>
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

            {/* <!-- ======= Main ======= --> */}
            <main id="main" className="main">
                {/* <!-- ======= Main ======= --> */}
                <div className="pagetitle">
                    <h1>Nhân viên</h1>
                    <nav>
                        <ol className="breadcrumb">
                            {/* <li className="breadcrumb-item"><a href="#">Informations</a></li> */}
                            <li className="breadcrumb-item active">Nhân viên</li>
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
                                                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#staffs-list">Danh sách</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#req-pass-change-list">Yêu cầu đổi mật khẩu</button>
                                                </li>

                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#create-account">Tạo tài khoản</button>
                                                </li>

                                            </ul>
                                            <div className="tab-content pt-2">

                                                {/* <!-- Restaurant List Table --> */}
                                                <div className="tab-pane fade show active staffs-list" id="staffs-list">
                                                    <div className="tab-title search nav">
                                                        <h5 className="card-title">Staffs List</h5>
                                                        <div className="datatable-search">
                                                            <input className="datatable-input" placeholder="Tìm..." type="search" title="Tìm kiếm trong bảng" />
                                                        </div>

                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    <a className="page-link" aria-label="Previous" style={{ cursor: 'pointer' }} onClick={() => {
                                                                        dispatchData({ type: 'SET_ALL_STAFF_PAGE', payload: 1 })
                                                                    }}>
                                                                        <span aria-hidden="true">«</span>
                                                                    </a>
                                                                </li>
                                                                {
                                                                    Array.from({ length: data.allStaffTotalPage }, (_, index) => {
                                                                        if (data.allStaffTotalPage > 10) {
                                                                            if (index === 0 ||
                                                                                index === data.allStaffTotalPage - 1 ||
                                                                                (index >= data.allStaffPage - 2 && index <= data.allStaffPage) ||
                                                                                (index === 1 && data.allStaffPage > 3) ||
                                                                                (index >= data.allStaffTotalPage - 2 && data.allStaffPage <= data.allStaffTotalPage - 2)
                                                                            ) {

                                                                                return (
                                                                                    <li className={`page-item ${data.allStaffPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                        <a className="page-link" onClick={() => {
                                                                                            dispatchData({ type: 'SET_ALL_STAFF_PAGE', payload: index + 1 });

                                                                                        }}>{index + 1}</a>
                                                                                    </li>
                                                                                );
                                                                            } else if ((index === 2 && data.allStaffPage >= 4) || (index >= data.allStaffTotalPage - 3 && data.allStaffPage <= data.allStaffTotalPage - 3)) {

                                                                                return (
                                                                                    <li key={index + 1} className={`page-item disabled`}><a className="page-link">...</a></li>
                                                                                )
                                                                            }
                                                                        } else {
                                                                            return (
                                                                                <li className={`page-item ${data.allStaffPage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                    <a className="page-link" onClick={() => dispatchData({ type: 'SET_ALL_STAFF_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    })
                                                                }
                                                                <li className="page-item">
                                                                    <a className="page-link" aria-label="Next" style={{ cursor: 'pointer' }} onClick={() => { dispatchData({ type: 'SET_ALL_STAFF_PAGE', payload: data.allStaffTotalPage }) }}>
                                                                        <span aria-hidden="true">»</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </nav>
                                                    </div>

                                                    <table className="table table-borderless table-hover table-vcenter"
                                                        style={{ textAlign: 'start' }}
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" style={{ textAlign: 'center' }}>Ảnh</th>
                                                                <th scope="col">Tên</th>
                                                                <th scope="col">Email</th>
                                                                <th scope='col'>Công việc</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                data?.allStaffs?.map((item, index) => (
                                                                    <tr key={item.Id}>
                                                                        <td scope="row" style={{ textAlign: 'center' }}>
                                                                            <a><img src={item.Image ? `${host}/uploads/${item.Image}.jpg` : avatar} onError={(e) => { e.target.onerror = null; e.target.src = avatar }} alt="Avatar" className="avatar" /></a>
                                                                        </td>
                                                                        <td style={{ justifyContent: 'center' }}>{item.Name}</td>
                                                                        <td className="fw-bold">{item.Email}</td>
                                                                        <td>{item.Job}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>

                                                </div>
                                                {/* <!-- End Restaurants List Tab --> */}

                                                {/* <!-- Request Password Change List Table --> */}
                                                <div className="tab-pane fade req-pass-change-list" id="req-pass-change-list">
                                                    <div className="tab-title search nav">
                                                        <h5 className="card-title">Danh sách nhân viê yêu cầu đổi mật khẩu</h5>
                                                        <div className="datatable-search">
                                                            <input className="datatable-input" placeholder="Tìm..." type="search" title="Tìm kiếm trong bảng" />
                                                        </div>

                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item">
                                                                    <a className="page-link" aria-label="Previous" style={{ cursor: 'pointer' }} onClick={() => {
                                                                        dispatchData({ type: 'SET_REQ_PASS_CHANGE_PAGE', payload: 1 })
                                                                    }}>
                                                                        <span aria-hidden="true">«</span>
                                                                    </a>
                                                                </li>
                                                                {
                                                                    Array.from({ length: data.reqPassChangeTotalPage }, (_, index) => {
                                                                        if (data.reqPassChangeTotalPage > 10) {
                                                                            if (index === 0 ||
                                                                                index === data.reqPassChangeTotalPage - 1 ||
                                                                                (index >= data.reqPassChangePage - 2 && index <= data.reqPassChangePage) ||
                                                                                (index === 1 && data.reqPassChangePage > 3) ||
                                                                                (index >= data.reqPassChangeTotalPage - 2 && data.reqPassChangePage <= data.reqPassChangeTotalPage - 2)
                                                                            ) {

                                                                                return (
                                                                                    <li className={`page-item ${data.reqPassChangePage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                        <a className="page-link" onClick={() => {
                                                                                            dispatchData({ type: 'SET_REQ_PASS_CHANGE_PAGE', payload: index + 1 });

                                                                                        }}>{index + 1}</a>
                                                                                    </li>
                                                                                );
                                                                            } else if ((index === 2 && data.reqPassChangePage >= 4) || (index >= data.reqPassChangeTotalPage - 3 && data.reqPassChangePage <= data.reqPassChangeTotalPage - 3)) {

                                                                                return (
                                                                                    <li key={index + 1} className={`page-item disabled`}><a className="page-link">...</a></li>
                                                                                )
                                                                            }
                                                                        } else {
                                                                            return (
                                                                                <li className={`page-item ${data.reqPassChangePage === index + 1 ? 'active' : ''}`} key={index + 1} style={{ cursor: 'pointer' }}>
                                                                                    <a className="page-link" onClick={() => dispatchData({ type: 'SET_REQ_PASS_CHANGE_PAGE', payload: index + 1 })}>{index + 1}</a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    })
                                                                }
                                                                <li className="page-item">
                                                                    <a className="page-link" aria-label="Next" style={{ cursor: 'pointer' }} onClick={() => { dispatchData({ type: 'SET_REQ_PASS_CHANGE_PAGE', payload: data.reqPassChangeTotalPage }) }}>
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
                                                                <th scope="col" style={{ textAlign: 'center' }}>Ảnh</th>
                                                                <th scope="col">Tên</th>
                                                                <th scope="col">Email</th>
                                                                <th scope='col'>Công việc</th>
                                                                <th scope='col'>Hành động</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                data?.reqPassChange?.map((item, index) => (
                                                                    <tr key={item.Id}>
                                                                        <td scope="row" style={{ textAlign: 'center' }}>
                                                                            <a><img src={item.Image ? `${host}/uploads/${item.Image}.jpg` : avatar} onError={(e) => { e.target.onerror = null; e.target.src = avatar }} alt="" className="avatar" /></a>
                                                                        </td>
                                                                        <td style={{ justifyContent: 'center' }}>{item.Name}</td>
                                                                        <td className="fw-bold">{item.Email}</td>
                                                                        <td>{item.Job}</td>

                                                                        <td className="fw-bold">
                                                                            {/* <button type="button" className="btn btn-danger btn-sm"
                                                                                onClick={() => console.log("resetPass")}>Banned</button> */}
                                                                            <button onClick={() => {
                                                                                console.log("resetPass");
                                                                                handleResetPass(adminID, item.Id);
                                                                            }}
                                                                                type="button" className="btn btn-outline-warning btn-sm" >Đặt lại mật khẩu</button>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {/* <!-- End Request Password Change List Tab --> */}

                                                {/* <!-- Create Account Form --> */}
                                                <div className="tab-pane fade" id="create-account">
                                                    <div className="card-body">
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

                                                            <div className="col-8"> {/* Chia cột thành 6/12 phần (50%) */}
                                                                <div className="pt-4 pb-2">
                                                                    <h5 className="card-title text-center pb-0 fs-4">Tạo tài khoản</h5>
                                                                    <p className="text-center small">Nhập thông tin để tạo</p>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <form className="row g-3 needs-validation">

                                                            <div className="col-12">
                                                                <label htmlFor="yourName" className="form-label">Tên</label>
                                                                <div className="input-group has-validation">
                                                                    <input type="text" name="name" className="form-control" id="yourName" required defaultValue={'nguyen van teo'} />
                                                                </div>
                                                                <div className="invalid-feedback">Vui lòng nhập Tên.</div>
                                                            </div>

                                                            <div className="col-12" >
                                                                <div className='row'>
                                                                    <div className="col-12" >
                                                                        <label htmlFor="yourUsername" className="form-label">Email</label>
                                                                        <div className="input-group has-validation">
                                                                            <input type="text" name="username" className="form-control" id="yourUsername" required defaultValue={'anhtt676@gmail.com'} />
                                                                            {/* <button type="button" id="toggleConfirm" className="btn btn-outline-secondary"
                                                                                onClick={() => { sendOTP() }}>
                                                                                {
                                                                                    <ReactSVG
                                                                                        src={send_notify}
                                                                                        className='show-pass-icon'
                                                                                    />
                                                                                }
                                                                            </button> */}
                                                                            <div className="invalid-feedback">Vui lòng nhập Email.</div>
                                                                        </div>
                                                                    </div>

                                                                    {/* <div className="col-6" >
                                                                        <label htmlFor="yourToken" className="form-label">OTP</label>
                                                                        <div className="input-group has-validation">
                                                                            <input type="text" name="token" className="form-control" id="yourToken" required />
                                                                        </div>
                                                                        <div className="invalid-feedback">Vui lòng nhập your OTP.</div>

                                                                    </div> */}
                                                                </div>
                                                            </div>

                                                            <div className="col-12">
                                                                <label htmlFor="yourPassword" className="form-label">Mật khẩu</label>
                                                                <div className="input-group">
                                                                    <input type={showPassword ? 'text' : 'password'} name="password" className="form-control" id="yourPassword" required defaultValue={'123456'} />
                                                                    <button type="button" id="togglePassword" className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
                                                                        {
                                                                            !showPassword ?
                                                                                <ReactSVG
                                                                                    src={eye_open}
                                                                                    className='show-pass-icon'
                                                                                    title='Hiển thị mật khẩu'
                                                                                /> : <ReactSVG
                                                                                    src={eye_close}
                                                                                    className='show-pass-icon'
                                                                                    title='Ẩn mật khẩu'
                                                                                />
                                                                        }
                                                                    </button>
                                                                </div>
                                                                <div className="invalid-feedback">Vui lòng nhập Mật khẩu!</div>
                                                            </div>

                                                            <div className="col-12">
                                                                <label htmlFor="yourJob" className="form-label">Công việc</label>
                                                                <select className="form-select" id="yourJob" required>
                                                                    {
                                                                        jobList.map((item, index) => (
                                                                            <option key={index} value={item} defaultValue={index === 1}>{item}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>

                                                            <div className="col-12">
                                                                <button className="btn btn-primary w-100" type="button" style={{ background: '#fd7e14', marginTop: 50, borderWidth: 0 }}
                                                                    onClick={(event) => {
                                                                        console.log("press create admin");
                                                                        handleCreateAccount(event);

                                                                    }}>Tạo</button>
                                                            </div>
                                                        </form>

                                                    </div>
                                                </div>
                                                {/* <!-- End Create Account Form --> */}

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

                        </div>
                        {/* <!-- End Right side columns --> */}

                    </div>
                </section>

            </main>
            {/* <!-- End Main --> */}
        </div>
    )
}

const styles = {
    image: {
        width: '100px',
        height: '100px'
    },
};

export default Staffs;