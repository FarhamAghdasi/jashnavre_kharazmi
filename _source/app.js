/*
AntiRip.js
Created by Farham Aghdasi
2024
*/

/*
توجه کنید که تنظیمات این اسکریپت باید در همان صفحه ای که میخواهید استفاده کنید باشد . اگر هم میخواهید میتوانید کد های زیر رو آن کامند کنید و استفاده کنید 
در صفحه تست پیج فایل تنظیمات در قسمت پایینی صفحه قرار دارد
*/

/* 
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
        var add_license_project = true;
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
*/

/* Note : 
برای اینکه فرد بتواند به راحتی از این کتابخانه استفاده کند و امکان سفارش سازی داشته باشد ، به صورت حلقه ایف قرار دادم که اگر متغیر مربوط به حلقه ، true باشد ، اون موقع اجرا شود
*/

// تعریف تابع به نام clearAlerts
function clearAlerts() {
    // اگر متغیر diasble_alerts تنظیم شده باشد (true)، کار را انجام بده
    // اگر تنظیم شده باشد که false، این تابع عمل نمی‌کند
    if (diasble_alerts) { // if set true = work | if set false = stop 
        // یافتن تمام المان‌هایی با کلاس alert و ذخیره آن‌ها در متغیر alerts
        var alerts = document.querySelectorAll(".alert");

        // حلقه برای پیمایش تمام المان‌های با کلاس alert
        for (var i = 0; i < alerts.length; i++) {
            // پاک کردن محتوای داخل المان‌های هشدار
            alerts[i].innerHTML = "";

            // غیرفعال کردن المان‌های هشدار
            alerts[i].disabled = true;
        }

        // جایگزینی تابع window.alert با یک تابع خالی تا هیچ هشداری نمایش داده نشود
        window.alert = function() {};
    }
}


clearAlerts();

// تعریف تابع به نام disableConsoleLog
function disableConsoleLog() {
    // اگر متغیر disable_consoles_log تنظیم شده باشد (true)، تابع را غیرفعال کن
    if (disable_consoles_log) {
        // جایگزینی تابع console.log با یک تابع خالی تا هیچ پیامی در کنسول چاپ نشود
        console.log = function() {};
    }
}


disableConsoleLog();


// 1 ) Block Ctrl + s
// تابع onKeyDown برای پیشگیری از عملیات Ctrl + S (ذخیره‌سازی)
function onKeyDown() {
    // بررسی اینکه آیا کلید Ctrl و کلید S فشرده شده‌اند
    if (event.ctrlKey && event.keyCode === 83) {
        // اگر متغیر Save_page تنظیم شده باشد (true)، عملیات پیشگیری انجام شود
        if (Save_page) {
            // پیشگیری از عملیات پیش فرض مرورگر برای Ctrl + S
            event.preventDefault();
        }
    }
}

// اضافه کردن گوش دهنده‌ی رویداد برای کلیدهای فشرده شده
document.addEventListener("keydown", onKeyDown);

// 2 ) ctrl + p block
// اضافه کردن گوش دهنده‌ی رویداد برای کلیدهای فشرده شده
document.addEventListener('keydown', function(e) {
    // بررسی اینکه آیا کلید Ctrl و کلید P فشرده شده‌اند
    if (e.ctrlKey && e.key === 'p') {
        // اگر متغیر block_print تنظیم شده باشد (true)، عملیات پیشگیری انجام شود
        if (block_print) {
            // پیشگیری از عملیات پیش فرض مرورگر برای Ctrl + P
            e.preventDefault();
        }
    }
});



// 4 ) Block IDM Downloading

// اضافه کردن گوش دهنده‌ی رویداد برای وقتی که محتوای صفحه به صورت کامل بارگذاری شده است
document.addEventListener('DOMContentLoaded', function() {
    // بررسی اینکه آیا User Agent شامل عبارت 'IDM' است یا خیر (به معنای استفاده از Internet Download Manager)
    if (window.navigator.userAgent.includes('IDM')) {
        // اگر متغیر idmblocker تنظیم شده باشد (true)، یک هشدار نمایش داده می‌شود
        if (idmblocker) {
            alert(idmblocker_message); // نمایش هشدار با محتوای تعیین شده در idmblocker_message
        }
    }
});

// تابع idmBlocker برای اعمال Content Security Policy برای پیشگیری از دانلود محتوا با IDM
function idmBlocker() {
    // اگر متغیر idmblocker تنظیم شده باشد (true)، یک meta tag به head اضافه می‌شود
    if (idmblocker) {
        document.querySelector('head').innerHTML += `
            <meta http-equiv="Content-Security-Policy" content="default-src 'self';">
        `;
    }
}

// فراخوانی تابع idmBlocker برای اجرای آن
idmBlocker();


// 4 ) block right click
// اضافه کردن گوش دهنده‌ی رویداد برای زمانی که منوی راست ماوس نمایش داده می‌شود
document.addEventListener('contextmenu', function(e) {
    // اگر متغیر block_rightclick تنظیم شده باشد (true)، عملیات پیشگیری انجام شود
    if (block_rightclick) {
        // پیشگیری از نمایش منوی راست ماوس
        e.preventDefault();
    }
});

// 6 ) Block inspect element
// تابع blockInspect برای مسدود کردن ابزار "Inspect Element"
function blockInspect() {
    // اگر متغیر block_inspect تنظیم شده باشد (true)، گوش دادن به رویدادهای کلیدی
    if (block_inspect) {
        document.addEventListener('keydown', function(e) {
            // بررسی اینکه آیا کلید F12 یا ترکیب کلید Ctrl + I فشرده شده‌اند
            if (e.key === 'F12' || (e.ctrlKey && e.key === 'I')) {
                // پیشگیری از اجرای پیش فرض مرورگر برای باز کردن "Inspect Element"
                e.preventDefault();
            }
        });
    }
}

// فراخوانی تابع blockInspect برای اجرای آن
blockInspect();



// Block Ctrl U (View Source)
// تابع blockU برای مسدود کردن Ctrl + U (مشاهده منبع صفحه)
function blockU() {
    // اگر متغیر block_view_source تنظیم شده باشد (true)، گوش دادن به رویدادهای کلیدی
    if (block_view_source) {
        document.addEventListener("keydown", function(event) {
            // بررسی اینکه آیا کلید Ctrl و کلید U فشرده شده‌اند
            if (event.ctrlKey && event.keyCode === 85) {
                // پیشگیری از عملیات پیش فرض مرورگر برای باز کردن منبع صفحه
                event.preventDefault();
            }
        });
    }
}

// فراخوانی تابع blockU برای اجرای آن
blockU();




// Block Ctrl C (copy)
// تابع blockCopy برای مسدود کردن Ctrl + C (کپی کردن)
function blockCopy() {
    // اضافه کردن گوش دهنده‌ی رویداد برای زمانی که کلیدهایی فشرده می‌شوند
    document.addEventListener("keydown", (e) => {
        // بررسی اینکه آیا متغیر block_Copy تنظیم شده است و کاربر کلیدهای Ctrl + C را فشرده است
        if (block_Copy && (e.ctrlKey && e.keyCode === 67)) {
            // پیشگیری از عملیات پیش فرض مرورگر برای کپی کردن
            e.preventDefault();
        }
    });
}

// فراخوانی تابع blockCopy برای اجرای آن
blockCopy();


// Doamin V1
// در این روش اگر آدرس دامنه با آدرس تعریف شده متفاوت باشد ، آنگاه به صفحه مورد نظر فرستاده میشود

// در اینجا آرایه‌ای از آدرس‌های دامنه‌های مجاز تعریف شده است
const allowedDomains = Allowed_Domains;

// دریافت آدرس دامنه کنونی
const currentDomain = window.location.hostname;

// ساخت حلقه با مقادیر ture , false
if (add_license_project) {
// اگر آدرس دامنه کنونی در آرایه دامنه‌های مجاز نیست
if (!allowedDomains.includes(currentDomain)) {
    // نمایش هشدار به کاربر با محتوای تعیین شده در متغیر domain_failed
    alert(domain_failed);

    // هدایت کاربر به آدرس مشخص شده در redirection_url
    window.location.replace(redirection_url);

    // پاک کردن محتوای صفحه فعلی
    document.body.innerHTML = "";
}

}


// تابع getPassword برای دریافت رمز عبور از کاربر استفاده می‌شود
function getPassword() {
    // اگر عملکرد صفحه رمز عبور فعال باشد
    if (password_page_action) {
        // نمایش پنجره درخواست رمز عبور به کاربر با پیام مشخص شده در password_page_prompt
        var password = prompt(password_page_prompt);

        // بازگرداندن رمز عبور به تابع فراخواننده
        return password;
    }
}

// تابع checkPassword برای بررسی صحت رمز عبور و انجام اقدامات مربوطه استفاده می‌شود
function checkPassword(password) {
    // اگر عملکرد صفحه رمز عبور فعال باشد
    if (password_page_action) {
        // تعیین رمز عبور صحیح
        var correctPassword = password_page;

        // بررسی مطابقت رمز عبور وارد شده با رمز عبور صحیح
        if (password === correctPassword) {
            // در صورت تطابق، هیچ اقدامی انجام نمی‌شود
        } else {
            // در صورت عدم تطابق، هدایت کاربر به آدرس جدید و پاک کردن محتوای صفحه
            window.location.replace(redirection_url);
            document.body.innerHTML = "";
        }
    }
}

// دریافت رمز عبور از کاربر
var password = getPassword();

// بررسی صحت رمز عبور
checkPassword(password);




// تمامی عناصر صفحه را انتخاب کرده و بررسی می‌کنیم که آیا باید عملیات کشیدن برای آن‌ها مسدود شود یا خیر
document.querySelectorAll('*').forEach(function(element) {
    // اگر متغیر block_drag تنظیم شده باشد (true)، گوش دادن به رویداد dragstart برای عناصر صفحه
    if (block_drag) {
        element.addEventListener('dragstart', preventDrag);
    }
});

// تابع preventCopy برای مسدود کردن عملیات کپی کردن متن
function preventCopy(event) {
    // اگر متغیر block_drag تنظیم شده باشد (true)، پیشگیری از عملیات پیش فرض مرورگر برای کپی کردن متن
    if (block_drag) {
        event.preventDefault();
    }
}

// تابع preventDownload برای مسدود کردن عملیات دانلود
function preventDownload(event) {
    // اگر متغیر block_drag تنظیم شده باشد (true)، پیشگیری از عملیات پیش فرض مرورگر برای دانلود فایل‌ها
    if (block_drag) {
        event.preventDefault();
    }
}

// تابع preventDrag برای مسدود کردن عملیات کشیدن
function preventDrag(event) {
    // اگر متغیر block_drag تنظیم شده باشد (true)، پیشگیری از عملیات پیش فرض مرورگر برای کشیدن
    if (block_drag) {
        event.preventDefault();
    }
}




// Iframe

// انتخاب همه‌ی عناصری با کلاس proc-content و انجام عملیات مورد نیاز
document.querySelectorAll('.proc-content').forEach(function(iframe) {
    // اگر متغیر block_iframe_copy تنظیم شده باشد (true)
    if (block_iframe_copy) {
        // انتخاب دیو با آی‌دی overlay و تنظیم مشخصات آن برای پنهان سازی iframe
        var overlay = document.querySelector('#overlay');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.zIndex = '1';
        overlay.style.cursor = 'not-allowed';
    }
});

// Note  : باید قبل از تگ iframe ، یک دیو با آی دی overlay بسازید تا سورس کار کند




// Block Audio Settings


// انتخاب همه‌ی عناصر audio و اعمال عملیات مورد نیاز برای هر کدام
document.querySelectorAll('audio').forEach(function(audio) {
    // اضافه کردن گوش دهنده‌ی رویداد contextmenu برای هر عنصر audio
    audio.addEventListener('contextmenu', function(event) {
        // اگر متغیر block_rightclick_audio تنظیم شده باشد (true)
        if (block_rightclick_audio) {
            // پیشگیری از نمایش منوی راست موس
            event.preventDefault();
        }
    });
});


// ممکنه افراد با کلیک راست کردن بر روی قسمت های مختلف وبسایت ، بتوانند محتوای وبسایت را ببینند ، به خاطر همین قسمت صدا هم غیر فعال کردیم





// Block Refresh or F5
// البته زمانی که کاربر صفحه را رفرش میکند ، امکان دیدن سورس کد را دارد و باید این کد رو توی قسمت اول وبسایت قرار بدید

// اگر متغیر block_refresh تنظیم شده باشد (true)
if (block_refresh) {
    // تابع preventRefresh برای جلوگیری از رفرش صفحه تعریف شده است
    function preventRefresh() {
        // اضافه کردن گوش دهنده‌ی رویداد keydown به صفحه
        document.addEventListener("keydown", function(event) {
            // بررسی کد کلید فشرده شده توسط کاربر و اگر کلیدهای مشخص شده برای رفرش فشرده شده‌اند، پیشگیری از رفرش صفحه
            if (event.keyCode === 116 || (event.ctrlKey && event.keyCode === 82) || (event.ctrlKey && event.shiftKey && event.keyCode === 82) || (event.altKey && event.keyCode === 82)) {
                event.preventDefault();
            }
        });
    }

    // فراخوانی تابع preventRefresh برای اجرای آن
    preventRefresh();
}



// اگر متغیر block_cut_body تنظیم شده باشد (true)
if (block_cut_body) {
    // تابع disableCopyCut برای جلوگیری از عملیات برش متن تعریف شده است
    function disableCopyCut() {
        // تنظیم یک ویژگی اختصاصی به بدنه صفحه که در صورت برش متن، عملیات پیشفرض مرورگر را متوقف می‌کند
        document.body.setAttribute("oncut", "return true");
    }

    // فراخوانی تابع disableCopyCut برای اجرای آن
    disableCopyCut();

    // اگر متغیر block_paste_body تنظیم شده باشد (true)
    if (block_paste_body) {
        // تابع disableCopyPaste برای جلوگیری از عملیات چسباندن متن تعریف شده است
        function disableCopyPaste() {
            // تنظیم یک ویژگی اختصاصی به بدنه صفحه که در صورت چسباندن متن، عملیات پیشفرض مرورگر را متوقف می‌کند
            document.body.setAttribute("onpaste", "return true");
        }

        // فراخوانی تابع disableCopyPaste برای اجرای آن
        disableCopyPaste();

        // اگر متغیر block_copy_body تنظیم شده باشد (true)
        if (block_copy_body) {
            // تابع disableCopy برای جلوگیری از عملیات کپی کردن متن تعریف شده است
            function disableCopy() {
                // تنظیم یک ویژگی اختصاصی به بدنه صفحه که در صورت کپی کردن متن، عملیات پیشفرض مرورگر را متوقف می‌کند
                document.body.setAttribute("oncopy", "return true");
            }

            // فراخوانی تابع disableCopy برای اجرای آن
            disableCopy();
        }
    }
}


// Block Paste (Fix 2)

const input = document.querySelector('*');

// تعریف تابع blockDrag برای جلوگیری از عمل کپی کردن متن در یک ورودی
function blockDrag() {
    // اگر متغیر block_paste به true تنظیم شده باشد
    if (block_paste) {
        // اضافه کردن گوش دهنده رویداد (event listener) بر روی ورودی
        input.addEventListener('keydown', function(e) {
            // اگر کاربر کلید Ctrl و کلید V را فشار دهد (کپی کردن)
            if (e.keyCode === 86 && e.ctrlKey) {
                // پیشگیری از عمل کپی کردن متن
                e.preventDefault();
            }
        });
    }
}

// فراخوانی تابع blockDrag برای اجرای آن
blockDrag();



// Block full screnn
// اگر متغیر block_fullscreen به true تنظیم شده باشد
if (block_fullscreen) {
    // تعریف تابع disableFullScreen برای جلوگیری از ورود به حالت تمام صفحه
    function disableFullScreen() {
        // اضافه کردن گوش دهنده رویداد (event listener) بر روی پنجره
        window.addEventListener("keydown", function(event) {
            // اگر کاربر کلید F11 را فشار دهد (ورود به حالت تمام صفحه)
            if (event.keyCode === 122) {
                // پیشگیری از ورود به حالت تمام صفحه
                event.preventDefault();
                // دوباره اضافه کردن گوش دهنده رویداد برای اعمال مجدد این کارکرد بعد از بارگذاری صفحه
                window.addEventListener("DOMContentLoaded", disableFullScreen);
            }
        });
    }

    // فراخوانی تابع disableFullScreen برای اجرای آن
    disableFullScreen();
}


// Canvas V1.1
// یک سیستمی برای رمز نگاری تصاویر است که میتوانید تمامی تصاویر وبسایت را به canvas تبدیل کنید و بر روی آن اسم لایسنس بنویسید
// اگر متغیر canvas وجود داشته باشد (یعنی تصاویر به عنوان canvas معرفی شده‌اند)
if (canvas) {
    // تابع imgToCanvas برای تبدیل یک تصویر به یک گرافیک کانواس
    function imgToCanvas(img) {
        // ایجاد یک عنصر کانواس جدید
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        // دریافت context 2D برای کانواس
        var context = canvas.getContext("2d");
        // رسم تصویر در کانواس
        context.drawImage(img, 0, 0);

        // تنظیمات دیگر برای کانواس مانند پس‌زمینه، فونت، رنگ و متن
        context.fillStyle = canvas_fillstyle; // پس‌زمینه سفید
        context.font = "10px vazirmatn"; // فونت و اندازه فونت
        context.color = canvas_color; // رنگ متن
        context.textAlign = "left"; // راست چین کردن متن
        context.fillText(canvas_text, 10, 10); // متن آب‌علامت

        return canvas;
    }

    // تابع convertImgsToCanvas برای تبدیل تمام تصاویر به گرافیک‌های کانواس
    function convertImgsToCanvas() {
        var imgs = document.querySelectorAll("img");

        for (var i = 0; i < imgs.length; i++) {
            var canvas = imgToCanvas(imgs[i]);

            // جایگزینی تصویر با کانواس در DOM
            imgs[i].parentNode.replaceChild(canvas, imgs[i]);

            // انتقال کلاس‌ها از تصویر به کانواس
            var classString = imgs[i].className;
            canvas.className = classString;
        }
    }

    // تابع addLazyLoadToImgs برای اضافه کردن ویژگی lazy load به تصاویر کانواس
    function addLazyLoadToImgs() {
        if (canvas_lazy_load) {
            var imgs = document.querySelectorAll("canvas");

            for (var i = 0; i < imgs.length; i++) {
                imgs[i].setAttribute("load", "lazy");
            }
        }
    }

    // اجرای توابع برای تبدیل تصاویر به کانواس و اضافه کردن ویژگی lazy load
    convertImgsToCanvas();
    addLazyLoadToImgs();
}




/* Note 
این کد های بالا در واقع تمامی تگ های تصاویر را به کنواس تبدیل میکنند و شما باید در فایل استایل دهیتون که اگه سلکتور شما با img هست رو تغییر به canvas کنین
*/

// Notification With JS For Domain
// این کد در صورت قبول کردن کاربر انجام میشود
// اگر متغیر notification_domain وجود داشته باشد و آدرس فعلی صفحه در دامنه‌های مجاز برنامه نباشد
if (notification_domain && !allowedDomains.includes(currentDomain)) {
    // درخواست دسترسی به نمایش اعلان را از کاربر می‌گیریم
    Notification.requestPermission().then(function(permission) {
        console.log(permission); // نمایش دسترسی کاربر به نمایش اعلان در کنسول
    });

    // دریافت وضعیت فعلی دسترسی نمایش اعلان‌ها
    let permission = Notification.permission;

    // اگر دسترسی به نمایش اعلان‌ها تایید شده باشد، اعلان را نمایش می‌دهیم
    if (permission === "granted") {
        showNotification();
    }
    // اگر دسترسی به نمایش اعلان‌ها رد شده باشد، یک درخواست جدید برای دسترسی به نمایش اعلان از کاربر می‌کنیم
    else if (permission === "default") {
        requestAndShowPermission();
    }
    // اگر دسترسی به نمایش اعلان‌ها مسدود شده باشد، پیامی نمایش داده می‌شود
    else {
        alert("درخواست اعلان را به صورت عادی فعال کنید");
    }

    // تابع requestAndShowPermission برای درخواست دسترسی به نمایش اعلان‌ها از کاربر
    function requestAndShowPermission() {
        Notification.requestPermission(function(permission) {
            if (permission === "granted") {
                showNotification();
            }
        });
    }

    // تابع showNotification برای نمایش اعلان
    function showNotification() {
        let title = body_notification;
        let icon = image_src_notification; // این تصویر بزرگ است و ممکن است زمان بیشتری برای نمایش اعلان بگیرد. می‌توانید با یک آیکون کوچک جایگزین کنید.
        let body = body_notification;
        let notification = new Notification(title, { body, icon });

        // وقتی روی اعلان کلیک می‌شود، اعلان بسته شده و پنجره فعلی فوکوس می‌شود
        notification.onclick = () => {
            notification.close();
            window.parent.focus();
        }
    }

    // نمایش اعلان
    showNotification();
}
