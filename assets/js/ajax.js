// برسی صحت و اعتبار ایمیل
function validateEmailId(input) {
    var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailFormat.test(input)) {
        return true;
    } else {
        return false;
    }
}

// برای محدود کردن نوع کلمات در قسمت نام  و نام خانوادگی 
function pregMatch(input) {
    var regExp = /^[a-zA-Z-ا-ی ]*$/;


    if (regExp.test(input)) {
        return true;
    } else {
        return false
    }
}

// زمانی که کاربر روی دکمه ثبت نام زد ، این تابع اجرا می شود

function ajaxRegistration() {
    $(".error").text("");
    $('#first-name-info').removeClass("error");
    $('#last-name-info').removeClass("error");
    $('#register-email-info').removeClass("error");
    $('#contact-no-info').removeClass("error");
    $('#register-passwd-info').removeClass("error");
    $('#confirm-passwd-info').removeClass("error");

	// تبدیل فیلد ها به متغیر برای ارسال با ajax
    var firstName = $('#first-name').val();
    var lastName = $('#last-name').val();
    var emailId = $('#register-email-id').val();
    var contactNumber = $('#contact-number').val();
    var password = $('#register-password').val();
    var confirmPassword = $('#confirm-password').val();
    var actionString = 'registration';

	// جهت محدود کردن خالی گذاشتن محتوای فیلد ها
    if (firstName == "") {
        $('#first-name-info').addClass("error");
        $(".error").text("ضروری");
    } else if (!pregMatch(firstName)) {
        $('#first-name-info').addClass("error");
        $(".error").text('لطفا فاصله بین کلمات نگذارید');
    } else if (lastName == "") {
        $('#last-name-info').addClass("error");
        $(".error").text("ضروری");

    } else if (!pregMatch(lastName)) {
        $('#last-name-info').addClass("error");
        $(".error").text('لطفا فاصله بین کلمات نگذارید');
    } else if (emailId == "") {
        $('#register-email-info').addClass("error");
        $(".error").text("ضروری");
    } else if (!validateEmailId(emailId)) {
        $('#register-email-info').addClass("error");
        $(".error").text("بی اعتبار");
    } else if (contactNumber == "") {
        $('#contact-no-info').addClass("error");
        $(".error").text("ضروری");
    } else if (isNaN(contactNumber) || (contactNumber.indexOf(" ") != -1) || contactNumber.length > 10) {
        $('#contact-no-info').addClass("error");
        $(".error").text("بی اعتبار");
    } else if (password == "") {
        $('#register-passwd-info').addClass("error");
        $(".error").text("ضروری");
    } else if (confirmPassword == "") {
        $('#confirm-passwd-info').addClass("error");
        $(".error").text("ضروری");
    } else if (password != confirmPassword) {
        $('#confirm-passwd-info').addClass("error");
        $(".error").text("رمز عبور تأیید شما مطابقت ندارد.");
    } else {
        $('#loaderId').show();
		// با جی کوئری اطلاعات به فرم ثبت نام ارسال میشود
        $.ajax({
            url: 'assets/php/register.php',
            type: 'POST',
            data: {
				// متغیر ها در واقع اطلاعات فیلد ها هستند
                firstName: firstName,
                lastName: lastName,
                emailId: emailId,
                contactNumber: contactNumber,
                password: password,
                confirmPassword: confirmPassword,
                action: actionString
            },
			// دیتا تایپ را جیسان قرار میدهیم تا یک ارتباط بین فایل php و خود صفحه اصلی ایجاد شود
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    alert("شما با موفقیت ثبت نام کردید !");
					// وارد میشود به صفحه لاگین
                    window.location.replace("login.html")
                } else {
                    alert(response.message);
                }
            },
            error: function(xhr, status, error) {
				// این برای ارور هایی است که از سمت سرور و فایل php ایجاد میشود
                alert(xhr.responseText);
            }
        });

    } // endif
}

// تابع برای دکمه لاگین
// ساختار این قسمت ، با ساختار ثبت نام مشابه است
function ajaxLogin() {
    $(".error").text("");
    $('#email-info').removeClass("error");
    $('#password-info').removeClass("error");

    var emailId = $('#login-email-id').val();
    var password = $('#login-password').val();

    if (emailId == "") {
        $('#email-info').addClass("error");
        $(".error").text("ضروری");
    } else if (!validateEmailId(emailId)) {
        $('#email-info').addClass("error");
        $('.error').text("بی اعتبار");
    } else if (password == "") {
        $('#password-info').addClass("error");
        $(".error").text("ضروری");
    } else {
        $('#loaderId').show();
        $.ajax({
            url: 'assets/php/login.php',
            type: 'POST',
            data: {
                emailId: emailId,
                password: password
            },
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    alert("شما با موفقیت ثبت نام کردید !");
					// به صفحه داشبورد منتقل میشود و اطلاعات به صورت section بر قرار میشود
                    window.location.replace("panel/dashboard.php")
                } else {
                    alert(response.message);
                }
            },
            error: function(xhr, status, error) {
                alert(xhr.responseText);
            }
        });
    }
}

// این فقط برای تست است
function red() {
    alert("test two function in onclick");
}

// تابع برای فراموشی رمز
function forgotPassword() {
    $(".error").text("");
    $('#email-info').removeClass("error");

    var emailId = $('#forgot-email-id').val();

    if (emailId == "") {
        $('#email-info').addClass("error");
        $(".error").text("ضروری");
    } else if (!validateEmailId(emailId)) {
        $('#email-info').addClass("error");
        $('.error').text("بی اعتبار");
    } else {
        // show loader
        $('#loaderId').show();
        $.ajax({
            url: 'assets/php/forgot_password.php',
            type: 'POST',
            data: { emailId: emailId },
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    alert("لینک بازیابی رمز عبور به ایمیل شما ارسال شد.");
                } else {
                    alert(response.message);
                }
            },
            error: function(xhr, status, error) {
				// توجه کنید که در لوکال هاست اجرا نمیشود و نیاز به یک سرور است تا به کمک php mailer یا smpt ارسال شود
                alert("خطا: " + xhr.responseText);
            }
        });
    }
}