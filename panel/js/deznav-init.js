"use strict"

// برای تنظیمات بسته و باز شدن ساید بار
var dezSettingsOptions = {};


(function($) {

//  اینجا برای نحوه استایل دهی و ویژگی پنل سایدبار ، اومدم مقادیری دادم

	
	"use strict"
	
	dezSettingsOptions = {
			typography: "vazirmatn",
			version: "light",
			layout: "vertical",
			primary: "color_1",
			headerBg: "color_1",
			navheaderBg: "color_1",
			sidebarBg: "color_1",
			sidebarStyle: "full",
			sidebarPosition: "fixed",
			headerPosition: "fixed",
			containerLayout: "full",
		};

	
	
	
	new dezSettings(dezSettingsOptions); 

	jQuery(window).on('resize',function(){
        dezSettingsOptions.containerLayout = $('#container_layout').val();
        
		new dezSettings(dezSettingsOptions); 
	});
	
})(jQuery);