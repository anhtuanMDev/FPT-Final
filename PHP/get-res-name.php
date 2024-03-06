<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {

    $id = $_GET['id'];

    $query = "SELECT Name FROM restaurants
                WHERE Id = '$id' AND Status != 'Remove' LIMIT 1";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $res = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($res == null) {
        echo json_encode(
            array(
                "res" => [],
                "status" => false,
                "message" => "No restaurant found with id $id!",
            ),
        );
    } else {echo json_encode(
        array(
            "res" => $res,
            "status" => true,
            "message" => "Success to get restaurant!",
        )
    );}
} catch (Exception $e) {
    echo json_encode(
        array(
            "res" => [],
            "status" => false,
            "message" => "Fail to get restaurant because of $e!"
        ),
    );
}
