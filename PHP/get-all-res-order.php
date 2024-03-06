<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

$id = $_GET['id'];

$query = "SELECT
orderitems.Id,
orderitems.Quantity,
orderitems.Price,
orderitems.OrderID,
orderitems.FoodID,
orders.Status,
foods.RestaurantID,
foods.Name as FoodName
FROM
orderitems
INNER JOIN
orders ON orderitems.OrderID = orders.Id
INNER JOIN
foods ON orderitems.FoodID = foods.Id
INNER JOIN
restaurants ON foods.RestaurantID = restaurants.Id WHERE foods.RestaurantID = '$id'";

$stmt = $dbConn->prepare($query);
$stmt->execute();
$res = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (count($res) == 0) {
    echo json_encode(
        array(
            "orders" => $res,
            "status" => false,
            "message" => "There is no order for this restaurant!",
        )
    );
    return;
}
echo json_encode(
    array(
        "orders" => $res,
        "status" => true,
        "message" => "Success to get all of this restaurant order!",
    )
)

?>
