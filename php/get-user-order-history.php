<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Max-Age: 3600");
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once 'connection.php';

try {
    $data = json_decode(file_get_contents('php://input'));
    $id = $data->id;

    $query = "SELECT orders.TotalValue, orders.Id, orders.Delivery, orders.CreateAt,
    address.Address, address.Phone, address.City, address.District, address.Ward
    FROM orders
    INNER JOIN address ON orders.AddressID = address.Id
    WHERE orders.UserID = '$id' AND orders.Status = 'Done' ORDER BY orders.CreateAt DESC, orders.UpdateAt DESC ";

    // $query = "SELECT orders.TotalValue, orders.Id, orders.Delivery, orders.CreateAt
    // FROM orders
    // WHERE orders.UserID = '$id' AND orders.Status = 'Done' ORDER BY orders.CreateAt DESC, orders.UpdateAt DESC";

    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($orders as $key => $order) {
    $ordID = $order["Id"];
    $query = "SELECT orderitems.Id, orderitems.Quantity, orderitems.FoodID, orderitems.Value,
    orderitems.ArriveAt, orderitems.OrderID, orderitems.Status, foods.Name AS FoodName, images.Id AS Image
    FROM orderitems
    INNER JOIN foods ON foods.Id = orderitems.FoodID
    INNER JOIN images ON images.OwnerID = orderitems.FoodID
    WHERE orderitems.OrderID = '$ordID'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $orderItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $orders[$key]['Items'] = $orderItems;
    }

    echo json_encode(
        array(
            'data' => $orders,
            'status' => true,
            'statusText' => "Lấy lịch sử đơn hàng thành công cho người dùng $id!",
        )
    );
} catch (Exception $e) {
    echo json_encode(
        array(
            'id' => null,
            'status' => false,
            'statusText' => "Lấy lịch sử đơn hàng không thành công cho người dùng $id! $e",
        )
    );
} catch (\Throwable $th) {
}