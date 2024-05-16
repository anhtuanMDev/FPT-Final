<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {
    $data = json_decode(file_get_contents("php://input"));
    $userId = $data->userId;

    $query = "SELECT
                    `CU`.`Id` AS `Id`,
                    `CU`.`Status` AS `Status`,
                    `CU`.`CouponID` AS `CouponID`,
                    C.`Code` AS `Code`,
                    C.`Discount` AS `Discount`,
                    C.`Start` AS `Start`,
                    C.`End` AS `End`,
                    E.`Title` AS `Title`,
                    E.`Content` AS `Content`,
                    E.`Id` AS `EventID`,
                    C.`Type` AS `Type`,
                    (
                        SELECT COUNT(*)
                        FROM (
                            SELECT OI.FoodID
                            FROM orderitems OI
                            INNER JOIN orders O ON OI.OrderID = O.Id 
                            WHERE O.UserID = '$userId' 
                            AND O.`Status` = 'Waiting'
                            AND OI.FoodID IN (
                                SELECT CI.FoodID
                                FROM couponitems CI 
                                WHERE CI.`CouponID` = C.Id
                            )
                            GROUP BY OI.FoodID
                        ) AS subquery
                    ) AS `NumberOfFoodIDs`,
                    (
                        SELECT
                            SUM(subquery.DiscountedPrice)
                        FROM (
                            SELECT
                                OI.Quantity AS Quantity,
                                F.Price AS Price,
                                F.Discount AS Discount,
                                (F.Price * ( C.Discount / 100)) AS DiscountedPrice
                            FROM
                                orderitems OI
                                INNER JOIN orders O ON OI.OrderID = O.Id
                                INNER JOIN foods F ON OI.FoodID = F.Id
                            WHERE
                                O.UserID = '$userId'
                                AND O.`Status` = 'Waiting'
                            ) AS subquery
                    ) AS TotalDiscountedPrice
                FROM
                    couponuser CU
                    INNER JOIN coupons C ON `CU`.`CouponID` = `C`.`Id`
                    INNER JOIN events E ON `C`.`Id` = `E`.`CouponID`
                WHERE
                    C.`End` > now()
                    AND `UserID` = '$userId'
                    AND `CU`.`Status` = '0'
                ORDER BY TotalDiscountedPrice DESC, `C`.`End` ASC, `C`.`Discount` DESC";

    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($res == null) {
        echo json_encode(
            array(
                "data" => [],
                "status" => false,
                "statusText" => "Không tìm thấy mã giảm giá nào!",
            ),
        );
    } else {
        echo json_encode(
            array(
                "data" => $res,
                "status" => true,
                "statusText" => "Thành công!",
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