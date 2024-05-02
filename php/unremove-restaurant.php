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

    $query = "UPDATE restaurants  SET Status = 'Active', UpdateAt = NOW() WHERE Id = '$id'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();

    echo json_encode(
        array(
            "status" => true,
            "statusText" => "Mở lại nhà hàng thành công!",
            "data" => null,
        )
    );

} catch (Exception $e) {
    // Rollback the transaction if an exception occurs
    // $dbConn->rollback();

    echo json_encode(
        array(
            "status" => false,
            "statusText" => "Mở lại nhà hàng không thành công bởi vì $e!",
            "data" => null,
        )
    );
}