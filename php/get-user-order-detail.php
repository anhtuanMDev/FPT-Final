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

    $query = "SELECT orders.Id, orders.TotalValue, orders.Status, 
    orders.Delivery, orders.CreateAt, orders.UpdateAt, orders.PaymentMethod, 
    CONCAT(address.Phone, ' - ', address.Address, ', ', address.District, ', ', 
    address.Ward, ', ', address.City ) AS Address,
    coupons.Id AS CouponID, coupons.Discount, coupons.Code
    FROM orders
    LEFT JOIN address ON address.Id = orders.AddressID
    LEFT JOIN coupons ON coupons.Id = orders.CouponID
    INNER JOIN orderitems ON orderitems.OrderID = orders.Id
    WHERE orders.Id = '$id'";
    $stmt = $dbConn->prepare($query);
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $orders = $stmt->fetch(PDO::FETCH_ASSOC);
    $cp = isset($orders['CouponID']) ? $orders['CouponID'] : null;



    $query = "SELECT restaurants.Id, restaurants.Name, images.Id as Image
    FROM restaurants
    INNER JOIN images ON images.OwnerID = restaurants.Id
    INNER JOIN orderitems ON orderitems.OrderID = '$id'
    INNER JOIN foods ON foods.Id = orderitems.FoodID AND foods.RestaurantID = restaurants.Id";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $rest = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $orders['Restaurant'] = $rest;

    foreach ($orders['Restaurant'] as $key => $value) {
        $resID = $value['Id'];
        $query = "SELECT orderitems.Id, orderitems.Quantity, orderitems.Status, 
        orderitems.Value, orderitems.ArriveAt, foods.Name, images.Id AS Image,
        CASE WHEN '$cp' IS NOT NULL AND foods.Id IN (SELECT FoodID FROM 
        couponitems WHERE CouponID = '$cp') THEN 1 ELSE 0 END AS HasDiscount
        FROM orderitems
        INNER JOIN foods ON foods.Id = orderitems.FoodID AND foods.RestaurantID = '$resID'
        INNER JOIN images ON images.OwnerID = foods.ID
        WHERE orderitems.OrderID = '$id'";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();
        $foods = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $orders['Restaurant'][$key]['Items'] = $foods;
    }

    echo json_encode(
        array(
            'data' => $orders,
            'status' => true,
            'statusText' => "Lấy thông tin chi tiết của đơn hàng thành công cho người dùng $id!",
        )
    );
} catch (Exception $e) {
    echo json_encode(
        array(
            'id' => null,
            'status' => false,
            'statusText' => "Lấy thông tin chi tiết của đơn hàng không thành công cho người dùng $id! $e",
        )
    );
};
