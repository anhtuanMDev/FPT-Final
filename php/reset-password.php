<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

// http://127.0.0.1:8686/reset-password.php
try {
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;
    $token = $data->token;
    $password = $data->password;
    $confirm_password = $data->confirm_password;


    if ($confirm_password != $password) {
        echo json_encode(
            array(
                "statusText" => "Mật khẩu không khớp",
                "status" => false
            )
        );
        exit;
    }
    // kiểm tra email và token có tồn tại trong db hay không
    $query = "SELECT * FROM password_resets WHERE email = '$email' AND token = '$token'
        and created_at >= DATE_SUB(NOW(), INTERVAL 1 HOUR) and available = 1";

    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $reset = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($reset) {
        // cập nhật bảng users
        $query = "UPDATE users SET password = '$password' WHERE email = '$email' AND deleted = 0";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();

        // cập nhật bảng password_resets
        $query = "UPDATE password_resets SET available = 0 WHERE email = '$email'";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();

        echo json_encode(
            array(
                "statusText" => "Cập nhật mật khẩu thành công",
                "status" => true
            )
        );

    } else {

    }
} catch (Exception $e) {
    echo json_encode(
        array(
            "statusText" => "Lỗi: " . $e->getMessage(),
            "status" => false
        )
    );
}