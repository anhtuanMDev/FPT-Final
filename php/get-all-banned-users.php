<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {
    $query = "SELECT users.*, images.id as Image FROM users
    INNER JOIN images ON users.Id = images.OwnerID
    WHERE Status = 'Banned'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($users == null) {

            echo json_encode(
                array(
                    "data" => [],
                    "status" => false,
                    "message" => "Don't have banned users",
                )
            );
            return;
    } else {
        echo json_encode(
            array(
                "data" => $users,
                "status" => true,
                "message" => "Success to get banned foods!",
            )
        );
    }
} catch (Exception $e) {
}
