// این ساختار هم دقیقا مشابه فایل ajax قسمت اصلی بود ولی اینجا به این دلیل که صفحه داشبورد است ، ناچار شدم جداگانه بسازم
function ajaxLogout() {
		$.ajax({
			url: '../assets/php/logout.php',
			type: 'POST',
            dataType: 'json',
			success: function(response) {
				if (response.status === 'success') {
					alert("شما با موفقیت خارج شدید !");
					// اینجا هم دوباره به صفحه لاگین ریداکت میکنه
					window.location.replace("../login.html")
				} else {
					alert(response.message);
				}
			},
			error: function(xhr, status, error) {
				// اینجا هم ارور هارو نشون میده از طریق json که از فایل php صادر میشه
				alert(xhr.responseText);
			}
		});

        
    }