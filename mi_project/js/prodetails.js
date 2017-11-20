requirejs.config({
	paths : {
		"jquery" : "jquery-1.11.1.min",
		"pb" : "public"
	}
})

requirejs(["jquery","pb"],function($,pb){
	$("#top-common").load("publichtml.html #topbar");
	$("#header-common").load("publichtml.html #header",function(){
		//headernav 子元素隐藏显示
	    $(".header-nav>li").mouseover(function(){
	    	$(this).find(".item-children").css("display","block");
	    }).mouseout(function(){
	    	$(this).find(".item-children").css("display","none");
	    })
	});
	$("#proHeader-common").load("publichtml.html #J-proHeader");
	$("#bottom-common").load("publichtml.html #bottom");
	$("#footer-common").load("publichtml.html #footer");
	
	//图片轮播
	var imgIndex = 0;
	var viewTimer = setInterval(viewPlay , 4000);
	function viewPlay(){
		imgIndex++;
		if(imgIndex == 3){
			imgIndex = 0;
		}
		$(".slider").css("opacity",0);
		$(".slider").eq(imgIndex).animate({"opacity":1},500);
		$(".bigimg").eq( imgIndex ).animate({"opacity":1},500).siblings().animate({"opacity":0},500);
		$(".maskimg").eq( imgIndex ).animate({"opacity":1},500).siblings().animate({"opacity":0},500);
		$(".ui-pager-item").eq(imgIndex).find("a").addClass("active").end().siblings().find("a").removeClass("active");
	}
	$(".ui-pager-item").click(function(){
		clearInterval(viewTimer);
		imgIndex = $(this).index()-1;
		viewPlay();
	})
	$(".ui-pager-item").mouseover(function(){
		clearInterval(viewTimer);
		$(this).find("a").addClass("active")
	}).mouseout(function(){
		viewTimer = setInterval(viewPlay , 4000);
		$(this).find("a").removeClass("active");
	})
	$(".ui-prev").click(function(){
		clearInterval(viewTimer);
		imgIndex--;
		if( imgIndex == -1 ){
			imgIndex = 2;
		}
		$(".slider").animate({"opacity":0},500);
		$(".slider").eq(imgIndex).animate({"opacity":1},500);
		$(".bigimg").eq( imgIndex ).animate({"opacity":1},500).siblings().animate({"opacity":0},500);
		$(".maskimg").eq( imgIndex ).animate({"opacity":1},500).siblings().animate({"opacity":0},500);
		$(".ui-pager-item").eq(imgIndex).find("a").addClass("active").end().siblings().find("a").removeClass("active");
	}).mouseover(function(){
		$(this).css("background-position","0");
	}).mouseout(function(){
		viewTimer = setInterval(viewPlay , 4000);
		$(this).css("background-position","-84px");
	})
	$(".ui-next").click(function(){
		clearInterval(viewTimer);
		viewPlay();
	}).mouseover(function(){
		$(this).css("background-position","-43px");
	}).mouseout(function(){
		viewTimer = setInterval(viewPlay , 4000);
		$(this).css("background-position","-125px");
	})
	
	//滚动条事件
	$(window).scroll(function(){
		if($(document).scrollTop() > 180 &&  $(document).scrollTop() < 600){
			$(".ui-wrapper").addClass("fix");
		}else{
			$(".ui-wrapper").removeClass("fix");
		}
		if( $(document).scrollTop() > 180 ){
			$("#J_img").css({"margin-top":"440px"});
		}else{
			$("#J_img").css({"margin-top":"0"});
		}
	})
	
	
	//版本选择
	$(".pro-choose .step-list li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		if( $(".list-choose-small li").attr("class") ){
			var totalP = parseFloat($(this).data("price"))  + 249;
		}else{
			var totalP = parseFloat($(this).data("price"));
		}
		var str = `<li>小米MIX 2 全网通版 ${$(this).data("name").split("+")[0]}内存${$(this).data("name").split("+")[1]} 黑色陶瓷  <span>${$(this).data("price")}</span> </li>        
					<li class="totlePrice" data-price="${parseFloat($(this).data("price"))}">  总计  ：${totalP}元</li>`;
		if( $(this).index() == 3 ){
			str = `<li>小米MIX 2 全网通版 ${$(this).data("name").split("+")[0]} 黑色陶瓷  <span>${$(this).data("price")}</span> </li>        
					<li class="totlePrice" data-price="${parseFloat($(this).data("price"))}">  总计  ：${totalP}元</li>`;
		}
		$("#J_proList>ul").html( str );
	})
	var baoxianFlag = null;
	$(".list-choose-small li").click(function(){
		$(this).toggleClass("active");
		if($(this).attr("class")){
			$(".totlePrice").html( "总计 ：" + (Number($(this).data("price")) + Number($(".totlePrice").data("price"))) + "元" );
		}else{
			$(".totlePrice").html( "总计 ：" + $(".totlePrice").data("price") + "元" );
		}
	})
	
	//放大镜
	$("#J_sliderView").mouseover(function(){
		clearInterval(viewTimer);
		$(".mask").show();
		$(".cenmask").show();
		$(".big").show();
	}).mouseout(function(){
		viewTimer = setInterval(viewPlay , 4000);
		$(".mask").hide();
		$(".cenmask").hide();
		$(".big").hide();
	}).mousemove(function(evt){
		var e = evt || event;
		var x = e.pageX - $("#J_sliderView").offset().left - $(".mask").outerWidth()/2;
		var y = e.pageY - $("#J_sliderView").offset().top - $(".mask").outerHeight()/2;
		var maxL = $("#J_sliderView").outerWidth() - $(".mask").outerWidth();
		var maxT = $("#J_sliderView").outerHeight() - $(".mask").outerHeight();
		
		x = Math.min( maxL , Math.max(0,x) );
		y = Math.min( maxT , Math.max(0,y) );
		$(".mask").css({"left" : x ,"top" : y });
		$(".maskimg").css({"left" : -x ,"top" : -y });
		var bigImgX = x*$(".bigimg").width()/$("#J_sliderView").width();
		var bigImgY = y*$(".bigimg").height()/$("#J_sliderView").height();
		$(".bigimg").css({
			"left" : -bigImgX,
			"top" : -bigImgY
		})
		
	})
	
	
	pb.ajax("http://127.0.0.1/xiaomi/mi_project/json/prodetails.json?hh="+Math.random(),function(res){
		for(var i = 0 ; i<res.length ; i++){
			if( res[i].id == fshop100 ){
				console.log(res[i]);
			}
		}
	})
	
	
})