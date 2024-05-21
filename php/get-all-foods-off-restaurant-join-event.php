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
                            F.Id AS Id,
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
                                WHEN EXISTS (
                                    SELECT 1
                                    FROM couponitems CI
                                    JOIN events E ON E.CouponID = CI.CouponID
                                    WHERE CI.FoodID = F.Id
                                    AND CI.Status = 'Active'
                                    AND E.Id = '$eventId'
                                ) THEN TRUE
                                ELSE FALSE
                            END AS InCouponItems
                        FROM
                            foods F
                        WHERE
                            F.RestaurantID = '$resId'
                            AND F.Status != 'Banned'
                        GROUP BY F.Id, F.Name, F.TimeMade, F.Price, F.CreateAt
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