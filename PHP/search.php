<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php'; 
include_once 'search-res.php';
include_once 'search-food.php';

$data = json_decode(file_get_contents("php://input"));
$search = $data->search;

$resResults = searchRestaurants($dbConn, $search);
$foodResults = searchFoods($dbConn, $search);

echo json_encode(array(
    "restaurantResults" => $resResults,
    "foodResults" => $foodResults,
));
?>