requirejs.config({
	paths : {
		"jquery" : "jquery-1.11.1.min",
		"pb" : "public"
	}
})

requirejs(["jquery","pb"],function($,pb){
	$(".selection").click(function(){
		$(this).parent().siblings().css("display","block");
		$(this).focus();
	})
	
	$(".list>li").mouseenter(function(){
		$(this).css("background","#e0e0e0").siblings().css("background","#fff");
	})
	
	$(".list>li").click(function(){
		$(this).parent().parent().parent().parent().siblings().find(".selection").find("strong").html( $(this).find("b").html() );
		$(this).parent().parent().parent().parent().css("display","none");
	})
	
	//电话号码输入框判定
	var flag = null;
	$(".labelbox-phone").blur(function(){
		var str = $(this).val();
		var reg = /^1[0-9]{10}$/;
		if(str.length == 0){
			$(".dis_box").html("请输入手机号");
			flag = false;
		}else if( reg.test( str ) ){
			flag = true;
			$(".dis_box").html("");
		}else{
			$(".dis_box").html("手机号格式错误");
			flag = false;
		}
	})
	
	//输入内容过程中不出现提示
	$(".labelbox-phone").keydown(function(){
		$(".dis_box").html("");
	})
	//输入格式无错误，模拟存入cookie
	$(".btn_reg_1").click(function(){
		if( flag ){
			pb.setCookie("userlist",{"userphone": $(".labelbox-phone").val() });
			location.href = "register_2.html";
		}else{
			return;
		}
	})
	
	
	
	
})
	

