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
	console.log(hrefstr)
	var str = hrefstr.split("?")[1].split("&")[0].split("=")[0];
	var userid = hrefstr.split("?")[1].split("&")[0].split("=")[1]
//	console.log(userid)
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
	
	//ui-wrapper图片转换
	var uiIndex = 0;
	var uiTimer = setInterval( uiPlay , 5000 );
	function uiPlay(){
		uiIndex++;
		if( uiIndex == 2 ){
			uiIndex = 0;
		}
		setTimeout(function(){
			$("#J_headerTitle").find(".phantom-item-3").find(".text").css({"background":"url(img/prosummary/index-header-title2-0"+ (uiIndex+1) +".png) no-repeat center","background-size":"100%"});
			if( uiIndex == 0 ){
				$("#J_headerTitle").css("color","#fff");
			}else{
				$("#J_headerTitle").css("color","#000");
			}
		},1000);
		$(".ui-viewport>li").eq(uiIndex).animate({"opacity":1},2000).siblings().animate({"opacity":0},2000);
	}
	$(".ui-pager>a").click(function(){
		$(this).css("background","rgb(176, 176, 176)").siblings().css("background","rgb(255, 255, 255)");
		uiIndex = $(this).index()-1;
		uiPlay();
	})
	$(".ui-pager>a").mouseover(function(){
		clearInterval(uiTimer);
		$(this).css("background","rgb(176, 176, 176)");
	}).mouseout(function(){
		uiTimer = setInterval( uiPlay , 5000 );
		$(this).css("background","rgb(255, 255, 255)");
	})
	
	//section-gallery 轮播
	var galleryIndex = 0;
	var galleryTimer = setInterval(galleryPlay,4000);
	function galleryPlay(){
		galleryIndex++;
		if( galleryIndex == 3 ){
			galleryIndex = 0;
		}
		$(".gallery-viewport-item").eq(galleryIndex).animate({"opacity":1},2000).siblings().animate({"opacity":0},2000);
		$(".ui-controls>li").eq(galleryIndex).css("background","rgb(85, 85, 85)").siblings().css("background","rgb(189, 189, 189)");
	}
	$(".ui-controls>li").click(function(){
		clearInterval(galleryTimer);
		$(this).css("background","rgb(85, 85, 85)").siblings().css("background","rgb(189, 189, 189)");
		galleryIndex = $(this).index()-1;
		galleryPlay();
	})
	
	//section-version  按钮点击
	$(".tab").click(function(){
		$(this).addClass("current").parent().parent().parent().find(".tab:not(.tab-"+ $(this).data("ver") +")").removeClass("current");
		$(".pic-"+ $(this).data("ver") ).animate({"opacity":1},500).siblings().animate({"opacity":0},500);
	})
	
	//立即购买吸顶
	var flag = true;
	$(window).scroll(function(){
		var sTop = $(document).scrollTop();
		if( flag && sTop > 200 ){
			flag = false;
			$("#J-proHeader").css({"position":"fixed","top":-60}).animate({"top":0},500);
		}
		if( sTop < 200 ){
			$("#J-proHeader").css({"position":"",});
			flag = true;
		}
	})
	
	window.onload = function(){
		$("body,html").animate({"scrollTop":140},1000);
	}
	
	
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
	
	
//	http://127.0.0.1/xiaomi/mi_project/prodetails.html?
	$(".nav-btn-buy").click(function(){
		var proid = hrefstr.split("?")[1].split("&")[1].split("=")[1];
//		console.log("http://127.0.0.1/xiaomi/mi_project/prodetails.html?userId="+userid+"&id="+proid)
		$(location).attr("href","http://127.0.0.1/xiaomi/mi_project/prodetails.html?userId="+userid+"&id="+proid);
	})
	
})
