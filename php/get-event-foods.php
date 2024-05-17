<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;
    $couponID = $data->couponID;

    $query = "SELECT foods.*, COALESCE(SUM(orderitems.Quantity),0) as Sold, (CASE WHEN favlist.Id IS NULL THEN 0 ELSE 1 END) as UserFavorite,
    images.Id AS Image,
    COUNT(reviews.Id) as TotalReview,
    COALESCE(ROUND(AVG(Point),1), 0) AS Point
    FROM foods 
    INNER JOIN orderitems ON foods.Id = orderitems.FoodID AND orderitems.Status = 'Done'
    LEFT JOIN favlist ON foods.Id = favlist.TargetID AND favlist.UserID = '$id'
    INNER JOIN images ON foods.Id = images.OwnerID
    LEFT JOIN reviews ON foods.Id = reviews.TargetID
    INNER JOIN couponitems ON foods.Id = couponitems.FoodID AND couponitems.CouponID = '$couponID'
    WHERE foods.Status = 'Sale' 
    GROUP BY foods.Id, images.Id, favlist.Id
    ORDER BY Sold DESC, TimeMade DESC, Price ASC";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $foods = $stmt->fetchAll(PDO::FETCH_ASSOC);


    echo json_encode(
        array(
            "status" => true,
            "statusText" => "Lấy danh sách món ăn giảm giá thành công!",
            "data" => $foods,
        ),
        JSON_UNESCAPED_UNICODE

         
    );
} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "statusText" => "Lấy danh sách món ăn giảm giá thất bại bởi vì $e!",
            "data" => [],
        ),
        JSON_UNESCAPED_UNICODE

    );
}
