// alert("به دلیل اینکه شما فایل را به صورت سیو شده مشاهده میکنید ، امکان لایسنس گذاری دامنه را غیر فعال کردم");
// console.log("به دلیل اینکه شما فایل را به صورت سیو شده مشاهده میکنید ، امکان لایسنس گذاری دامنه را غیر فعال کردم")

// Clear Alerts
function clearAlerts() {
    if (diasble_alerts) {
        $(".alert").each(function() {
            $(this).html("");
            $(this).prop("disabled", true);
        });
        window.alert = function() {};
    }
}

clearAlerts();

// Disable Console Log
function disableConsoleLog() {
    if (disable_consoles_log) {
        window.console.log = function() {};
    }
}

disableConsoleLog();

// Keydown Events
$(document).keydown(function(event) {
    if (event.ctrlKey && event.which === 83) {
        if (Save_page) {
            event.preventDefault();
        }
    }
    if (event.ctrlKey && event.key === 'p') {
        if (block_print) {
            event.preventDefault();
        }
    }
});

// IDM Blocker
$(document).ready(function() {
    if (window.navigator.userAgent.includes('IDM')) {
        if (idmblocker) {
            alert(idmblocker_message);
        }
    }
});

function idmBlocker() {
    if (idmblocker) {
        $('head').append('<meta http-equiv="Content-Security-Policy" content="default-src \'self\';">');
    }
}

idmBlocker();

// Context Menu Blocker
$(document).on('contextmenu', function(e) {
    if (block_rightclick) {
        e.preventDefault();
    }
});

// Block Inspect
function blockInspect() {
    if (block_inspect) {
        $(document).on('keydown', function(e) {
            if (e.key === 'F12' || (e.ctrlKey && e.key === 'I')) {
                e.preventDefault();
            }
        });
    }
}

blockInspect();

// Block View Source
function blockU() {
    if (block_view_source) {
        $(document).on("keydown", function(event) {
            if (event.ctrlKey && event.which === 85) {
                event.preventDefault();
            }
        });
    }
}

blockU();

// Block Copy
function blockCopy() {
    $(document).on("keydown", function(e) {
        if (block_Copy && (e.ctrlKey && e.which === 67)) {
            e.preventDefault();
        }
    });
}

blockCopy();

// Allowed Domains
const allowedDomains = Allowed_Domains;
const currentDomain = window.location.hostname;

if (add_license_project) {

if (!allowedDomains.includes(currentDomain)) {
    alert(domain_failed);
    window.location.replace(redirection_url);
    $('body').empty();
}

}

// Get and Check Password
function getPassword() {
    if (password_page_action) {
        var password = prompt(password_page_prompt);
        return password;
    }
}

function checkPassword(password) {
    if (password_page_action) {
        var correctPassword = password_page;
        if (password === correctPassword) {
        } else {
            window.location.replace(redirection_url);
            $('body').empty();
        }
    }
}

var password = getPassword();
checkPassword(password);

// Block Drag
$(document).ready(function() {
    if (block_drag) {
        $('*').on('dragstart', function(event) {
            event.preventDefault();
        });
    }
});

// Block Iframe Copy
$(document).ready(function() {
    if (block_iframe_copy) {
        $('.proc-content').each(function() {
            var overlay = $('#overlay');
            overlay.css({
                'position': 'absolute',
                'top': '0',
                'left': '0',
                'width': '100%',
                'height': '100%',
                'z-index': '1',
                'cursor': 'not-allowed'
            });
        });
    }
});

// Block Audio Rightclick
$(document).ready(function() {
    $('audio').on('contextmenu', function(event) {
        if (block_rightclick_audio) {
            event.preventDefault();
        }
    });
});

// Block Refresh
if (block_refresh) {
    function preventRefresh() {
        $(document).on("keydown", function(event) {
            if (event.which === 116 || (event.ctrlKey && event.which === 82) || (event.ctrlKey && event.shiftKey && event.which === 82) || (event.altKey && event.which === 82)) {
                event.preventDefault();
            }
        });
    }
    preventRefresh();
}

// Block Copy, Paste, Cut
if (block_cut_body) {
    function disableCopyCut() {
        $("body").on("cut", function(event) {
            return true;
        });
    }
    disableCopyCut();
    if (block_paste_body) {
        function disableCopyPaste() {
            $("body").on("paste", function(event) {
                return true;
            });
        }
        disableCopyPaste();
        if (block_copy_body) {
            function disableCopy() {
                $("body").on("copy", function(event) {
                    return true;
                });
            }
            disableCopy();
        }
    }
}

// Block Drag
const input = $('*');

function blockDrag() {
    if (block_paste) {
        input.on('keydown', function(e) {
            if (e.which === 86 && e.ctrlKey) {
                e.preventDefault();
            }
        });
    }
}
blockDrag();

// Block Fullscreen
if (block_fullscreen) {
    function disableFullScreen() {
        $(window).on("keydown", function(event) {
            if (event.which === 122) {
                event.preventDefault();
                $(window).on("DOMContentLoaded", disableFullScreen);
            }
        });
    }
    disableFullScreen();
}

// Convert Images to Canvas
if (canvas) {
    function imgToCanvas(img) {
        var canvas = $("<canvas></canvas>");
        canvas.prop("width", img.width);
        canvas.prop("height", img.height);
        var context = canvas[0].getContext("2d");
        context.drawImage(img, 0, 0);
        context.fillStyle = canvas_fillstyle;
        context.font = "10px vazirmatn";
        context.fillStyle = canvas_color;
        context.textAlign = "left";
        context.fillText(canvas_text, 10, 10);
        return canvas[0];
    }

    function convertImgsToCanvas() {
        $("img").each(function() {
            var canvas = imgToCanvas(this);
            $(this).replaceWith(canvas);
            canvas.className = this.className;
        });
    }

    function addLazyLoadToImgs() {
        if (canvas_lazy_load) {
            $("canvas").attr("loading", "lazy");
        }
    }

    convertImgsToCanvas();
    addLazyLoadToImgs();
}

if (notification_domain && !allowedDomains.includes(currentDomain)) {
    Notification.requestPermission().then(function(result) {
        console.log(result);
        let permissionResult = Notification.permission;
        if (permissionResult === "granted") {
            showNotification();
        } else if (permissionResult === "default") {
            requestAndShowPermission();
        } else {
            alert("درخواست اعلان را به صورت عادی فعال کنید");
        }
    });

    function requestAndShowPermission() {
        Notification.requestPermission(function(result) {
            if (result === "granted") {
                showNotification();
            }
        });
    }

    function showNotification() {
        let title = body_notification;
        let icon = image_src_notification;
        let body = body_notification;
        let notification = new Notification(title, { body, icon });
        notification.onclick = () => {
            notification.close();
            window.parent.focus();
        }
    }
    showNotification();
}

