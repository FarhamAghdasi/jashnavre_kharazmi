
(function($) {
	'use strict';
	
	jQuery(document).on('ready', function(){
	
		jQuery(window).on('load',function() {
		  setTimeout(function() {
				$('body').addClass('loaded');
			}, 500);
		});
			
		$('#main-menu').slicknav({
			label: '',
			duration: 1000,
			easingOpen: "easeOutBounce",
			prependTo:'#mobile_menu',
			closeOnClick: true,
			easingClose:"swing", 
			easingOpen:"swing", 
			openedSymbol: "&#9660;",
			closedSymbol: "&#9658;" 	
		});
		
		if ($(window).scrollTop() > 200) {
              $('.fixed-top').addClass('menu-bg');
          } else {
              $('.fixed-top').removeClass('menu-bg');
          }
			$(window).on('scroll', function(){
				if ( $(window).scrollTop() > 70 ) {
					$('.site-navigation, .header-white, .header').addClass('navbar-fixed');
				} else {
					$('.site-navigation, .header-white, .header').removeClass('navbar-fixed');
				}
			});		  	
			
	}); 	
		
	// برای  آیکون چشم در قسمت ثبت نام و لاگین است که میتوان محتوای آن را دید
$('#togglePassword').click(function(){
    var passwordField = $('#login-password , #register-password , #confirm-password');
    var passwordFieldType = passwordField.attr('type');
    if(passwordFieldType == 'password') {
        passwordField.attr('type', 'text');
    } else {
        passwordField.attr('type', 'password');
    }
});




			
})(jQuery);


  

