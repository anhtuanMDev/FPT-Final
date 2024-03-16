<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

// http://127.0.0.1:8686/check-reset-password.php

try {
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;
    $token = $data->token;

    // kiểm tra email và token có tồn tại trong db hay không
    $query = "SELECT * FROM password_resets WHERE email = '$email' AND token = '$token'
        and created_at >= DATE_SUB(NOW(), INTERVAL 1 HOUR) and available = 1";

    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $reset = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($reset) {
        echo json_encode(
            array(
                "statusText" => "Hợp lệ",
                "status" => true
            )
        );
    } else {
        echo json_encode(
            array(
                "statusText" => "Không hợp lệ",
                "status" => false
            )
        );
    }
} catch (Exception $e) {
    echo json_encode(
        array(
            "statusText" => "Lỗi: " . $e->getMessage(),
            "status" => false
        )
    );
}
