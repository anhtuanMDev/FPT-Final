<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {

    $data = json_decode(file_get_contents('php://input'));
    $id = $data->id;
    $idCpn = $data->couponId;
    $adminID = $data->adminID;
    $title = $data->title;
    $content = $data->content;
    $code = $data->code;
    $discount = $data->discount;
    $start = $data->start;
    $end = $data->end;

    $type = "Times" ;

    // Begin transaction
    $dbConn->beginTransaction();


    // Update coupon
    $query = "UPDATE coupons 
                    SET Code = '$code', Discount = $discount, 
                        Start = '$start', End = '$end', UpdateAt = NOW(), UpdateBy = '$adminID' 
                    WHERE Id = '$idCpn'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();

    // Update event
    $query = "UPDATE events 
                    SET Title = '$title', Content = '$content', Start = '$start', End = '$end', 
                        UpdateAt = NOW(), UpdateBy = '$adminID' 
                    WHERE Id = '$id'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();


    // Commit the transaction
    $dbConn->commit();

    echo json_encode(
        array(
            "status" => true,
            "statusText" => "Update event thành công!",
            "data" => null,
        )
    );



} catch (Exception $e) {
    // Rollback the transaction if an exception occurs
    $dbConn->rollback();

    echo json_encode(
        array(
            "status" => false,
            "statusText" => "Update event không thành công bởi vì $e!",
            "data" => null,
        )
    );
}