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

    $query = "SELECT images.Id from images INNER JOIN foods ON images.OwnerID = foods.Id 
    WHERE foods.Status !=  'Banned' AND images.OwnerID = '$id' AND foods.Status != 'Removed'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $image = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($image) {
        echo json_encode(
            array(
                "status" => true,
                "statusText" => "Lấy danh sách hình ảnh thành công!",
                "data" => $image,
            )
        );
    } else {
        echo json_encode(
            array(
                "status" => false,
                "statusText" => "Không có hình ảnh của $id trong hệ thống!",
                "data" => [],
            ),
        );
    }
} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "statusText" => "Lấy danh sách hình ảnh của $id thất bại bởi vì $e!",
            "data" => [],
        ),
    );
}
