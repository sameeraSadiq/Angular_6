<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "my_database";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

$requiredFields = ['firstname', 'lastname', 'email', 'phone', 'date', 'membership'];
foreach ($requiredFields as $field) {
    if (!isset($_POST[$field])) {
        echo json_encode(["message" => "Missing required field: $field"]);
        exit();
    }
}

$firstname = mysqli_real_escape_string($conn, $_POST['firstname']);
$lastname = mysqli_real_escape_string($conn, $_POST['lastname']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$phone = mysqli_real_escape_string($conn, $_POST['phone']);
$date = mysqli_real_escape_string($conn, $_POST['date']);
$membership = mysqli_real_escape_string($conn, $_POST['membership']);

// Handle image upload
$imagePath = null;

if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $targetDir = "uploads/";
    $targetFile = $targetDir . basename($_FILES["image"]["name"]);
    
    $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    if (!in_array($imageFileType, $allowedTypes)) {
        echo json_encode(["message" => "Invalid file type. Only JPG, JPEG, PNG, and GIF files are allowed."]);
        exit();
    }

    // Attempt to move the uploaded file
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
        $imagePath = mysqli_real_escape_string($conn, $targetFile);
    } else {
        echo json_encode(["message" => "Error uploading your file."]);
        exit();
    }
}

// Insert into database
$sql = "INSERT INTO users (firstname, lastname, email, phone, date, membership, image) VALUES ('$firstname', '$lastname', '$email', '$phone', '$date', '$membership', '$imagePath')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "User registered successfully"]);
} else {
    echo json_encode(["message" => "Error: " . $conn->error]);
}

$conn->close();
?>
