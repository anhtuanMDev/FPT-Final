<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {
    $id = $_GET['id'];

    $query = "SELECT 
                    A.Id AS Id, 
                    I.ID AS Image,
                    A.Name AS Name,
                    A.Email AS Email
                FROM 
                    admin A
                LEFT JOIN 
                    images I ON A.Id = I.OwnerID
                WHERE 
                    A.Id = '$id'";

    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $res = $stmt -> fetch(PDO::FETCH_ASSOC);


    if ($res == null) {
        echo json_encode(
            array(
                "data" => [],
                "status" => false,
                "statusText" => "Không tìm thấy nhân viên"
            ),
        );
    } else {
        echo json_encode(
            array(
                "data" => $res,
                "status" => true,
                "statusText" => "Đã tìm thấy thành công",
            )
        );
    }

} catch (Exception $e) {
    echo json_encode(
        array(
            "data" => [],
            "status" => false,
            "statusText" => "Lỗi $e!",
        ),
    );
}