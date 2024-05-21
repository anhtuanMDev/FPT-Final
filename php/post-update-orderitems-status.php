<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;
    $status = $data->status;

    if ($status == 'Denied' || $status == 'Cancled') {
        // Check if order has cp
        $query = "SELECT orders.CouponID, orders.Id FROM couponitems
        INNER JOIN orders ON orders.Id = couponitems.OrderID 
        WHERE couponitems.Id = '$id'";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row["CouponID"]) {
            // Check if is there any couponitems left in order before reset cp user
            $cp = $row['CouponID'];
            $ordID = $row['Id'];

            $query = "SELECT COUNT(orderitems.Id) as count FROM couponitems
            INNER JOIN orderitems ON orderitems.FoodID = couponitems.FoodID AND orderitems.OrderID = :ordID
            WHERE couponitems.CouponID = :cp AND orderitems.Status NOT IN ('Cancelled', 'Denied')";
            $stmt = $dbConn->prepare($query);
            $stmt->bindParam(':cp', $cp);
            $stmt->bindParam(':ordID', $ordID);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row['count'] == 0) {
                $query = "UPDATE couponuser SET Status = 0 WHERE Id = :cp";
                $stmt = $dbConn->prepare($query);
                $stmt->bindParam(':cp', $cp);
                $stmt->execute();
            }

        }
    }

    function generateID($prefix)
    {
        $charc = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charcLength = strlen($charc);
        $randomString = $prefix;
        for ($i = 0; $i < 17; $i++) {
            $randomString .= $charc[rand(0, $charcLength - 1)];
        }

        return $randomString;
    }

    $query = "SELECT foods.Name, orderitems.Quantity 
    FROM orderitems INNER JOIN foods ON orderitems.FoodID = foods.Id 
    WHERE orderitems.Id = '$id'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $content = "Đơn hàng của bạn đã được cập nhật. Món " . $row['Name'] . " với số lượng " . $row['Quantity'] . " đã được nhà hàng cập nhật thành trạng thái";

    switch ($status) {
        case 'Done':
            $content .= " hoàn thành.";
            break;
        case 'Cancled':
            $content .= " bị hủy.";
            break;
        case 'Denied':
            $content .= " đã bị từ chối.";
            break;
        case 'Approved':
            $content .= " đã được chấp nhận";
            break;
        case 'In Delivery':
            $content .= " đang được giao hàng";
            break;
        case 'Made':
            $content .= " đã làm xong";
            break;
    }

    if ($status == 'Done') {
        $query = "UPDATE orderitems SET Status =  '$status', ArriveAt = NOW() WHERE Id = '$id'";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();

        $query = "UPDATE users 
        SET `Rank` = `Rank` + (
            SELECT orderitems.Value 
            FROM orders 
            INNER JOIN orderitems ON orders.Id = orderitems.OrderID
            WHERE orderitems.Id = '$id'
        )
        WHERE Id IN (
            SELECT orders.UserID 
            FROM orders 
            INNER JOIN orderitems ON orders.Id = orderitems.OrderID
            WHERE orderitems.Id = '$id'
        )
        ";

        $stmt = $dbConn->prepare($query);
        $stmt->execute();

        $notifyID = generateID('NOT');
        $query  = "INSERT INTO notifications (Id, Title, Content, IsRead, CreateAt, TargetID, Creator)
        SELECT '$notifyID', 'Đơn hàng của bạn đã được cập nhật', '$content', 1, NOW(), orders.UserID, 'ADM00000000000000001'
           FROM orders
           INNER JOIN orderitems ON orders.Id = orderitems.OrderID
           WHERE orderitems.Id = '$id'";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();
    } else {
        $query = "UPDATE orderitems SET Status =  '$status' WHERE Id = '$id'";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();

        $notifyID = generateID('NOT');
        $query  = "INSERT INTO notifications (Id, Title, Content, IsRead, CreateAt, TargetID, Creator)
        SELECT '$notifyID', 'Đơn hàng của bạn đã được cập nhật', '$content', 1, NOW(), orders.UserID, 'ADM00000000000000001'
           FROM orders
           INNER JOIN orderitems ON orders.Id = orderitems.OrderID
           WHERE orderitems.Id = '$id'";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();
    }

    echo json_encode(array("statusText" => "Cập nhật trạng thái đơn hàng thành công", "status" => true));
} catch (Exception $e) {
    echo json_encode(array("statusText" => "Cập nhật trạng thái đơn hàng thất bại bởi vị $e", "status" => false));
}
