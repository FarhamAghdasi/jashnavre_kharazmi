<?php

// این اطلاعات متصل شدن به دیتابیس برای لوکال هاست است و برای اجرا در هاست خودتون باید مقادیر رو تغییر بدید
define('DB_HOST', 'localhost');
define('DB_NAME', 'form_php');
define('DB_USER', 'root');
define('DB_PASSWORD', '');

try {
    $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD); // با روش PDO به دیتابیس متصل میشویم
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // سپس با اطلاعاتی که از طریق فرم تماس با ما ارسال شدش رو درون متغیر میریزیم
    $firstName = filter_var($_POST['firstName'], FILTER_SANITIZE_STRING);
    $lastName = filter_var($_POST['lastName'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['emailId'], FILTER_VALIDATE_EMAIL);
    $phone = filter_var($_POST['contactNumber'], FILTER_SANITIZE_STRING);
    // البته اینجا پسورد رو رمز نگاری میکنیم تا امنیت وبسایت فراهم بشه 
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

    // اول از همه برسی میکنه که نام کاربری ، شماره موبایل یا ایمیل در دیتابیس وجود دارد یا خیر
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email OR phone = :phone");
    $stmt->execute(['email' => $email, 'phone' => $phone]);
    $existingUser = $stmt->fetch();

    // اگه وجود داشت ارور میده و از طریق json و ajax منتقل میشه
    if ($existingUser) {
        $response = ['status' => 'error', 'message' => 'نام ، نام خانوادگی یا ایمیل یا شماره تلفن وارد شده در سامانه ثبت شده است.'];
    } else {
        // اگه اوکی بود میاد اطلاعات رو با sql insert وارد دیتابیس میکنه 
        // البته از قبل من در پوشه import فایل مربوط به sql جدول دیتابیس رو آماده کردم تا اینجا به مشکل نخوره
        $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, phone, password) VALUES (:firstName, :lastName, :email, :phone, :password)");
        $stmt->execute(['firstName' => $firstName, 'lastName' => $lastName, 'email' => $email, 'phone' => $phone, 'password' => $password]);

        // اینحجا هم اگه اوکی شد که به صورت json / ajax اطلاعات رو به صفحه ثبت نام ارسال میکنه و برعکس
        if ($stmt->rowCount() > 0) {
            $response = ['status' => 'success', 'message' => 'ثبت نام شما با موفقیت انجام شد.'];
        } else {
            $response = ['status' => 'error', 'message' => 'خطایی در ثبت نام رخ داده است. لطفاً با پشتیبانی تماس بگیرید.'];
        }
    }

    // ارور هارو به صورت json / ajax منتقل کنه
    echo json_encode($response);

    $conn = null;
} catch(PDOException $e) {
    // اگه با هندل ارور مواجه شده ، این ارور رو منتقل کنه
    error_log($e->getMessage());
    echo 'error: خطایی رخ داده است. لطفاً با پشتیبانی تماس بگیرید.';
}
