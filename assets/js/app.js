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

alert("به دلیل اینکه شما فایل را به صورت سیو شده مشاهده میکنید ، امکان لایسنس گذاری دامنه را غیر فعال کردم");
console.log("به دلیل اینکه شما فایل را به صورت سیو شده مشاهده میکنید ، امکان لایسنس گذاری دامنه را غیر فعال کردم")

/* Note : 
برای اینکه فرد بتواند به راحتی از این کتابخانه استفاده کند و امکان سفارش سازی داشته باشد ، به صورت حلقه ایف قرار دادم که اگر متغیر مربوط به حلقه ، true باشد ، اون موقع اجرا شود
*/

// Diasble Alerts
function clearAlerts() {
    if (diasble_alerts) { // if set true = work | if set false = stop 
        var alerts = document.querySelectorAll(".alert");

        for (var i = 0; i < alerts.length; i++) {
            alerts[i].innerHTML = "";

            alerts[i].disabled = true;
        }

        window.alert = function() {};
    }
}

clearAlerts();

// disable console log
function disableConsoleLog() {
    if (disable_consoles_log) {
        console.log = function() {};
    }
}

disableConsoleLog();


// 1 ) Block Ctrl + s
function onKeyDown() {
    if (event.ctrlKey && event.keyCode === 83) {
        if (Save_page) {
            event.preventDefault();
        }
    }
}
document.addEventListener("keydown", onKeyDown);


// 2 ) ctrl + p block
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'p') {
        if (block_print) {
            e.preventDefault();
        }
    }
});


// 4 ) Block IDM Downloading

// البته این فقط برای پیشگیری استفاده میشود و به طور حتم ، نمی تواند مانع از دانلود محتوا با IDM شود

document.addEventListener('DOMContentLoaded', function() {
    if (window.navigator.userAgent.includes('IDM')) {
        if (idmblocker) {
            alert(idmblocker_message);
        }
    }
});

function idmBlocker() {
    if (idmblocker) {
        document.querySelector('head').innerHTML += `
      <meta http-equiv="Content-Security-Policy" content="default-src 'self';">
    `;
    }
}

idmBlocker()

// 4 ) block right click

document.addEventListener('contextmenu', function(e) {
    if (block_rightclick) {
        e.preventDefault();
    }
});

// 6 ) Block inspect element

function blockInspect() {
    if (block_inspect) {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12' || (e.ctrlKey && e.key === 'I')) {
                e.preventDefault();
            }
        });
    }
}

blockInspect()


// Block Ctrl U (View Source)

function blockU() {
    if (block_view_source) {
        document.addEventListener("keydown", function(event) {
            if (event.ctrlKey && event.keyCode === 85) {
                event.preventDefault();
            }
        });
    }
}

blockU()



// Block Ctrl C (copy)

function blockCopy() {
    document.addEventListener("keydown", (e) => {
        if (block_Copy && (e.ctrlKey && e.keyCode === 67)) {
            e.preventDefault();
        }
    });
}

blockCopy()

// Doamin V1
// در این روش اگر آدرس دامنه با آدرس تعریف شده متفاوت باشد ، آنگاه به صفحه مورد نظر فرستاده میشود

const allowedDomains = Allowed_Domains;

const currentDomain = window.location.hostname;

if (!allowedDomains.includes(currentDomain)) {
    alert(domain_failed);

    window.location.replace(redirection_url);

    document.body.innerHTML = "";
}

// Domain V2
// این برای رمز نگاری صفحات استفاده میشه

function getPassword() {
    if (password_page_action) {
        var password = prompt(password_page_prompt);

        return password;
    }
}

function checkPassword(password) {
    if (password_page_action) {
        var correctPassword = password_page;

        if (password === correctPassword) {} else {
            window.location.replace(redirection_url);
            document.body.innerHTML = "";
        }
    }
}

var password = getPassword();
checkPassword(password);




// Block Drag Page

document.querySelectorAll('*').forEach(function(img) {
    if (block_drag) {
        img.addEventListener('dragstart', preventDrag);
    }
});


function preventCopy(event) {
    if (block_drag) {
        event.preventDefault();
    }
}

function preventDownload(event) {
    if (block_drag) {
        event.preventDefault();
    }
}

function preventDrag(event) {
    if (block_drag) {
        event.preventDefault();
    }
}



// Iframe

document.querySelectorAll('.proc-content').forEach(function(iframe) {
    if (block_iframe_copy) {
        var iframe = document.querySelector('#overlay , iframe');
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%'
        iframe.style.height = '100%';
        iframe.style.zIndex = '1';
        iframe.style.cursor = 'not-allowed';
    }
});
// Note  : باید قبل از تگ iframe ، یک دیو با آی دی overlay بسازید تا سورس کار کند




// Block Audio Settings


document.querySelectorAll('audio').forEach(function(audio) {
    audio.addEventListener('contextmenu', function(event) {
        if (block_rightclick_audio) {
            event.preventDefault();
        }
    });
});

// ممکنه افراد با کلیک راست کردن بر روی قسمت های مختلف وبسایت ، بتوانند محتوای وبسایت را ببینند ، به خاطر همین قسمت صدا هم غیر فعال کردیم





// Block Refresh or F5
// البته زمانی که کاربر صفحه را رفرش میکند ، امکان دیدن سورس کد را دارد و باید این کد رو توی قسمت اول وبسایت قرار بدید

if (block_refresh) {
    function preventRefresh() {
        document.addEventListener("keydown", function(event) {
            if (event.keyCode === 116 || (event.ctrlKey && event.keyCode === 82) || (event.ctrlKey && event.shiftKey && event.keyCode === 82) || (event.altKey && event.keyCode === 82)) {
                event.preventDefault();
            }
        });
    }

    preventRefresh();
}



// Block Copy , paste , cut

if (block_cut_body) {
    function disableCopyCut() {
        document.body.setAttribute("oncut", "return true");
    }

    disableCopyCut();

    if (block_paste_body) {
        function disableCopyPaste() {
            document.body.setAttribute("onpaste", "return true");
        }

        disableCopyPaste();

        if (block_copy_body) {
            function disableCopy() {
                document.body.setAttribute("oncopy", "return true");
            }

            disableCopy();

        }
    }
}


// Block Paste (Fix 2)

const input = document.querySelector('*');

function blockDrag() {
    if (block_paste) {
        input.addEventListener('keydown', function(e) {
            if (e.keyCode === 86 && e.ctrlKey) {
                e.preventDefault();
            }
        });
    }
}

blockDrag();


// Block Iframe
if (block_fullscreen) {
    function disableFullScreen() {
        window.addEventListener("keydown", function(event) {
            if (event.keyCode === 122) {
                event.preventDefault();
                window.addEventListener("DOMContentLoaded", disableFullScreen);
            }
        });
    }

    disableFullScreen();
}

// Canvas V1.1
// یک سیستمی برای رمز نگاری تصاویر است که میتوانید تمامی تصاویر وبسایت را به canvas تبدیل کنید و بر روی آن اسم لایسنس بنویسید
if (canvas) {
    function imgToCanvas(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);

        context.fillStyle = canvas_fillstyle; // پس‌زمینه سفید
        context.font = "10px vazirmatn"; // فونت و اندازه فونت
        context.color = canvas_color; // رنگ متن
        context.textAlign = "left"; // راست چین کردن متن
        context.fillText(canvas_text, 10, 10); // متن آب‌علامت

        return canvas;
    }


    function convertImgsToCanvas() {
        var imgs = document.querySelectorAll("img");

        for (var i = 0; i < imgs.length; i++) {
            var canvas = imgToCanvas(imgs[i]);

            imgs[i].parentNode.replaceChild(canvas, imgs[i]);

            var classString = imgs[i].className;

            canvas.className = classString;

        }
    }

    function addLazyLoadToImgs() {
        if (canvas_lazy_load) {
            var imgs = document.querySelectorAll("canvas");

            for (var i = 0; i < imgs.length; i++) {
                imgs[i].setAttribute("load", "lazy");
            }
        }
    }


    convertImgsToCanvas();
    addLazyLoadToImgs();

}



/* Note 
این کد های بالا در واقع تمامی تگ های تصاویر را به کنواس تبدیل میکنند و شما باید در فایل استایل دهیتون که اگه سلکتور شما با img هست رو تغییر به canvas کنین
*/

// Notification With JS For Domain
// این کد در صورت قبول کردن کاربر انجام میشود
if (notification_domain && !allowedDomains.includes(currentDomain)) {
    Notification.requestPermission().then(function(permission) {

        console.log(permission);

    });

    let permission = Notification.permission;

    if (permission === "granted") {
        showNotification();
    } else if (permission === "default") {
        requestAndShowPermission();
    } else {
        alert("درخواست اعلان را به صورت عادی فعال کنید");
    }

    function requestAndShowPermission() {
        Notification.requestPermission(function(permission) {
            if (permission === "granted") {
                showNotification();
            }
        });
    }

    function showNotification() {
        let title = body_notification;
        let icon = image_src_notification; //this is a large image may take more time to show notifiction, replace with small size icon
        let body = body_notification;
        let notification = new Notification(title, { body, icon });

        notification.onclick = () => {
            notification.close();
            window.parent.focus();
        }
    }


    showNotification()

}