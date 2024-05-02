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

    $query = "SELECT 
                    E.Id AS Id, 
                    E.Title AS Title, 
                    E.Content AS Content, 
                    E.Start AS Start, 
                    E.End AS End, 
                    E.CreateAt AS CreateAt, 
                    I_create.ID AS ImageCreateBy,
                    A_create.Name AS CreateBy,
                    A_create.Email AS EmailCreateBy,
                    E.UpdateAt AS UpdateAt, 
                    I_update.ID AS ImageUpdateBy,
                    A_update.Name AS UpdateBy,
                    A_update.Email AS EmailUpdateBy,
                    E.CouponID AS CouponID,
                    C.Code AS CouponCode,
                    C.Discount AS Discount,
                    C.Type AS Type,
                    C.Amount AS Amount
                FROM 
                    events E 
                LEFT JOIN 
                    admin A_create ON E.CreateBy = A_create.Id
                LEFT JOIN 
                    admin A_update ON E.UpdateBy = A_update.Id
                LEFT JOIN 
                    coupons C ON E.CouponID = C.Id
                LEFT JOIN 
                    images I_create ON E.UpdateBy = I_create.OwnerID
                LEFT JOIN 
                    images I_update ON E.UpdateBy = I_update.OwnerID
                WHERE 
                    E.Id = '$id'";


    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $eventDetail = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$eventDetail) {
        echo json_encode(
            array(
                "data" => null,
                "status" => false,
                "message" => "Event is not in the database!",
            )
        );
    }

    echo json_encode(
        array(
            "data" => $eventDetail,
            "status" => false,
            "message" => "Success to get event detail!",
        )
    );

} catch (Exception $e) {
    echo json_encode(
        array(
            "data" => null,
            "status" => false,
            "message" => "Fail to get event detail because of $e!",
        )
    );
}
