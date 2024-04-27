<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {

    $query = "SELECT A.Id AS Id, A.Name AS Name, A.Email AS Email, A.Job AS Job, I.ID AS Image 
                    FROM admin A LEFT JOIN images I ON A.Id = I.OwnerID
                    WHERE A.Status = 'Active'";

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

    echo json_encode(
        array(
            "staffs" => $staffs,
            "status" => true,
            "message" => "Success to get all staffs!",
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
