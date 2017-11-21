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
	//登录验证
	$("#btn").click(function(){
		var username = $("#username").val();
		var password = $("#pwd").val();
		var data = JSON.parse(pb.getCookie("userlist"));
//		var loginHref = "http://127.0.0.1/xiaomi/mi_project/index.html?userId=123456789";
		if( (username == data["userphone"] || username == data["userid"]) && password == data["userpwd"]){
			$(location).attr("href","http://127.0.0.1/xiaomi/mi_project/index.html?userId="+data["userid"]);
		}else{
			$(".error-info").html( "用户名或密码错误" );
		}
	})
	
	
})
