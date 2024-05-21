<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {
    $resId = $_GET['resId'];
    $eventId = $_GET['eventId'];

    $query = "SELECT DISTINCT
                            F.Id,
                            F.Name,
                            F.TimeMade,
                            F.Price,
                            F.CreateAt,
                            (
                                SELECT Id
                                FROM images
                                WHERE
                                    OwnerID = F.Id
                                LIMIT 1
                            ) AS Image,
                            CASE
                                WHEN CI.Status = 'Active' THEN TRUE
                                ELSE FALSE
                            END AS InCouponItems,
                            CI.`Status` AS CouponItemStatus
                        FROM
                            foods F
                            LEFT JOIN couponitems CI ON CI.FoodID = F.Id
                            INNER JOIN events E ON E.`CouponID` = CI.`CouponID`
                        WHERE
                            F.RestaurantID = '$resId'
                            AND F.Status != 'Banned'
                            AND E.`Id` = '$eventId'
                        ORDER BY F.CreateAt Desc";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($data == null) {
        echo json_encode(
            array(
                "data" => [],
                "status" => false,
                "statusText" => "Không tìm thấy món ăn nào!",
            )
        );
        return;
    }

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