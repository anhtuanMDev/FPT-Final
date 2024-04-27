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
    $id = generateRandomString('EVT');
    $idCpn = generateRandomString('CPN');
    $adminID = $data->adminID;
    $title = $data->title;
    $content = $data->content;
    $code = $data->code;
    $discount = $data->discount;
    $type = $data->type;
    $amount = $data->amount;
    $start = $data->start;
    $end = $data->end;

    $amount = $type == "Count" ? $amount : -1;
    // Begin transaction
    $dbConn->beginTransaction();

    while (true) {
        // check ID
        $query = "SELECT Id FROM events WHERE Id LIKE '$id'";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($res) {
            $id = generateRandomString("EVT");
        } else {
            break;
        }
    }

    while (true) {
        // check ID
        $query = "SELECT Id FROM events WHERE Id LIKE '$idCpn'";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($res) {
            $idCpn = generateRandomString("CPN");
        } else {
            break;
        }
    }

    $query = "INSERT INTO coupons (Id, Code, Discount, Type, Amount, Start, End, CreateAt, UpdateAt, CreateBy, UpdateBy) 
    VALUES('$idCpn', '$code', $discount, '$type', $amount, NOW(), '$start', '$end', null, '$adminID', null);";
    // error_log($query);
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $coupon = $stmt->fetch(PDO::FETCH_ASSOC);


    $query = "INSERT INTO events (Id, Title, Content, Start, End, CreateAt, UpdateAt, CreateBy, UpdateBy, CouponID) 
    VALUES('$id', '$title', '$content', '$start', '$end',  NOW(), null, '$adminID', null, '$idCpn');";
    // error_log($query);
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $event = $stmt->fetch(PDO::FETCH_ASSOC);


    // Commit the transaction
    $dbConn->commit();

    echo json_encode(
        array(
            "status" => true,
            "statusText" => "Tạo event thành công!",
            "data" => null,
        )
    );



} catch (Exception $e) {
    // Rollback the transaction if an exception occurs
    $dbConn->rollback();

    echo json_encode(
        array(
            "status" => false,
            "statusText" => "Tạo event không thành công bởi vì $e!",
            "data" => null,
        )
    );
}