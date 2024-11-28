<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "my_database";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["message" => "Connection failed: " . $conn->connect_error]));
}

// Get the user data from the request
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];
$firstname = mysqli_real_escape_string($conn, $data['firstname']);
$lastname = mysqli_real_escape_string($conn, $data['lastname']);
$email = mysqli_real_escape_string($conn, $data['email']);
$phone = mysqli_real_escape_string($conn, $data['phone']);
$date = mysqli_real_escape_string($conn, $data['date']);
$membership = mysqli_real_escape_string($conn, $data['membership']);
$imagePath = $data['image'] ?? null; // Handle image if provided

// Construct the SQL update query
$sql = "UPDATE users SET firstname='$firstname', lastname='$lastname', email='$email', phone='$phone', date='$date', membership='$membership'";

if ($imagePath) {
    $sql .= ", image='$imagePath'";
}
$sql .= " WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "User updated successfully"]);
} else {
    echo json_encode(["message" => "Error: " . $conn->error]);
}

$conn->close();
?>