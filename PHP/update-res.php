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
    $ID = $_GET["ID"];
    $name = $data->name;
    $introduction = $data->introduction;
    $email = $data->email;
    $phone = $data->phone;
    $address = $data->address;
    $district = $data->district;
    $ward = $data->ward;
    $city = $data->city;
    $status = $data->status;

    $query = "UPDATE restaurants SET Name = '$name', 
    Introduction = '$introduction', Email = '$email', 
    Phone = '$phone', Address = '$address', 
    District = '$district', Ward = '$ward', City = '$city', 
    Status = '$status' WHERE Id = '$ID'";

    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    echo json_encode(
        array(
            "status" => true,
            "message" => "Success to update your restaurant!",
        )
    );
} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "message" => "Fail to update your restaurant!",
            "e" => `${e}`,
        )
    );
}
