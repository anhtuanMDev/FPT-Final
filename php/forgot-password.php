<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once 'connection.php';

use PHPMailer\PHPMailer\PHPMailer;

include_once $_SERVER['DOCUMENT_ROOT'] . '/helpers/PHPMailer-master/src/PHPMailer.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/helpers/PHPMailer-master/src/SMTP.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/helpers/PHPMailer-master/src/Exception.php';

function generateRandomCode($numDigits) {
    // Mảng chứa các chữ số từ 0 đến 9
    $digits = range(0, 9);
    
    // Số chữ số trong mảng $digits
    $numPossibleDigits = count($digits);
    
    // Biến lưu mã ngẫu nhiên
    $code = '';
    
    // Tạo mã ngẫu nhiên bằng cách lấy ngẫu nhiên các chữ số từ mảng $digits
    for ($i = 0; $i < $numDigits; $i++) {
        // Chọn một chữ số ngẫu nhiên từ mảng $digits
        $randomIndex = mt_rand(0, $numPossibleDigits - 1);
        
        // Thêm chữ số đã chọn vào mã
        $code .= $digits[$randomIndex];
    }
    
    return $code;
}

// http://127.0.0.1:8686/forgot-password.php
// method post
// đọc data từ body
$data = json_decode(file_get_contents('php://input'));
$email = $data->email;
// kiểm tra email có trong db hay không
// $query = "SELECT * FROM users WHERE email = '$email' ";
// $stmt = $dbConn->prepare($query);
// $stmt->execute();
// $user = $stmt->fetch(PDO::FETCH_ASSOC);
// if ($user) {
    // send email otp
    // tạo token bằng cách mã hóa email và thời gian
    $token = md5(time() . $email);
    // lưu token vào database
    // $query = "insert into password_resets (email, token)
    //                         values ('$email', '$token') ";
    // $stmt = $dbConn->prepare($query);
    // $stmt->execute();
    // gửi email có link reset mật khẩu
    $emailConfirmCode =  "<b style='font-size: 30px;'>" . generateRandomCode(6) . "</b>";
    $mail = new PHPMailer();
    $mail->CharSet = "utf-8";
    $mail->isSMTP();
    $mail->SMTPAuth = true;
    $mail->Username = "t8876702";
    $mail->Password = "awzyptgufknnjays";
    $mail->SMTPSecure = "ssl";
    $mail->Host = "ssl://smtp.gmail.com";
    $mail->Port = "465";
    $mail->From = "t8876702@gmail.com";
    $mail->FromName = "Organic App";
    $mail->addAddress($email, 'Hello');
    $mail->Subject = "Reset Password";
    $mail->isHTML(true);
    $mail->Body = "Email confirm code: " . $emailConfirmCode . " ";
    $res = $mail->Send();
    if ($res) {
        echo json_encode(
            array(
                "message" => "Email sent.",
                "status" => true
            )
        );
    } else {
        echo json_encode(
            array(
                "message" => "Email sent failed.",
                "status" => false
            )
        );
    }
// } else {
//     echo json_encode(
//         array(
//             "message" => "Email không tồn tại!",
//             "status" => false
//         )
//     );
// }
// http://127.0.0.1:3000/reset_password?email=channn3@fpt.edu.vn&token=e8d519639ec078eb155ba5451cad0bf8 