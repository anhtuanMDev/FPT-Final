<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {
    $resId = $_GET['id'];

    // lấy tất cả món ăn của nhà hàng
    $query = "SELECT Id FROM foods WHERE RestaurantID = :resId";
    $stmt = $dbConn->prepare($query);
    $stmt->execute([':resId' => $resId]);
    $foodsId = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

    $eventsParticipated = [];
    $eventsParticipating = [];
    $eventsNotParticipated = [];

    // error_log($foodsId);
    if (empty($foodsId)) {
        // Không có món ăn nào, trả về kết quả rỗng
    } else {
        // tạo câu truy vấn động với các tham số
        $quotedFoodsId = array_map(function($id) use ($dbConn) {
            return $dbConn->quote($id);
        }, $foodsId);
        
        $placeholders = implode(',', $quotedFoodsId);

        $query = "SELECT DISTINCT events.Id, events.Title
              FROM events 
              INNER JOIN couponitems ON events.CouponID = couponitems.CouponID
              WHERE events.End < NOW() AND couponitems.FoodID IN ($placeholders)";

        // Log query for debugging
        // error_log("Query: $query");
        // error_log("Foods ID: " . implode(", ", $foodsId));

        $stmt = $dbConn->prepare($query);
        $stmt->execute();
        $eventsParticipated = $stmt->fetchAll(PDO::FETCH_ASSOC);


        // lấy tất cả các sự kiện mà nhà hàng đang tham gia : có ngày kết thúc lớn hơn ngày hiện tại và có ít nhất 1 món ăn của nhà hàng đó xuất hiện trong couponItems
        $query = "SELECT DISTINCT events.Id, events.Title
                    FROM events 
                    INNER JOIN couponitems ON events.CouponID = couponitems.CouponID
                    WHERE events.End > NOW() AND couponitems.FoodID IN ($placeholders)";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();
        $eventsParticipating = $stmt->fetchAll(PDO::FETCH_ASSOC);


        // lấy tất cả các sự kiện mà nhà hàng chưa tham gia : có ngày kết thúc lớn hơn ngày hiện tại và không có món ăn của nhà hàng đó xuất hiện trong couponItems
        $query = "SELECT Id, Title
                    FROM events 
                    WHERE `End` > NOW() AND Id NOT IN (SELECT DISTINCT events.Id
                    FROM events 
                    INNER JOIN couponitems ON events.CouponID = couponitems.CouponID
                    WHERE events.End > NOW() AND couponitems.FoodID IN ($placeholders))";

        $stmt = $dbConn->prepare($query);
        $stmt->execute();
        $eventsNotParticipated = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    // Participated NotParticipated Participating

    $data["EventsParticipated"] = $eventsParticipated;
    $data["EventsParticipating"] = $eventsParticipating;
    $data["EventsNotParticipated"] = $eventsNotParticipated;

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