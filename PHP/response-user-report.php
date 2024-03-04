<?php 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php'; 

    $data = json_decode(file_get_contents("php://input"));

    $id = $data -> id;
    $reply = $data -> reply;
    $replyBy = $data -> replyBy;

    $query = "UPDATE reports SET `Reply` = '$reply', `ReplyAt` = NOW(), `ReplyBy` = '$replyBy' WHERE `Id` = '$id'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $res = $stmt -> fetch(PDO::FETCH_ASSOC);
    echo json_encode(
        array(
            "message" => `Success to update $id's status!`,
        )
    )

?>