requirejs.config({
	paths : {
		"jquery" : "jquery-1.11.1.min",
		"pb" : "public"
	}
})

requirejs(["jquery","pb"],function($,pb){
	var hrefstr = location.href;
	$("#top-common").load("publichtml.html #topbar",function(){
		//用户名显示
		var str = hrefstr.split("?")[1].split("&")[0].split("=")[0];
		var userid = hrefstr.split("?")[1].split("&")[0].split("=")[1];
		if( str == "userId" ){
			$(".name").html( userid );
			$(".login-res").css("display","none");
			$(".link-order").css("display","inline-block");
			$(".user").css("display","inline-block");
		}
		//右上角购物车跳转地址
		$(".cart-mini").attr("href","procart.html?userId="+userid);
		$(".user").mouseenter(function(){
			$(this).find(".sep").css("display","none").end().find(".user-menu").css("display","block");
		}).mouseleave(function(){
			$(this).find(".sep").css("display","inline").end().find(".user-menu").css("display","none");
		})
		
		
		//购物车数量显示
		if( pb.getCookie( "cartlist" ) ){
			var procart = JSON.parse( pb.getCookie( "cartlist" ) );
			$(".cart-mini-num").html( `( ${procart.length} )` );
		}
	});
	$("#header-common").load("publichtml.html #header",function(){
		//headernav 子元素隐藏显示
	    $(".header-nav>li").mouseover(function(){
	    	$(this).find(".item-children").css("display","block");
	    }).mouseout(function(){
	    	$(this).find(".item-children").css("display","none");
	    })
	    
	    //logo跳转地址
		$(".logo").click(function(){
			var userid = hrefstr.split("?")[1].split("&")[0].split("=")[1];
			location.href = "index.html?userId="+userid;
		})
		
	});
	$("#proHeader-common").load("publichtml.html #J-proHeader");
	$("#bottom-common").load("publichtml.html #bottom");
	$("#footer-common").load("publichtml.html #footer");
	
	
	
	//图片轮播
	var imgIndex = 0;
	var viewTimer = setInterval(viewPlay , 5000);
	function viewPlay(){
		imgIndex++;
		if(imgIndex == 3){
			imgIndex = 0;
		}
		$(".slider").css("opacity",0);
		$(".slider").eq(imgIndex).animate({"opacity":1},1000);
		$(".bigimg").eq( imgIndex ).animate({"opacity":1},1000).siblings().animate({"opacity":0},1000);
		$(".maskimg").eq( imgIndex ).animate({"opacity":1},1000).siblings().animate({"opacity":0},1000);
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
	$(".pro-choose .step-list").on("click","li:not(#color-btn)",function(){
		$(this).addClass("active").siblings().removeClass("active");
		if( $(".list-choose-small li").attr("class") ){
			var totalP = parseFloat($(this).data("price"))  + 249;
		}else{
			var totalP = parseFloat($(this).data("price"));
		}
		var str = `<li> ${$(this).data("name")}   ${$(this).data("value")} ${$(this).data("color")}  <span>${$(this).data("price")}元</span> </li>        
					<li class="totlePrice" data-price="${parseFloat($(this).data("price"))}">  总计  ：${totalP}元</li>`;
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
	
	
	
	
	//页面数据加载
	var proid = hrefstr.split("?")[1].split("&")[1].split("=")[1];
	pb.ajax("http://127.0.0.1/xiaomi/mi_project/json/prodetails.json?aa="+Math.random(),function(res){
		for(var i = 0 ; i < res.length ; i++){
			var proinfo = res[i];
			if( proinfo.id == proid ){
				//图片加载
				var simgstr = `<img class="slider done" src="img/prodetails/${proinfo.src.split("+")[0]}" style="z-index: 1;">
								<img class="slider done" src="img/prodetails/${proinfo.src.split("+")[1]}" >
								<img class="slider done" src="img/prodetails/${proinfo.src.split("+")[2]}" >`;
				$("#J_sliderView").prepend( simgstr );
				var mimgstr = `<img class="maskimg done" src="img/prodetails/${proinfo.src.split("+")[0]}" style="z-index: 1;">
								<img class="maskimg done" src="img/prodetails/${proinfo.src.split("+")[1]}" >
								<img class="maskimg done" src="img/prodetails/${proinfo.src.split("+")[2]}" >`
				$(".mask").prepend( mimgstr );
				var bimgstr = `<img class="bigimg" src="img/prodetails/${proinfo.bigsrc.split("+")[0]}" alt="" style="z-index: 1;"/>
								<img class="bigimg"src="img/prodetails/${proinfo.bigsrc.split("+")[1]}" alt="" />
								<img class="bigimg"src="img/prodetails/${proinfo.bigsrc.split("+")[2]}" alt=""/>`;
				$(".big").prepend( bimgstr );
				//信息加载
				$("#pro-title").html( proinfo.name );
				$("#J_desc").html( proinfo.desc );
				$("#pro-price").html( proinfo.price + "元" );
				var protype = proinfo.type.split("/");
				var typestr = "";
				var liststr = "";
				for( var j = 0 ; j < protype.length ; j++ ){
					typestr += `<li class="btn btn-biglarge" data-color="${proinfo.color}" data-name="${proinfo.name}" data-price="${protype[j].split("*")[1]}" data-index="${j}" data-value="${protype[j].split("*")[0]}"> 
			        				<a href="javascript:void(0);"> 
			        					<span class="name">${protype[j].split("*")[0]} </span>  
			        					<span class="price"> ${protype[j].split("*")[1]} </span>  
			        				</a> 
			        			</li>`;
				}
//				var infospan = `<span id="infospan" style="display:none" data-name="${proinfo.name}+ ${}"><span>`
				$("#pro-type").html( typestr );
				$("#pro-color").append( proinfo.color );
				liststr = `<li>${proinfo.name} ${protype[0].split("*")[0]}   ${proinfo.color} <span>  ${proinfo.price}元</span> </li>        
				        	<li class="totlePrice" data-price="${proinfo.price}" >  总计  ：${proinfo.price}元  </li>`
				$("#J_proList>ul").html( liststr );
			}
		}
	})
	
	
	//加入购物车
	$("#J_buyBtnBox>li").click(function(){
		if( !$(".step-one").children().is(".active") ){
			alert( "请选择版本" );
			return;
		}
		var cartArr = [];
		if( pb.getCookie( "cartlist" ) ){
			cartArr = JSON.parse( pb.getCookie( "cartlist" ) );
			console.log( cartArr.length )
		}
		var data = {
			"name" : $("#pro-title").html( ),
			"src" : $("#J_sliderView").children().eq(0).attr("src"),
			"price" : $(".step-one>.active").data("price"),
			"count" : 1
		}
		cartArr.push( data );
		pb.setCookie( "cartlist", cartArr );
		
		
		
		
		//购物车数量显示
		pb.getCookie( "cartlist" )
		var procart = JSON.parse( pb.getCookie( "cartlist" ) );
		$(".cart-mini-num").html( `( ${procart.length} )` );
		alert("已加入购物车\n您可以点击右上角购物产看购物车--或者点击logo会回到首页继续浏览");
		
	})
	
	
	
	
	
	
})