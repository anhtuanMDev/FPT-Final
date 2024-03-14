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

    $query = "SELECT Id, UserID, AddressID, Status from orders 
    WHERE `UserID` = '$id' AND `Status` = 'Waiting' Limit 1";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $ord = $stmt->fetch(PDO::FETCH_ASSOC);
    if($ord == null) {
        echo json_encode(
            array(
                "data" => [],
                "status" => true,
                "statusText" => "Không có đơn hàng nào cho người dùng $id!",
            )
        );
        return;
    }
    $orderID = $ord['Id'];
    $addressID = $ord['AddressID'];
    $status = $ord['Status'];
    
    $query = "SELECT orderitems.Id, orderitems.FoodID, orderitems.Quantity,
    foods.Name, foods.Price, foods.Discount, foods.Description from orderitems 
    INNER JOIN foods ON orderitems.FoodID = foods.Id
    WHERE `OrderID` = '$orderID' AND foods.Status = 'Sale'";

    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $orderItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if($orderItems == null) {
        echo json_encode(
            array(
                "data" => [],
                "status" => true,
                "statusText" => "Không có món ăn nào trong đơn hàng cho người dùng $id!",
            )
        );
        return;
    } else {
        foreach ($orderItems as $key => $value) {
            $orderItems[$key]['value'] = false;
        }
        $ord['data'] = $orderItems;
        echo json_encode(
            array(
                "data" => $ord,
                "status" => true,
                "statusText" => "Lấy đơn hàng thành công cho người dùng $id!",
            )
        );
    }
    
} catch (Exception $e) {
    echo json_encode(
        array(
            "data" => [],
            "status" => false,
            "statusText" => "Lấy đơn hàng không thành công cho người dùng $id bởi vì: $e",
        )
    );
}
