<?php 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php'; 

    $data = json_decode(file_get_contents("php://input"));

    $query = "SELECT * FROM foods 
                  WHERE Status != 'Remove' and Status != 'Banned";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $res = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(
        array(
            "response" => $res,
            "status" => true,
            "message" => "Success to get restaurant list successfully!",
        )
    )

?>