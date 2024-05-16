<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once 'connection.php';

try {
    $data = json_decode(file_get_contents('php://input'));
    $email = $data->email;
    $otp = $data->otp;

    $query = "SELECT * FROM confirmations WHERE Email = '$email' AND Token = '$otp' AND ExpireAt > NOW() AND Status = 1";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $tokens = $stmt->fetch(PDO::FETCH_ASSOC);

    if(!$tokens) {
        echo json_encode(
            array(
                "status" => false,
                "statusText" => "Mã xác nhận không hợp lệ!",
            )
        );
        return;
    }


    $query = "UPDATE users
    INNER JOIN confirmations ON users.Email = confirmations.Email
    SET confirmations.Status = 0, 
    users.UpdateAt = NOW(), users.Status = 'Active'
    WHERE confirmations.Email = '$email' AND confirmations.Token = '$otp' 
    AND confirmations.ExpireAt > NOW() AND confirmations.Status = 1";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();

    echo json_encode(
        array(
            "status" => true,
            "statusText" => "Xác thực thành công!",
        )
    );
} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "statusText" => "Xác thực không thành công bởi vì $e!",
        )
    );
}
