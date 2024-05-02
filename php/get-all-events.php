<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {
    $query = "SELECT E.Id AS Id, E.Title AS Title, E.Content AS Content, E.Start AS Start, E.End AS End, C.Discount AS Discount
    FROM events E INNER JOIN coupons C ON E.CouponID = C.Id";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $res = $stmt -> fetchAll(PDO::FETCH_ASSOC);


    if ($res == null) {
        echo json_encode(
            array(
                "data" => [],
                "status" => false,
                "statusText" => "Không tìm thấy event"
            ),
        );
    } else {
        echo json_encode(
            array(
                "data" => $res,
                "status" => true,
                "statusText" => "Đã tìm thấy thành công",
            )
        );
    }

} catch (Exception $e) {
    echo json_encode(
        array(
            "data" => [],
            "status" => false,
            "statusText" => "Lỗi $e!",
        ),
    );
}