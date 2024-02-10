<?php
// این اطلاعات متصل شدن به دیتابیس برای لوکال هاست است و برای اجرا در هاست خودتون باید مقادیر رو تغییر بدید
define('DB_HOST', 'localhost');
define('DB_NAME', 'form_sign_up');
define('DB_USER', 'root');
define('DB_PASSWORD', '');

try {
    if (isset($_POST['emailId'])) {
        $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD); // اتصال به دیتابیس با روز pdo
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // دریافت و اعتبارسنجی داده های فرم
        $email = filter_var($_POST['emailId'], FILTER_VALIDATE_EMAIL);

        // اول از همه برسی میکنه که این ایمیل وجود داره یا نه
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch();

        if ($user) {
            // یک پسورد جدید می سازیم
            $newPassword = bin2hex(random_bytes(8)); // یک رمز 8 رقمی رندوم برای ریست کردن اون میسازیم

            $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT); // البته اینجا هم نباید فراموش کنیم که زمانی که میخواد رمز رو آپدیت کنه باید دوباره اون رو رمز نگاری کنه
            $stmt = $conn->prepare("UPDATE users SET password = :password WHERE email = :email"); // با دستور sql محتوای دیتابیس رو آپدیت میکنیم
            $stmt->execute(['password' => $hashedPassword, 'email' => $email]); // رمز عبور جدید به صورت هش شده رو به قسمت پسورد میدهیم

            // ارسال ایمیل همراه با رمز عبور
            // البته این قسمت باید smtp که مربوط به سرور است استفاده شود و در لوکال هاست ، امکان استفاده نیست
            $to = $email;
            $subject = 'بازیابی رمز عبور';
            $message = 'رمز جدید شما : ' . $newPassword;
            $headers = 'from: info@server.ir' . "\r\n" .
                'Reply-To: info@server.ir' . "\r\n" .
                'X-Mailer: PHP/' . phpversion();

            if (mail($to, $subject, $message, $headers)) {
                echo 'ایمیل با موفقیت ارسال شد.';
            } else {
                echo 'ایمیل ارسال نشد.';
            }
        } else {
            echo 'کاربری با این ایمیل وجود ندارد.';
        }

        $conn = null;
    } else {
        echo 'فیلدهای لازم برای ارسال اطلاعات ارسال نشده‌اند.';
    }
} catch(PDOException $e) {
    error_log($e->getMessage());
    echo 'خطایی رخ داده است. لطفاً با پشتیبانی تماس بگیرید.';
}
?>
