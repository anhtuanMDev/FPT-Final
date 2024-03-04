<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once 'connection.php';

try {
    // $ID = $_GET["TopicID"];

    $data = json_decode(file_get_contents("php://input"));
    $ID = $data->ID;
    $name = $data->name;
    $description = $data->description;
    $timeMade = $data->timeMade;
    $featureItem = $data->featureItem;
    $price = $data->price;
    $status = $data->status;
    $discount = $data->discount;

    $query = "UPDATE foods SET Name = '$name',
    Description = '$description', TimeMade = '$timeMade',
    FeatureItem = $featureItem, Price = $price, Status = '$status',
    Discount = $discount WHERE Id = '$ID'";

    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    echo json_encode(
        array(
            "status" => true,
            "message" => "Success to update your food!",
        )
    );
} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "message" => "Fail to update your food!",
            "e" => `${e}`,
        )
    );
}
