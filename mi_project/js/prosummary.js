requirejs.config({
	paths : {
		"jquery" : "jquery-1.11.1.min",
		"pb" : "public"
	}
})

requirejs(["jquery","pb"],function($,pb){
	$("#top-common").load("publichtml.html #topbar");
	$("#header-common").load("publichtml.html #header");
	$("#bottom-common").load("publichtml.html #bottom");
	$("#footer-common").load("publichtml.html #footer");
	
	
    //用户名显示
	var hrefstr = location.href;
	var str = hrefstr.split("?")[1].split("&")[0].split("=")[0];
	var userid = hrefstr.split("?")[1].split("&")[0].split("=")[1]
	if( str == "userId" ){
		$(".name").html( userid );
		$(".login-res").css("display","none");
		$(".link-order").css("display","inline-block");
		$(".user").css("display","inline-block");
	}
	$(".user").mouseenter(function(){
		$(this).find(".sep").css("display","none").end().find(".user-menu").css("display","block");
	}).mouseleave(function(){
		$(this).find(".sep").css("display","inline").end().find(".user-menu").css("display","none");
	})
	
	//headernav 子元素隐藏显示
    $(".header-nav>li").mouseover(function(){
    	$(this).find(".item-children").css("display","block");
    }).mouseout(function(){
    	$(this).find(".item-children").css("display","none");
    })
	
	
	
	
	
})
