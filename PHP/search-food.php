<?php
function searchFoods($dbConn, $search) {
    if (is_numeric($search)) {
        $query = "SELECT * FROM foods WHERE
            (Price LIKE $search OR
            Discount LIKE $search)
            AND Status != 'Remove'";
    } else {
        $query = "SELECT * FROM foods WHERE
            (Name LIKE '%$search%' OR
            TimeMade LIKE '%$search%')
            AND Status != 'Remove'";
    }
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $res = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    if ($stmt->rowCount() == 0) {
        return array(
            "status" => false,
            "message" => "Sorry, we can't find any food with your search!",
        );
    }
    return array(
        "response" => $res,
        "status" => true,
        "message" => "Success to find foods!",
    );
}
?>