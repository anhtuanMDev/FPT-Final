<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;
    $user = $data->user;

    $query = "SELECT foods.*, 
    CASE WHEN favlist.Id IS NOT NULL THEN 1 ELSE 0 END as userFavorite 
    FROM foods 
    LEFT JOIN favlist 
    ON foods.Id = favlist.TargetID 
    AND favlist.UserID = '$user'
    WHERE foods.Id = '$id'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $food = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($food) {
        $queryDetail = "SELECT Id from images WHERE OwnerID = :id";
        $stmtDetail = $dbConn->prepare($queryDetail);
        $stmtDetail->bindParam(':id', $food['Id']);
        $stmtDetail->execute();
        $images = $stmtDetail->fetchAll(PDO::FETCH_ASSOC);
        $food['Images'] = $images;

        $queryUser = "SELECT Count(Id) from favlist WHERE UserID = '$user' AND TargetID = '$id'";
        echo json_encode(
            array(
                "status" => true,
                "statusText" => "Lấy thông tin món ăn thành công!",
                "data" => $food,
            )
        );
    } else {
        echo json_encode(
            array(
                "status" => false,
                "statusText" => "Không có thông tin của món ăn $id trong hệ thống!",
                "data" => [],
            ),
        );
    }
} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "statusText" => "Lấy thông tin của $id thất bại bởi vì $e!",
            "data" => [],
        ),
    );
}
