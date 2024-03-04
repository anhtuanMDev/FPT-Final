<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {
    $data = json_decode(file_get_contents("php://input"));
    $ID = $data -> id;
    $ownerID = $data->ownerID;

    $query = "INSERT INTO images (Id, OwnerID)
    VALUES ('$ID', '$ownerID')";
    
    $res = $stmt = $dbConn->prepare($query);
    $stmt->execute();
    echo json_encode(
        array(
            "id" => $ID,
            "status" => true,
            "message" => "Success to add image!",
        )
    );

} catch (Exception $e) {
    echo json_encode(
        array(
            "id" => null,
            "status" => false,
            "message" => "Failed to add image!",
            "error" => $e->getMessage(),
        )
    );
}
