<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

function generateRandomString($length = 10) {
    $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $randomString = 'FOD';

    if ($length <= 3) {
        return array(
            'status' => false,
            'message' => 'Error: Length must be greater than 3.',
            'result' => ''
        );
    }

    for ($i = 0; $i < $length - 3; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }

    return $randomString;
}

try {
    $data = json_decode(file_get_contents("php://input"));
    $ID = generateRandomString(20);
    $name = $data->name;
    $description = $data->description;
    $timeMade = $data->timeMade;
    $featureItem = $data->featureItem;
    $price = $data->price;
    $status = $data->status;
    $discount = $data->discount;
    $restaurantID = $data->restaurantID;


    $query = "SELECT * FROM foods WHERE
    (Name LIKE '%$search%' OR
    TimeMade LIKE '%$search%' OR
    Price = $search OR
    Discount = $search)
    AND Status != 'Remove'";

    
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    echo json_encode(
        array(
            "status" => true,
            "message" => "Success to add food to your restaurant!",
        )
    );

} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "message" => "Failed to add  restaurant!",
            "error" => $e->getMessage(),
        )
    );
}
