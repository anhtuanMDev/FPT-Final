<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';
$data = json_decode(file_get_contents("php://input"));

try {
    $id = $data->id;
    $result = array();
    $query = "SELECT 
    COUNT(orderitems.Id) AS TotalOrders,
    COALESCE(SUM(CASE WHEN orderitems.Status IN ('Canceled', 'Denied') THEN 1 ELSE 0 END), 0) AS CancelOrders,
    COALESCE(SUM(CASE WHEN orderitems.Status = 'Done' THEN 1 ELSE 0 END), 0) AS CompletedOrders,
    COALESCE(SUM(CASE WHEN orderitems.Status NOT IN ('Canceled', 'Denied', 'Done') THEN 1 ELSE 0 END), 0) AS PendingOrders
    FROM orderitems 
    INNER JOIN foods ON orderitems.FoodID = foods.Id
    INNER JOIN restaurants ON foods.RestaurantID = restaurants.Id
    WHERE restaurants.Id = '$id'";

    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $result['OrderStatistic'] = $row;

    $query = "SELECT foods.Name, COALESCE(SUM(Quantity),0) AS TotalQuantity
    FROM orderitems
    INNER JOIN foods ON orderitems.FoodID = foods.Id
    INNER JOIN restaurants ON foods.RestaurantID = restaurants.Id
    WHERE restaurants.Id = '$id'
    GROUP BY FoodID
    ORDER BY TotalQuantity DESC
    LIMIT 1";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row === false) {
        $result['BestSeller'] = array("Name" => "Không có", "TotalQuantity" => 0);
    } else {
        $result['BestSeller'] = $row;
    }

    $totalQuery = "SELECT COALESCE(SUM(Quantity),0) AS TotalSell
    FROM orderitems
    INNER JOIN foods ON orderitems.FoodID = foods.Id
    INNER JOIN restaurants ON foods.RestaurantID = restaurants.Id
    WHERE restaurants.Id = '$id'";
    $stmt = $dbConn->prepare($totalQuery);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $result['TotalSell'] = $row['TotalSell'];

    // Get revenue on month

    $query = "SELECT COALESCE(SUM(`Value`),0) AS TotalRevenue 
    FROM orderitems
    INNER JOIN foods ON orderitems.FoodID = foods.Id
    INNER JOIN restaurants ON foods.RestaurantID = restaurants.Id
    WHERE restaurants.Id = '$id' AND MONTH(ArriveAt) = MONTH(CURDATE())
    GROUP BY orderitems.Id";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $result['MonthRevenue'] = $row ? $row['TotalRevenue']: 0;

    $query = "SELECT COALESCE(SUM(`Value`),0) AS TotalRevenue 
    FROM orderitems
    INNER JOIN foods ON orderitems.FoodID = foods.Id
    INNER JOIN restaurants ON foods.RestaurantID = restaurants.Id
    WHERE restaurants.Id = '$id' AND MONTH(ArriveAt) = MONTH(CURDATE()) - 1
    GROUP BY orderitems.Id";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $result['PreMonthRevenue'] = $row ? $row['TotalRevenue']: 0;

    // Get revenue on year


    $query = "SELECT COALESCE(SUM(`Value`),0) AS TotalRevenue 
    FROM orderitems
    INNER JOIN foods ON orderitems.FoodID = foods.Id
    INNER JOIN restaurants ON foods.RestaurantID = restaurants.Id
    WHERE restaurants.Id = '$id' AND YEAR(ArriveAt) = YEAR(CURDATE())
    GROUP BY orderitems.Id";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $result['YearRevenue'] = $row ? $row['TotalRevenue']: 0;

    $query = "SELECT COALESCE(SUM(`Value`),0) AS TotalRevenue 
    FROM orderitems
    INNER JOIN foods ON orderitems.FoodID = foods.Id
    INNER JOIN restaurants ON foods.RestaurantID = restaurants.Id
    WHERE restaurants.Id = '$id' AND YEAR(ArriveAt) = YEAR(CURDATE()) - 1
    GROUP BY orderitems.Id";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $result['PreYearRevenue'] = $row ? $row['TotalRevenue']: 0;

    echo json_encode(array(
        "message" => "Lấy dữ liệu thành công",
        "status" => true,
        "data" => $result
    ));

} catch (Exception $e) {
    echo json_encode(array(
        "message" => "Lấy dữ liệu thất bại $e",
        "status" => false
    ));
}
