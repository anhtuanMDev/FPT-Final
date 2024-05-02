<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {
    function generateID($prefix)
    {
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $randomString = $prefix;

        for ($i = 0; $i < 17; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }

        return $randomString;
    }

    $data = json_decode(file_get_contents('php://input'));
    $couponId = $data->couponId;
    $eventId = $data->eventId;
    $foodList = $data->foodList;

    // CREATE TABLE `CouponItems` (
    //     `Id` varchar(20) NOT NULL,
    //     `CouponID` varchar(20) NOT NULL,
    //     `FoodID` varchar(20) NOT NULL,
    //     `Value` decimal(10, 0) DEFAULT NULL,
    //     PRIMARY KEY (`Id`),
    //     KEY `CouponID` (`CouponID`),
    //     KEY `FoodID` (`FoodID`),
    //     CONSTRAINT `couponitems_ibfk_1` FOREIGN KEY (`CouponID`) REFERENCES `coupons` (`Id`),
    //     CONSTRAINT `couponitems_ibfk_2` FOREIGN KEY (`FoodID`) REFERENCES `foods` (`Id`)
    // ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

    // type EventDetail = {
    //     Id: string,
    //     Title: string,
    //     Content: string,
    //     Start: string,
    //     End: string,
    //     CouponID: string,
    //     CouponCode: string,
    //     Discount: number,
    //     Type: string,
    //     Amount: number
    // }

    // type Food = {
    //     Id: string,
    //     Name: string,
    //     Price: number,
    //     Image: string,
    //     InCouponItems: boolean
    // }
    // Begin transaction
    $dbConn->beginTransaction();

    // Update couponItems
    foreach ($foodList as $key => $value) {

        $query = "SELECT Id, FoodID, Status FROM couponitems WHERE CouponID = '$couponId' AND FoodID = '" . $value->Id . "'";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$result && $value->InCouponItems) {
            $newCpiID = generateID("CPI");  
            $query = "INSERT INTO couponitems (Id, CouponID, FoodID, Value) VALUES ('$newCpiID', '$eventId', '" . $value->Id . "', 0)";
            $stmt = $dbConn->prepare($query);
            $stmt->execute();
        } else {
            if ($result['Status'] == "Deleted" && $value->InCouponItems) {
                $query = "UPDATE couponitems SET Status = 'Active' WHERE Id = '" . $result["Id"] . "'";
                $stmt = $dbConn->prepare($query);
                $stmt->execute();
            } else if ($result['Status'] == "Active" && !$value->InCouponItems) {
                $query = "UPDATE couponitems SET Status = 'Deleted' WHERE Id = '" . $result["Id"] . "'";
                $stmt = $dbConn->prepare($query);
                $stmt->execute();
            }
        }
    }
    // Commit the transaction
    $dbConn->commit();

    echo json_encode(
        array(
            "status" => true,
            "statusText" => "Cập nhật thành công!",
            "data" => null,
        )
    );

} catch (Exception $e) {
    // Rollback the transaction if an exception occurs
    $dbConn->rollback();

    echo json_encode(
        array(
            "status" => false,
            "statusText" => "Cập nhật không thành công bởi vì $e!",
            "data" => null,
        )
    );
}