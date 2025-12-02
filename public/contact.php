<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { exit('Invalid request'); }
if (!empty($_POST['hp'])) { exit('OK'); } // Honeypot

$name = trim($_POST['name']);
$email = trim($_POST['email']);
$org = trim($_POST['org']);
$msg = trim($_POST['message']);

if (!$name || !$email || !$msg) {
    exit('Missing required fields.');
}

$to = "screenITology@gmail.com";
$subject = "New Inquiry from ScreenITology: $name";

$body = "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Organization: $org\n\n";
$body .= "Message:\n$msg\n\n";
$body .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n";

$headers = "From: ScreenITology <contact@screenitology.com>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

mail($to, $subject, $body, $headers);

header("Location: /contact.html?sent=1");
exit;
?>
