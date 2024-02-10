
# کتابخانه آنتی ریپ

توضیحات : یک کتابخانه ساده به زبان جاوا اسکریپت میباشد که برای جلوگیری از دزدیده شدن سورس کد وبسایت یا ریپ شدن وبسایت جلوگیری شود . این کتابخانه دارای صفحات متفاوت اعم از صفحه مدیریت ، ثبت نام ، ورود ، فراموشی رمز و ... است و تمامی کد هایی که در این پروژه استفاده شده است ، به صورت کامنت شده و دارای راهنمای مختصر است . 






## جشنواره نوجوانان خوارزمی

این پروژه برای جشنواره خوارزمی سال 1402-1403 ساخته شده .

این کتابخانه توسط فرهام اقدسی ، ساخته و تهیه شده است . 

میتوانید این پروژه را به صورت آنلاین در لینک زیر مشاهده کنید : 

https://kharazmi.farhamaghdasi.ir/

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## نحوه راه اندازی

پیشنهاد میشود که اطلاعاتی که مربوط به این سورس کد است را به صورت رمز نگاری شده استفاده کنید. 

این کتابخانه هم دارای فایل تنظیمات است که شما باید در صفحه مورد نظر خودتون قبل از اجرا شدن کتابخانه ، جای گذاری کنید . یک نمونه برای شما نشان داده میشود : 

```html 
 <script language="javascript">
        /* 
Start Settings
*/
        var Save_page = true;
        var block_print = true;
        var idmblocker = true;
        var idmblocker_message = "متن پیشفرض";
        var domain_failed = "ایراد در دامنه";
        var password_page_prompt = "سوال پیشفرض رمز صفحه";
        var block_rightclick = true;
        var block_inspect = false;
        var block_view_source = true;
        var block_Copy = true;
        var diasble_alerts = true;
        var disable_consoles_log = false;
        var Allowed_Domains = ["http://localhost/", "127.0.0.1", "127.0.0.1:5500", "localhost"]; // برای اینکه در لوکال هاست اجرا شود
        var redirection_url = "http://www.farhamaghdasi.ir/";
        var password_page_action = true;
        var password_page = "" // بدون پسورد
        var block_drag = true;
        var block_iframe_copy = true;
        var block_rightclick_audio = true;
        var block_refresh = true;
        var block_cut_body = true;
        var block_paste_body = true;
        var block_paste = true;
        var block_copy_body = true;
        var block_fullscreen = true;
        var canvas = true;
        var canvas_lazy_load = true;
        var canvas_fillstyle = "#ffffff";
        var canvas_font = "10px vazirmatn"
        var canvas_color = "#000000";
        var canvas_text = "این تصاویر دارای کپی رایت هستند"
        var notification_domain = true;
        var image_src_notification = ""; // بدون تصویر
        var body_notification = "متن پیام شما";
        var title_notification = "عنوان اعلان شما";
        /* 
End Settings
*/
    </script>
```

برای استفاده از این کد ، میتوانید از cdn زیر استفاده کنید :

```html
<link rel="stylesheet" href="https://cdn.farhamaghdasi.ir/antirip.min.js">
```

برای دریافت نسخه فشرده نشده و قابل ویرایش (همراه با کامنت گذاری) میتوانید از کد زیر استفاده کنید

```html
<link rel="stylesheet" href="https://cdn.farhamaghdasi.ir/antirip.min.js">
```




## ویژگی هایی که این کتابخانه ارائه میدهد :

توجه کنید که این یک کتابخانه سبک و نرم است و تنها برای محافظت از محتوای صفحه ، میتوان استفاده کرد .

- جلوگیری از ذخیره فایل ها در وب
- جلوگیری از دیدن سورس کد صفحه
- غیر فعال کردن کپی ، پیست ، ذخیره
- جلوگیری از پرینت صفحه
- لایسنس گذاری بر روی وبسایت
- بلاک کردن ریپر ها
- واترمارک گذاری بر روی تصاویر
- محافظت از محتوای iframe
- غیر فعال کردن ارور های کنسول ، رفرش کردن صفحه
- غیر فعال کردن حالت کشیدن ، رهاکردن صفحات
- توسعه یافته با vanilla js


