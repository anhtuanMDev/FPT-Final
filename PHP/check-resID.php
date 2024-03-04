<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

$data = json_decode(file_get_contents("php://input"));
$id = $data->id;

$query = "SELECT * FROM restaurants
                  WHERE Id LIKE '$id' AND Status != 'Remove'";
$stmt = $dbConn->prepare($query);
$stmt->execute();
$res = $stmt->fetch(PDO::FETCH_ASSOC);

if ($res) {
    echo json_encode(
        array(
            "response" => $res,
            "status" => true,
            "message" => "$id is valid!",

        )
    );
    return;
}
echo json_encode(
    array(
        "response" => null,
        "status" => false,
        "message" => "Sorry, this id isn't valid!",
    )
)

?>
