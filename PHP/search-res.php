<?php
function searchRestaurants($dbConn, $search) {
    $query = "SELECT * FROM restaurants WHERE
    (Name LIKE '%$search%' OR
     Address LIKE '%$search%' OR
     District LIKE '%$search%' OR
     Ward LIKE '%$search%' OR
     City LIKE '%$search%')
    AND Status != 'Remove'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $res = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    if ($stmt->rowCount() == 0) {
        return array(
            "status" => false,
            "message" => "Sorry, we can't find any restaurant with your search!",
        );
    }
    return array(
        "response" => $res,
        "status" => true,
        "message" => "Success to find restaurants!",
    );
}
?>