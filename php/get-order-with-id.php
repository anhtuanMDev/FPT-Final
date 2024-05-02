<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Max-Age: 3600");
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once 'connection.php';

try {
    $data = json_decode(file_get_contents('php://input'));
    // $userId = $data->userId;
    $orderId = $data->orderId;

    $query = "SELECT OD.TotalValue, OD.Id, OD.Delivery, OD.CreateAt, OD.UserID,
                        U.Name AS UserName, U.Email AS UserEmail, 
                        (SELECT Id FROM images WHERE OD.UserID = images.OwnerID) AS  UserImage
                        FROM orders OD
                        INNER JOIN users U ON OD.UserID = U.Id
                        WHERE OD.Id = '$orderId'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $order = $stmt->fetch(PDO::FETCH_ASSOC);

    $query = "SELECT ODI.Id, ODI.Quantity, ODI.Value,
                            ODI.ArriveAt, ODI.Status, 
                            (SELECT Name FROM foods WHERE ODI.FoodID = foods.Id) AS FoodName,
                            (SELECT Id FROM images WHERE ODI.FoodID = images.OwnerID) AS FoodImage
                            FROM orderitems ODI
                            WHERE ODI.OrderID = '$orderId'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $orderItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // foreach ($orders as $key => $order) {
    $order['Items'] = $orderItems;
    // }

    echo json_encode(
        array(
            'data' => $order,
            'status' => true,
            'statusText' => "Lấy đơn hàng thành công!",
        )
    );
} catch (Exception $e) {
    echo json_encode(
        array(
            'data' => null,
            'status' => false,
            'statusText' => "Lấy đơn hàng không thành công! $e",
        )
    );
}