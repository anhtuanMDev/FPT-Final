<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {

    $query = "SELECT * FROM admin WHERE Status = 'Active'";

    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $staffs = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($staffs) == 0) {
        echo json_encode(
            array(
                "staffs" => $staffs,
                "status" => false,
                "message" => "There is no staff in the database!",
            )
        );
        return;
    }

    foreach($staffs as $key => $staff){
        $query = "SELECT Id from images WHERE Id = :id LIMIT 1";
        $stmt = $dbConn->prepare($query);
        $stmt->bindParam(":id", $staff['Image']);
        $stmt->execute();
        $image = $stmt->fetch(PDO::FETCH_ASSOC);
        if($image == null){
            $staffs[$key]['Image'] = null;
        }else {
            $staffs[$key]['Image'] = $image['Id'];
        }

    }
    echo json_encode(
        array(
            "staffs" => $staffs,
            "status" => true,
            "message" => "Success to get your foods!",
        )
    );
} catch (Exception $e) {
    echo json_encode(
        array(
            "staffs" => [],
            "status" => false,
            "message" => "Fail to get staff list because of $e!",
        )
    );
}
