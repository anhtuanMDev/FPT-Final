<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

function generateRandomString($prefix)
{
    $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $randomString = $prefix;
    for ($i = 0; $i < 17; $i++) {
        $randomString .= $characters[rand(0, 61)];
    }
    return $randomString;
}


try {
    $data = json_decode(file_get_contents('php://input'));
    $id =  $data->id;
    $user = $data->userID;

    $query = "SELECT orderitems.FoodID, orderitems.Quantity FROM orderitems WHERE orderitems.OrderID = '$id'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $item = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Get order in waiting status

    $query = "SELECT Id from orders WHERE `UserID` = '$user' AND `Status` = 'Waiting'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $order = $stmt->fetchColumn();
    if ($order == null) {
        // Create new order
        $ordID = generateRandomString('ORD');
        $query = "INSERT INTO `orders`(`Id`,`UserID`, `Status`) VALUES ('$ordID','$user', 'Waiting')";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();

        foreach ($item as $key => $value) {
            // Insert item into order
            $itemID = generateRandomString("ORI");
            $query = "INSERT INTO orderitems (Id,OrderID, FoodID, Quantity, Pick) 
            VALUES ('$itemID','$ordID','$value[FoodID]','$value[Quantity]',0)";
            $stmt = $dbConn->prepare($query);
            $stmt->execute();
        }
        echo json_encode(
            array(
                "status" => true,
                "statusText" => "Thêm dơn hàng thành công!",
            )
        );
    } else {
        // Getting List to check item exist in order
        $query = "SELECT orders.Id, orderitems.FoodID, orderitems.Quantity FROM orderitems
        INNER JOIN orders ON orderitems.OrderID = orders.Id AND orders.UserID = '$user' AND orders.Status = 'Waiting'
        WHERE orderitems.OrderID = '$order'";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();
        $item2 = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $ordID = $item2[0]['Id'];

        foreach ($item as $key => $value) {
            if (in_array($value['FoodID'], array_column($item2, 'FoodID'))) {
                $query = "UPDATE orderitems SET `Quantity` = '$value[Quantity]' WHERE `OrderID` = '$ordID' AND `FoodID` = '$value[FoodID]'";
                $stmt = $dbConn->prepare($query);
                $stmt->execute();
            } else {
                $itemID = generateRandomString("ORI");
                $query = "INSERT INTO orderitems (Id,OrderID, FoodID, Quantity, Pick) 
                VALUES ('$itemID','$ordID','$value[FoodID]','$value[Quantity]',1)";
                $stmt = $dbConn->prepare($query);
                $stmt->execute();
            }
        }
        echo json_encode(
            array(
                "status" => true,
                "statusText" => "Thêm dơn hàng thành công!",
            )
        );
    }
} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => 500,
            "statusText" => "Thêm dơn hàng thất bại bởi vì $e!",
            "data" => null,
        )
    );
}
