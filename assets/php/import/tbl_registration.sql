-- اینجا هم میایم جداول دیتابیس رو ایجاد میکنیم که تنها 2 نکته  دارد که در قسمت ثبت نام و آپدیت کردن مهم است که زمانی که کاربر رمز عبور خودش رو ریکاوری میکنه ، زمان اون رو مشخص میکنه
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
