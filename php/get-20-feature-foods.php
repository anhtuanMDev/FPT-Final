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

    $query = "SELECT foods.Id, foods.TimeMade, foods.Price, foods.Name, foods.FeatureItem, 
    foods.Discount, COUNT(favlist.Id) AS UserFavorite, images.Id AS `Image`, COUNT(reviews.Id) as TotalReview,
    COALESCE(ROUND(AVG(Point),1), 0) AS Point
    FROM foods 
    LEFT JOIN favlist ON foods.Id = favlist.TargetID AND favlist.UserID = '$id'
    INNER JOIN images ON foods.Id = images.OwnerID
    LEFT JOIN reviews ON foods.Id = reviews.TargetID
    WHERE foods.FeatureItem = 1 AND foods.Status = 'Sale'
    GROUP BY foods.Id, images.Id limit 20";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $foods = $stmt->fetchAll(PDO::FETCH_ASSOC);


    echo json_encode(
        array(
            "status" => true,
            "statusText" => `Lấy danh sách món ăn đặc biệt thành công!`,
            "data" => $foods,
        ),
        JSON_UNESCAPED_UNICODE

    );
} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "statusText" => "Lấy danh sách món ăn đặc biệt thất bại bởi vì $e!",
            "data" => [],
        ),
        JSON_UNESCAPED_UNICODE

    );
}
