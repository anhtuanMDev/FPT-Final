<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

function generateRandomString($length = 10) {
    $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $randomString = 'RES';

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
    $introduction = $data->introduction;
    $email = $data->email;
    $phone = $data->phone;
    $address = $data->address;
    $district = $data->district;
    $ward = $data->ward;
    $city = $data->city;
    $status = $data->status;
    $ownerID = $data->ownerID;

    $query = "INSERT INTO restaurants (Id, Name, Introduction, Address, District, Ward,
    City, Email, Phone, Status, OwnerID)
    VALUES ('$ID', '$name', '$introduction', '$address', '$district', '$ward', 
    '$city', '$email', '$phone', '$status', '$ownerID')";
    
    $res = $stmt = $dbConn->prepare($query);
    $stmt->execute();
    echo json_encode(
        array(
            "id" => $ID,
            "status" => true,
            "message" => "Success to add restaurant!",
        )
    );

} catch (Exception $e) {
    echo json_encode(
        array(
            "id" => null,
            "status" => false,
            "message" => "Failed to add restaurant!",
            "error" => $e->getMessage(),
        )
    );
}
