<?php 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php'; 

    $data = json_decode(file_get_contents("php://input"));
    $restaurantID = $data->restaurantID;

    $query = "SELECT Id, Name, Description, TimeMade, 
    FeatureItem, Price, Status, Discount, RestaurantID 
    FROM foods WHERE RestaurantID = '$restaurantID' AND Status != 'Remove'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $res = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    if (count($res) == 0) {
        echo json_encode(
            array(
                "foods" => $res,
                "status" => false,
                "message" => "You restaurant currently doesn't have any food!",
            )
        );
        return;
    }
    echo json_encode(
        array(
            "information" => $res,
            "status" => true,
            "message" => "Success to get your foods!",
        )
    )

?>