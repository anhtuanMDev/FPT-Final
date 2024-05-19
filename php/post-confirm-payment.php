<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

function generateID($prefix)
{
    $characters = '0123456789QWERTYUIOPASDFGHJKLZXCVBNM';
    $charactersLength = strlen($characters);
    $randomString = $prefix;
    for ($i = 0; $i < 17; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

try {
    $data = json_decode(file_get_contents("php://input"));
    $orderID = $data->orderID;
    $item = $data->item;
    $couponID = $data->couponID;

    $couponID = $couponID ? $couponID : "";

    $query = "SELECT `Discount` FROM coupons WHERE Id = :couponID";
    $stmt = $dbConn->prepare($query);
    $stmt->bindParam(':couponID', $couponID, PDO::PARAM_STR);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $couponDiscount = $result ? $result['Discount'] : 0; // Đặt giá trị mặc định nếu không có coupon

    foreach ($item as $i) {
        $id = $i->id;
        $quantity = $i->quantity;

        $query = "UPDATE orderitems 
                    INNER JOIN foods ON foods.Id = orderitems.FoodID
                    LEFT JOIN couponitems ON orderitems.FoodID = couponitems.FoodID AND couponitems.CouponID = :couponID
                    SET orderitems.Pick = 1, 
                        orderitems.Quantity = :quantity, 
                        orderitems.Status = 'Waiting',  
                        orderitems.Value = (
                            foods.Price * (1 - (CASE 
                                                    WHEN couponitems.Id IS NULL THEN foods.Discount
                                                    ELSE :couponDiscount
                                                END)  / 100) * :quantity
                        )
                  WHERE orderitems.Id = :orderItemId";
        $stmt = $dbConn->prepare($query);
        $stmt->bindParam(':couponID', $couponID, PDO::PARAM_STR);
        $stmt->bindParam(':quantity', $quantity, PDO::PARAM_INT);
        $stmt->bindParam(':couponDiscount', $couponDiscount, PDO::PARAM_INT);
        $stmt->bindParam(':orderItemId', $id, PDO::PARAM_STR);
        $stmt->execute();
    }

    $query = "SELECT orderitems.`OrderID`,
    SUM(orderitems.`Quantity` * ROUND(
                        foods.Price * (1 - (CASE 
                                                WHEN couponitems.`Id` IS NULL
                                                THEN foods.Discount
                                                ELSE (
                                                    $couponDiscount
                                                )
                                            END) / 100))) AS Total
    from orderitems 
    INNER JOIN foods ON foods.Id = orderitems.`FoodID` AND orderitems.`Pick` = 1
    LEFT JOIN couponitems ON orderitems.`FoodID` = couponitems.`FoodID` AND couponitems.`CouponID` = '$couponID'
    WHERE orderitems.`OrderID` = '$orderID' GROUP BY orderitems.`OrderID` LIMIT 100";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $order = $stmt->fetchColumn(1);


    if ($order === false) {
        echo json_encode(
            array(
                "status" => false,
                "statusText" => "Không thể thanh toán đơn hàng không có món ăn"
            )
        );
        return;
    }

    // $delivery = 0;
    // Kiểm tra xem couponID có tồn tại trong bảng coupons không
    if ($couponID) {
        $query = "SELECT `Id` FROM coupons WHERE Id = :couponID";
        $stmt = $dbConn->prepare($query);
        $stmt->bindParam(':couponID', $couponID, PDO::PARAM_STR);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$result) {
            // Nếu couponID không tồn tại, đặt couponID là null để tránh vi phạm khóa ngoại
            $couponID = null;
        }
    }

    $delivery = 0;
    // $order = 0; // Thay thế $order bằng giá trị phù hợp

    $query = "UPDATE `orders` 
              SET TotalValue = :totalValue,
                  Delivery = :delivery,
                  -- CreateAt = NOW(),
                  CouponID = :couponID
              WHERE `Id` = :orderID";
    $stmt = $dbConn->prepare($query);
    $stmt->bindParam(':totalValue', $order, PDO::PARAM_INT);
    $stmt->bindParam(':delivery', $delivery, PDO::PARAM_INT);
    $stmt->bindParam(':couponID', $couponID, PDO::PARAM_STR);
    $stmt->bindParam(':orderID', $orderID, PDO::PARAM_STR);
    $stmt->execute();

error_log("couponID".$couponID);

    echo json_encode(
        array(
            "status" => true,
            "statusText" => "Đã xác nhận đơn hàng"
        ),
        JSON_UNESCAPED_UNICODE
    );


} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "statusText" => "Lỗi cập xác nhận thanh toán bởi vì $e"
        ),
        JSON_UNESCAPED_UNICODE
    );
}

?>