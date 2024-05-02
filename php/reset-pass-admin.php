<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {
    $samplePassword = 'Orangic123456';

    $data = json_decode(file_get_contents('php://input'));
    $resetterId = $data->resetterId;
    $resetRequesterId = $data->resetRequesterId;

    $query = "SELECT * FROM Admin WHERE Id LIKE '$resetterId'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$admin) {
        echo json_encode(
            array(
                "status" => false,
                "statusText" => "Bạn không phải nhân viên",
            )
        );
    } 

    
    $query = "SELECT * FROM Admin WHERE Id LIKE '$resetRequesterId'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$admin) {
        echo json_encode(
            array(
                "status" => false,
                "statusText" => "không tìm thấy nhân viên cần đặt lại mật khẩu",
            )
        );
    } 

    $query = "UPDATE admin SET Password = '$samplePassword', UpdateAt = now() WHERE Id LIKE '$resetRequesterId'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();

    $query = "UPDATE notifications SET IsRead = 1 WHERE TargetID LIKE '$resetRequesterId' AND Title LIKE 'Employee want to retrieve password' ";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();

    echo json_encode(
        array(
            "status" => true,
            "statusText" => "Đặt lại mật khẩu thành công!",
        )
    );


} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "statusText" => "Đặt lại mật khẩu không thành công bởi vì $e!",
        )
    );
}

