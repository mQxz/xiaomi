requirejs.config({
	paths : {
		"jquery" : "jquery-1.11.1.min",
		"pb" : "public"
	}
})

requirejs(["jquery","pb"],function($,pb){
	var flagPwd = null;
	$("#password").blur(function(){
		var reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/;
		var str = $(this).val();
		if(reg.test( str )){
			$(".dis_box").find("span").html( "" );
			flagPwd = true;
		}else if( str.length == 0 ){
			flagPwd = false;
			$(".dis_box").find("span").html( "请输入密码" );
		}else{
			flagPwd = false;
			$(".dis_box").find("span").html( "密码长度为8~16位，数字、字母、字符失少包含两种" );
		}
	})
	var flagQpwd = null;
	$("#qpwd").blur(function(){
		var str1 = $(this).val();
		var str2 = $("#password").val();
		if( str1 == str2 ){
			$(".dis_box").find("span").html( "" );
			flagQpwd = true;
		}else{
			$(".dis_box").find("span").html( "密码输入不一致" );
			flagQpwd = false;
		}
	})
	$("#password").keydown(function(){
		$(".dis_box").find("span").html( "" );
	})
	$("#qpwd").keydown(function(){
		$(".dis_box").find("span").html( "" );
	})
	
	$(".btn_reg_1").click(function(){
		if(flagPwd && flagQpwd){
			var data = JSON.parse( pb.getCookie("userlist") );
			var json = {
				"userphone" : data["userphone"],
				"userpwd" : $("#password").val()
			}
			pb.setCookie("userlist" , json);
			location.href = "register_3.html";
		}else{
			return;
		}
	})

	
	
	
})