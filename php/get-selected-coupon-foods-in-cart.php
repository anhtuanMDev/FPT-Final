<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {
    $data = json_decode(file_get_contents("php://input"));
    $userId = $data->userId;
    $couponId = $data->couponId;

    $query = "SELECT OI.FoodID AS FoodID,
                    F.Name AS FoodName,
                    F.Price AS Price,
                    F.Discount AS FoodDiscount,
                    OI.Quantity AS Quantity
                FROM orderitems OI
                    INNER JOIN orders O ON OI.OrderID = O.Id
                    INNER JOIN foods F ON OI.FoodID = F.Id
                WHERE
                    O.UserID = '$userId'
                    AND O.`Status` = 'Waiting'
                    AND OI.FoodID IN (
                        SELECT CI.FoodID
                        FROM couponitems CI
                        WHERE
                            CI.`CouponID` = '$couponId'
                    )";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $foods = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($foods) {
        echo json_encode(
            array(
                "data" => $foods,
                "status" => true,
                "statusText" => "Lấy danh sách món ăn thành công!",
            ),
        );
    } else {
        echo json_encode(
            array(
                "data" => [],
                "status" => false,
                "statusText" => "Không có món ăn nào!",
            ),
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