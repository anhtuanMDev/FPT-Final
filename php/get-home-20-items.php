<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {
    $home = array();
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;

    $query = "SELECT Id, `Title` FROM events WHERE `Start` <= NOW() AND `End` > NOW()";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $home['eventArray'] = $events;
    if (count($home['eventArray']) == 0) {
        $home['recommendedItemsArray'] = [];
    } else {
            $evtID = $home['eventArray'][0]['Id'];
            $query = "SELECT foods.Id, foods.TimeMade, foods.Price, foods.Name, foods.FeatureItem, 
            foods.Discount, (CASE WHEN favlist.Id IS NULL THEN 0 ELSE 1 END) as UserFavorite,
            images.Id AS Image,
            COUNT(reviews.Id) as TotalReview,
            COALESCE(ROUND(AVG(Point),1), 0) AS Point
            FROM coupons
            INNER JOIN couponitems ON couponitems.`CouponID` = coupons.Id 
            INNER JOIN foods ON foods.`Id` = couponitems.`FoodID`
            LEFT JOIN favlist ON foods.Id = favlist.TargetID AND favlist.UserID = '$id'
            INNER JOIN images ON foods.Id = images.OwnerID
            LEFT JOIN reviews ON foods.Id = reviews.`TargetID`
            WHERE Start <= NOW() AND End >= NOW() 
            GROUP BY coupons.`Id`, foods.`Id`, images.Id, favlist.Id ORDER BY `Start` desc LIMIT 5";
            $stmt = $dbConn->prepare($query);
            $stmt->execute();
            $foods = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $home['recommendedItemsArray'] = $foods;
    }



    $query = "SELECT foods.Id, foods.TimeMade, foods.Price, foods.Name, foods.FeatureItem, 
    foods.Discount, (CASE WHEN favlist.Id IS NULL THEN 0 ELSE 1 END) as UserFavorite,
    images.Id AS Image,
    COUNT(reviews.Id) as TotalReview,
    COALESCE(ROUND(AVG(Point),1), 0) AS Point
    FROM foods 
    LEFT JOIN favlist ON foods.Id = favlist.TargetID AND favlist.UserID = '$id'
    INNER JOIN images ON foods.Id = images.OwnerID
    LEFT JOIN reviews ON foods.Id = reviews.TargetID
    WHERE foods.FeatureItem = 1 AND foods.Status = 'Sale'
    GROUP BY foods.Id, images.Id
    , favlist.Id limit 10";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $foods = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $home['featureArray'] = $foods;

    $query = "SELECT foods.*, (CASE WHEN favlist.Id IS NULL THEN 0 ELSE 1 END) as UserFavorite,
    images.Id AS Image,
    COUNT(reviews.Id) as TotalReview,
    COALESCE(ROUND(AVG(Point),1), 0) AS Point
    FROM foods 
    LEFT JOIN favlist ON foods.Id = favlist.TargetID AND favlist.UserID = '$id'
    INNER JOIN images ON foods.Id = images.OwnerID
    LEFT JOIN reviews ON foods.Id = reviews.TargetID
    WHERE foods.Status = 'Sale' 
    GROUP BY foods.Id, images.Id, favlist.Id
    ORDER BY CreateAt DESC, TimeMade DESC 
    LIMIT 10";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $foods = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $home['newItemsArray'] = $foods;

    $query = "SELECT foods.*, SUM(orderitems.Quantity) as Sold, (CASE WHEN favlist.Id IS NULL THEN 0 ELSE 1 END) as UserFavorite,
    images.Id AS Image,
    COUNT(reviews.Id) as TotalReview,
    COALESCE(ROUND(AVG(Point),1), 0) AS Point
    FROM foods 
    INNER JOIN orderitems ON foods.Id = orderitems.FoodID AND orderitems.Status = 'Done'
    LEFT JOIN favlist ON foods.Id = favlist.TargetID AND favlist.UserID = '$id'
    INNER JOIN images ON foods.Id = images.OwnerID
    LEFT JOIN reviews ON foods.Id = reviews.TargetID
    WHERE foods.Status = 'Sale' 
    GROUP BY foods.Id, images.Id, favlist.Id
    ORDER BY Sold DESC, TimeMade DESC, Price ASC 
    LIMIT 10";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $foods = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $home['popularItemsArray'] = $foods;

    $query = "SELECT 
    restaurants.Id
    ,restaurants.Name
    ,restaurants.Introduction
    ,restaurants.Address
    ,restaurants.City
    ,restaurants.Ward
    ,restaurants.District
    ,restaurants.Phone
    ,restaurants.Email
    ,restaurants.Status
    ,restaurants.ownerID,
    MAX(images.Id) AS Image
    ,COUNT(reviews.Id) as TotalReview,
    COALESCE(ROUND(AVG(Point),1), 0) AS Point
    ,COALESCE(SUM(orderitems.Quantity),0) as Sold
    ,(CASE WHEN favlist.Id IS NULL THEN 0 ELSE 1 END) AS UserFavorite 
    FROM restaurants    
    LEFT JOIN foods ON restaurants.Id = foods.RestaurantId
    LEFT JOIN orderitems ON foods.Id = orderitems.FoodId
    LEFT JOIN favlist ON restaurants.Id = favlist.TargetID AND favlist.UserID = '$id'
    INNER JOIN images ON restaurants.Id = images.OwnerID
    LEFT JOIN reviews ON restaurants.Id = reviews.TargetID
    WHERE foods.Status != 'Banned' AND foods.Status != 'Removed' 
    AND restaurants.Status != 'Banned' AND restaurants.Status != 'Removed' 
    GROUP BY restaurants.Id, favlist.Id ORDER BY Sold DESC LIMIT 5";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $restaurants = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $home['restaurantsArray'] = $restaurants;

    echo json_encode(
        array(
            "status" => true,
            "statusText" => "Lấy danh sách món ăn thành công!",
            "data" => $home,
        ),
    );
} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "statusText" => "Không thể lấy danh sách món ăn $e!",
            "data" => [],
        ),
    );
}
