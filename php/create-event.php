<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {
    function generateID($prefix)
    {
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $randomString = $prefix;

        for ($i = 0; $i < 17; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }

        return $randomString;
    }

    $data = json_decode(file_get_contents('php://input'));
    $id = generateID('EVT');
    $idCpn = generateID('CPN');
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
            $id = generateID("EVT");
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
            $idCpn = generateID("CPN");
        } else {
            break;
        }
    }

    $query = "INSERT INTO coupons (Id, Code, Discount, Type, Amount, Start, End, CreateAt, UpdateAt, CreateBy, UpdateBy) 
    VALUES('$idCpn', '$code', $discount, '$type', $amount, '$start', '$end', NOW(), null, '$adminID', null);";
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

    // Get user IDs based on type
    $query = ($type == "Times") ? "SELECT Id FROM users" : "SELECT Id FROM users ORDER BY RAND() LIMIT $amount";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $userIDs = $stmt->fetchAll(PDO::FETCH_COLUMN);



    foreach ($userIDs as $user) {
        $copID = generateID('CPU');
        $query = "INSERT INTO couponuser (Id,UserID, CouponID, Status) VALUES ('$copID','$user', '$idCpn', 'Available')";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();

        $idNot = generateID('NOT');
        $query = "INSERT INTO notifications (Id, Title, Content, IsRead, CreateAt, GiftID, TargetID, Creator) VALUES 
        ('$idNot', 'Event: $title', '$content', 0, NOW(), '$idCpn', '$user', '$adminID')";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();
    }


    // Commit the transaction
    $dbConn->commit();

    echo json_encode(
        array(
            "status" => true,
            "statusText" => "Tạo event thành công!",
            "data" => $id,
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