<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {
    $id = $_GET['id'];

    $query = "SELECT Id, Title
                    FROM events 
                    WHERE `End` < NOW()";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $eventsParticipated = $stmt->fetchAll(PDO::FETCH_ASSOC);






    $query = "SELECT Id, Title
                    FROM events 
                    WHERE `End` > NOW()";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $eventsNotParticipated = $stmt->fetchAll(PDO::FETCH_ASSOC);


    // Participated NotParticipated Participating

    $data["EventsParticipated"] = $eventsParticipated;
    $data["EventsNotParticipated"] = [];
    $data["EventsNotParticipated"] = $eventsNotParticipated;

    echo json_encode(
        array(
            "data" => $data,
            "status" => true,
            "statusText" => "Đã tìm thấy thành công",
        )
    );

} catch (Exception $e) {
    echo json_encode(
        array(
            "data" => [],
            "status" => false,
            "statusText" => "Lỗi $e!",
        ),
    );
}