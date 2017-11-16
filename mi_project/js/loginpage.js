requirejs.config({
	paths : {
		"jquery" : "jquery-1.11.1.min",
		"pb" : "public"
	}
})

requirejs(["jquery","pb"],function($,pb){
	//登录选项卡
	$(".login-btn-1").click(function(){
		$(this).addClass("login-tan-active");
		$(".login-btn-2").removeClass("login-tan-active");
		$(".login-box-1").css("display","block");
		$(".login-box-2").css("display","none");
	});
	$(".login-btn-2").click(function(){
		$(this).addClass("login-tan-active");
		$(".login-btn-1").removeClass("login-tan-active");
		$(".login-box-1").css("display","none");
		$(".login-box-2").css("display","block");
	})
	
	
	
})
