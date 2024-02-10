<?php
// این اطلاعات متصل شدن به دیتابیس برای لوکال هاست است و برای اجرا در هاست خودتون باید مقادیر رو تغییر بدید
define('DB_HOST', 'localhost');
define('DB_NAME', 'form_sign_up');
define('DB_USER', 'root');
define('DB_PASSWORD', '');

try {
    if (isset($_POST['emailId']) && isset($_POST['password'])) { // اول از همه مشاهده میکنه که اطلاعات و مقادیر دریافت شده یا نه
        $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD); // سپس با روش PDO به دیتابیس متصل میشه 
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // دریافت و اعتبارسنجی داده های فرم
        $email = filter_var($_POST['emailId'], FILTER_VALIDATE_EMAIL);
        $password = $_POST['password'];

        // بررسی کنید که آیا ایمیل در پایگاه داده وجود دارد یا خیر
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute(['email' => $email]); // بخش دیتابیس که مربوط به ایمیل می شود را با مقدار داده شده از سمت کاربر مرتبط میکند
        $user = $stmt->fetch();

        if ($user) {
            // تایید رمز عبور
            if (password_verify($password, $user['password'])) {
                // این قسمت برای این ایجاد شده که زمانی که به داشبورد منتقل میشوید ، اطلاعاتی که کاربر وارد کرده هم منتقل بشه به صفحه داشبورد و اینطوری نام کاربری و ایمیل کاربر به راحتی نمایش داده میشه

                session_start();
                // برای نام کاربری ، هم نام و نام خانوادگی استفاده میشه
                $_SESSION['email'] = $email;
                $_SESSION['first_name'] = $user['first_name'];
                $_SESSION['last_name'] = $user['last_name'];

                $response = ['status' => 'success', 'message' => 'با موفقیت وارد شدید']; // به جای استفاده از echo از این استفاده شده به خاطر اینکه ما در ajax دیتا تایپ را json صدا زدیم
            } else {
                // پسورد اگه درست نباشه
                $response = ['status' => 'error', 'message' => 'رمز عبور اشتباه است.'];
            }
        } else {
            // همچین ایمیلی اصلا وجود نداره
            $response = ['status' => 'error', 'message' => 'کاربری با این ایمیل وجود ندارد.'];
        }

        $conn = null;
    } else {
        // زمانی اتفاق می افته که اطلاعاتی که کاربر وارد کرده اینجا فرستاده نشده
        $response = ['status' => 'error', 'message' => 'فیلدهای لازم برای ورود اطلاعات ارسال نشده‌اند.'];
    }

    // اینم برای ارسال به صفحه ای که فرم وجود داره و ارور هارو نمایش بده
    // چون با jquery نمی شد که ارور هارو از سمت سرور به سمت کاربر فرستاد ، از ajax و دیتا تایپ json استفاده شده
    echo json_encode($response);
} catch(PDOException $e) {
    // اگه هندل ارور وجود داشتش بیاد این پیام رو به کاربر نشون بده
    error_log($e->getMessage());
    $response = ['status' => 'error', 'message' => 'خطایی رخ داده است. لطفاً با پشتیبانی تماس بگیرید.'];
    // اینجا هم به دلیل اینکه حلقه try بسته شده دوباره باید به سمت صفحه لاگین ارور ها فرستاده بشه
    echo json_encode($response);
}


?>
