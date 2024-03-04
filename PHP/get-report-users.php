<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

$query = "SELECT reports.Id as Id, reports.`Title`, reports.`Content`, reports.`CreateAt`, reports.`Author`, reports.`ImageID`, users.Id as `TargetID`
FROM reports
INNER JOIN users ON reports.TargetID = users.Id
WHERE reports.ReplyBy IS NULL
ORDER BY reports.CreateAt DESC";

$stmt = $dbConn->prepare($query);
$stmt->execute();
$res = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($res == null) {
    echo json_encode(
        array(
            "users" => null,
            "status" => false,
            "message" => "No report to be found!",
        )
    );
} else {
    echo json_encode(
        array(
            "users" => $res,
            "status" => true,
            "message" => "Success to get reports!",
        )
    );
}
