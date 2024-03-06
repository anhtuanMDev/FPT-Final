<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {

    $ownerID = $_GET['id'];
    $query = "SELECT Id FROM images WHERE ownerID = '$ownerID'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($res == null) {
        echo json_encode(
            array(
                "img" => [],
                "status" => false,
                "message" => "No image found with restaurant has id $ownerID!",
            )
        );
    } else {
        echo json_encode(
            array(
                "img" => $res,
                "status" => true,
                "message" => "Success to get restaurant's image!",
            )
        );
    }

} catch (Exception $e) {
    echo json_encode(
        array(
            "img" => [],
            "status" => true,
            "message" => "Fail to get restaurant's image because $e!",
        )
    );
}
