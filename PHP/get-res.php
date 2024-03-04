<?php 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php'; 

    $ownerID = $_GET['ownerID'];

    $query = "SELECT Id, Name, Introduction, Address, District, Ward, City, Email, Phone, Status 
                  FROM restaurants 
                  WHERE ownerID = '$ownerID' AND Status != 'Remove' LIMIT 1";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $res = $stmt -> fetch(PDO::FETCH_ASSOC);

    if($res == null){
         echo json_encode(
            array(
                "response" => null,
                "status" => false,
                "message" => "No restaurant found with id $ownerID!",
            )
        );
    }else 
         echo json_encode(
            array(
                "response" => $res,
                "status" => true,
                "message" => "Success to get restaurant!"
            )
        );

?>