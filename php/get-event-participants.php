<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {
    // $data = json_decode(file_get_contents("php://input"));
    $id = $_GET['id'];

    $query = "SELECT U.`Id` AS Id, U.`Name` AS Name, U.`Email` AS Email, I.`Id` AS Image
                    FROM
                        users U
                    LEFT JOIN 
                        images I ON U.`Id` = I.`OwnerID`    
                    RIGHT JOIN 
                        couponuser CU ON `U`.`Id` = `CU`.`UserID`
                    WHERE
                        CU.`CouponID` = '$id'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $usersParticipants = $stmt->fetchAll(PDO::FETCH_ASSOC);


    $eventParticipants['UsersParticipants'] = $usersParticipants;
    $eventParticipants['RestaurantParticipants'] = null;

    echo json_encode(
        array(
            "eventParticipants" => $eventParticipants,
            "status" => true,
            "message" => "Success to get event participants!",
        )
    );

} catch (Exception $e) {
    echo json_encode(
        array(
            "eventParticipants" => null,
            "status" => false,
            "message" => "Fail to get event detail because of $e!",
        )
    );
}
