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
    
    $query = "SELECT 
    restaurants.Id
    ,restaurants.Name
    ,restaurants.Introduction
    ,restaurants.Address
    ,restaurants.City
    ,restaurants.Ward
    ,restaurants.District
    ,restaurants.Phone
    ,restaurants.Email
    ,restaurants.Status
    ,restaurants.ownerID,
    MAX(images.Id) AS Image
    ,COUNT(reviews.Id) as TotalReview,
    COALESCE(ROUND(AVG(Point),1), 0) AS Point
    ,COALESCE(SUM(orderitems.Quantity),0) as Sold
    ,(CASE WHEN favlist.Id IS NULL THEN 0 ELSE 1 END) AS UserFavorite 
    FROM restaurants    
    LEFT JOIN foods ON restaurants.Id = foods.RestaurantId
    LEFT JOIN orderitems ON foods.Id = orderitems.FoodId
    LEFT JOIN favlist ON restaurants.Id = favlist.TargetID AND favlist.UserID = '$id'
    INNER JOIN images ON restaurants.Id = images.OwnerID
    LEFT JOIN reviews ON restaurants.Id = reviews.TargetID
    WHERE foods.Status != 'Banned' AND foods.Status != 'Removed' 
    AND restaurants.Status != 'Banned' AND restaurants.Status != 'Removed' 
    GROUP BY restaurants.Id, favlist.Id ORDER BY Sold DESC";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $restaurants = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($restaurants) {
        echo json_encode(
            array(
                "status" => true,
                "statusText" => "Lấy danh sách nhà hàng thành công!",
                "data" => $restaurants,
            )
        );
    } else {
        echo json_encode(
            array(
                "status" => false,
                "statusText" => "Không có nhà hàng trong hệ thống!",
                "data" => [],
            ),
        );
    }
} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "statusText" => "Lấy danh sách nhà hàng thất bại bởi vì $e!",
            "data" => [],
        ),
    );
}
