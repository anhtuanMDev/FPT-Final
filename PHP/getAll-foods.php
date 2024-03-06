<?php 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php'; 

try {
    $data = json_decode(file_get_contents("php://input"));
    
    $query = "SELECT foods.*, restaurants.Name as ResName
    FROM foods INNER JOIN restaurants ON foods.RestaurantID = restaurants.Id
    WHERE foods.Status != 'Remove' AND foods.Status != 'Banned' 
    AND restaurants.Status != 'Remove' AND restaurants.Status != 'Banned'";
    
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $res = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(
        array(
            "foods" => $res,
            "status" => true,
            "message" => "Success to get restaurant list!",
        )
        );
} catch (Exception $e) {
    echo json_encode(
        array(
            "foods" => [],
            "status" => true,
            "message" => "Fail to get food list because of $e!",
        )
        );
}


?>