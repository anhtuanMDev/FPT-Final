

/**
 * Hiển thị thông báo lỗi khi người dùng nhập sai dữ liệu
 * @param inputId id của input
 * @param feedbackId id của div chứa thông báo lỗi
 * @param errorMessage thông báo lỗi
 * @param isInvalid true nếu dữ liệu không hợp lệ, false nếu dữ liệu hợp lệ
 * @returns void
 */
export const toggleErrorFeedback = (inputId: string, feedbackId: string, errorMessage: string, isInvalid: boolean) => {
    try {
        let input = document.getElementById(inputId);
        let feedbackDiv = document.getElementById(feedbackId);

        if (feedbackDiv === undefined || feedbackDiv === null || input === undefined || input === null)
            throw new TypeError('Element not found');

        if (isInvalid) {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            // input.classList.remove('was-validated');

            errorMessage && (feedbackDiv.textContent = errorMessage);

            feedbackDiv.classList.add('d-block');
            feedbackDiv.classList.remove('d-none');
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            // input.classList.remove('was-validated');


            feedbackDiv.classList.remove('d-block');
            feedbackDiv.classList.add('d-none');
        }
    } catch (error) {
        if (error instanceof TypeError) {
            console.log('TypeError: ', error.message);
        } else if (error instanceof Error) {
            console.log('Error: ', error.message);
        }
    }
}


/**
 * Kiểm tra xem dữ liệu ngày tháng nhập vào có hợp lệ không (ngày kết thúc phải sau ngày bắt đầu ít nhất dateRange ngày)
 * @param start ngày bắt đầu
 * @param end ngày kết thúc
 * @param dateRange số ngày tối thiểu giữa ngày bắt đầu và ngày kết thúc
 * @returns true nếu dữ liệu hợp lệ, false nếu dữ liệu không hợp lệ
 */
export const checkValidDateRange = (start: number | string | Date, end: number | string | Date, dateRange: number) => {
    let startDate = new Date(start);
    let endDate = new Date(end);

    if (!startDate || !endDate) {
        return false;
    }

    let diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < dateRange) {
        return false;
    }

    return true;
}

/**
 * Kiểm tra xem dữ liệu ngày tháng nhập vào có hợp lệ không (ngày phải lớn hơn hoặc là ngày hiện tại)
 * @param date ngày bắt đầu
 * @returns true nếu dữ liệu hợp lệ, false nếu dữ liệu không hợp lệ
 */
export const checkValidDate = (date: number | string | Date) => {
    let inputDate = new Date(date);
    let currentDate = new Date();

    if (inputDate <= currentDate) {
        return false;
    }

    return true;
}

/**
 * Kiểm tra có để trống hay không
 * @param value giá trị vào
 * @returns false nếu giá trị nhập vào là '', null, undefined, không thì true
*/
export const checkEmptyValue = (value: string | null | undefined) => {
    if (value === '' || value === null || value === undefined) {
        return false;
    }

    return true;
}


/**
 * Kiểm tra xem giá trị nhập vào có nằm trong khoảng từ min đến max hay không
 * @param value giá trị nhập vào
 * @param min giá trị nhỏ nhất
 * @param max giá trị lớn nhất
 * @returns true nếu giá trị nhập vào nằm trong khoảng từ min đến max, false nếu giá trị nhập vào không nằm trong khoảng từ min đến max
 */
export const checkValueInRange = (value: number, min: number, max: number) => {
    if (value < min || value > max) {
        return false;
    }

    return true;
}

/**
 * Kiểm tra xem chuỗi có độ dài từ min đến max hay không
 * @param value chuỗi cần kiểm tra
 * @param min độ dài tối thiểu
 * @param max độ dài tối đa
 * @returns true nếu chuỗi có độ dài từ min đến max, false nếu chuỗi không có độ dài từ min đến max
*/
export const checkStringLength = (value: string, min: number, max: number) => {
    if (value.length < min || value.length > max) {
        return false;
    }

    return true;
}
