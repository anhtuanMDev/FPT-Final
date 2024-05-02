<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Max-Age: 3600');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once 'connection.php';
function generateID($prefix) {
    $characters = '0123456789QWERTYUIOPASDFGHJKLZXCVBNM';
    $charactersLength = strlen($characters);
    $randomString = $prefix;
    for ($i = 0; $i < 17; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
// Chúng tôi đã ghi nhận hành vi của đối tượng báo cáo - Đặng Văn Phong, cảm ơn bạn đã báo cáo.
try {
    $data = json_decode(file_get_contents("php://input"));

    $id = $data->id;
    $replyBy = $data->replyBy;
    $status = $data->status;
    $targetID = $data->targetID;

    $dbConn->beginTransaction();

    // điền reply theo targetID -> targetName -> Chúng tôi đã ghi nhận hành vi của đối tượng báo cáo - targetName, cảm ơn bạn đã báo cáo. trong bảng tương ứng
    $query = "SELECT Name FROM users WHERE Id = '$targetID'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $res = $stmt->fetch(PDO::FETCH_ASSOC);
    $targetName = $res ? $res['Name'] : '';

    $query = "SELECT Name FROM restaurants WHERE Id = '$targetID'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $res = $stmt->fetch(PDO::FETCH_ASSOC);
    $targetName = $res ? $res['Name'] : $targetName;

    $query = "SELECT Name FROM foods WHERE Id = '$targetID'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $res = $stmt->fetch(PDO::FETCH_ASSOC);
    $targetName = $res ? $res['Name'] : $targetName;

    $reply = "Chúng tôi đã ghi nhận hành vi của đối tượng báo cáo - $targetName, cảm ơn bạn đã báo cáo.";

    $query = "UPDATE reports SET Status = 'Done', Reply='$reply', ReplyBy = '$replyBy', ReplyAt = Now() WHERE reports.Id = '$id'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();

    // nếu $targetID là người dùng thì cập nhật trạng thái của người dùng, nếu là nhà hàng thì cập nhật trạng thái của nhà hàng, món ăn thì cập nhật trạng thái của món ăn
    if ($targetID[0] == 'U') {
        $query = "UPDATE users SET Status = '$status', UpdateAt = Now() WHERE Id = '$targetID'";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();
    } else if ($targetID[0] == 'R') {
        $query = "UPDATE restaurants SET Status = '$status', UpdateAt = Now() WHERE Id = '$targetID'";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();
    } else if ($targetID[0] == 'F') {
        $query = "UPDATE foods SET Status = '$status' , UpdateAt = Now() WHERE Id = '$targetID'";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();
    }

    $notifyID = generateID('NOT');
    $query = "INSERT INTO notifications (Id, Title, Content, IsRead, CreateAt, TargetID, Creator)
    VALUES ('$notifyID', 'Báo cáo của bạn đã được trả lời', '$reply', 0, Now(), 
    (SELECT reports.Author FROM reports WHERE reports.Id = '$id'), '$replyBy')";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();

    $dbConn->commit();
    echo json_encode(
        array(
            "statusText" => "Cấm thành công $targetName",
            "status" => true
        )
    );
} catch (Exception $e) {
    $dbConn->rollBack();
    echo json_encode(
        array(
            "statusText" => "Cấm không thành công bởi vì $e",
            "status" => false
        )
    )
    ;
}
;