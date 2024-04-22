<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once 'connection.php';

try {
    function generateRandomString($prefix)
    {
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $randomString = $prefix;

        for ($i = 0; $i < 17; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }

        return $randomString;
    }


    $data = json_decode(file_get_contents('php://input'));
    $id = generateRandomString("ADM");
    $name = $data->name;
    $email = $data->email;
    $password = $data->password;
    $job = $data->job;
    $status = "Active";
    $token = $data->token;

    while (true) {
        // check ID
        $query = "SELECT * FROM Admin WHERE Id LIKE '$id'";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user) {
            $id = generateRandomString("ADM");
        } else {
            break;
        }
    }

    $query = "SELECT * FROM Admin WHERE Email = '$email'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user) {
        echo json_encode(
            array(
                "status" => false,
                "statusText" => "Email đã tồn tại!",
                "data" => null,
            )
        );
    } else {
        $query = "SELECT * FROM confirmations WHERE Email = '$email' AND Token = '$token' AND ExpireAt > NOW() AND Status = 1";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();
        $tokens = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$tokens) {
            echo json_encode(
                array(
                    "status" => false,
                    "statusText" => "Mã xác nhận không hợp lệ!",
                    "data" => null,
                )
            );
            return;
        } else {
            $query = "UPDATE confirmations SET Status = 0 WHERE Email = '$email' AND Token = '$token' AND ExpireAt > NOW() AND Status = 1";
            $stmt = $dbConn->prepare($query);
            $stmt->execute();
        }

        // // $query1 = "INSERT INTO Admin (Id, Name, Email, Password, Job, CreateAt, Status)  
        // // VALUES('$id', '$name', '$email', '$password', $job, now(), $status)"; // tự nhiên bị lỗi hiểu lầm admin là cột

        $query = "INSERT INTO Admin (Id, Name, Email, Password, Job, `Status`, CreateAt, UpdateAt, DeleteAt)
           VALUES ('$id', '$name', '$email', '$password', '$job', '$status', NOW(), NULL, NULL)";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();


        echo json_encode(
            array(
                "status" => true,
                "statusText" => "Đăng kí thành công!",
                "data" => $id,
            )
        );


    }
} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "statusText" => "Đăng kí không thành công bởi vì $e!",
            "data" => null,
        )
    );
}

