requirejs.config({
	paths : {
		"jquery" : "jquery-1.11.1.min",
		"pb" : "public"
	}
})

requirejs(["jquery","pb"],function($,pb){
	//banner轮播
	var bannerTimer = null;
	var index = 0;
	bannerTimer = setInterval( autoPlay ,3000);
	function autoPlay(){
		index++;
		if(index == 7){
			index = 0;
		}
		$(".slideli").eq(index).fadeIn(1000).siblings().fadeOut(1000);
		$(".slidedot span").eq(index).addClass("active").siblings().removeClass("active");
	}
	$(".slidedot span").mouseover(function(){
		clearInterval(bannerTimer);
		$(this).addClass("active").siblings().removeClass("active");
		$(".slideli").eq($(this).index()).fadeIn(1000).siblings().fadeOut(1000);
		index = $(this).index();
	}).mouseout(function(){
		bannerTimer = setInterval( autoPlay ,3000);
	})
	
	$(".slideshow").mouseover(function(){
		clearInterval(bannerTimer);
	}).mouseout(function(){
		bannerTimer = setInterval( autoPlay ,3000);
	})
	
	$(".slidebtn").mouseover(function(){
		$(this).css({"background":"rgba(0,0,0,0.7)"}).find("i").css("color","#fff");
	}).mouseout(function(){
		$(this).css({"background":"rgba(0,0,0,0)"}).find("i").css("color","#ccc");
	})
	$(".slideleft").click(function(){
		clearInterval(bannerTimer);
		index--;
		if(index <= 0){
			index = 0;
		}
		$(".slidedot span").eq(index).addClass("active").siblings().removeClass("active");
		$(".slideli").eq(index).fadeIn(1000).siblings().fadeOut(1000);
	})
	$(".slideright").click(function(){
		clearInterval(bannerTimer);
		index++;
		if(index >= 7){
			index = 7;
		}
		$(".slidedot span").eq(index).addClass("active").siblings().removeClass("active");
		$(".slideli").eq(index).fadeIn(1000).siblings().fadeOut(1000);
	})
	
	
	//banner 列表ajax请求数据
	$(".tabctrl>li").mouseover(function(){
		pb.ajax( "http://127.0.0.1/xiaomi/mi_project/json/banner.json?hh="+Math.random(),function(json){
			var str = "<ul class='tab-children-ul'>";
			var ulNum = Math.ceil(json[$(this).data("type")].list.length/6);
	    	for( var i = 0 ; i < json[$(this).data("type")].list.length ; i++ ){
	    		var product = json[$(this).data("type")].list[i];
	    		str += "<li><a href='javascript:;'><img src='img/index/banner80/"+ product.src +"'/><span class='text'>"+ product.name +"</span></a></li>";
				if( (i+1)%6==0 ){
					str += "</ul><ul class='tab-children-ul'>";
				}
				if(i == json[$(this).data("type")].list.length -1){
					str += "</ul>";
				}
	    	}
	    	$(".tab-children").html( str );
	    }.bind(this))
		$(".tab-children").css("display","block");
	}).mouseout(function(){
		$(".tab-children").css("display","none");
	})
	
	//小米明星单品数据请求  运动
    pb.ajax( "http://127.0.0.1/xiaomi/mi_project/json/banner.json?hh="+Math.random(),function(json){
		var str = "";
    	for( var i = 0 ; i < json[$(".starpro-radio").data("type")].list.length ; i++ ){
    		var product = json[$(".starpro-radio").data("type")].list[i];
    		str += `<li class="starpro-radio-item1">
						<a href="javascript:;"><img src="img/index/starpro/${product.src}"/></a>
						<h3 class="radio-item-name"><a href="javascript:;">${product.name}</a></h3>
						<p class="radio-item-intro">${product.desc}</p>
						<p class="radio-item-price">${product.price}元起</p>
					</li>`;
    	}
    	$(".starpro-radio").html( str );
    })
    var starFlag = true;
    var starTimer = setInterval(starPlay,4000);
    function starPlay(){
    	if(starFlag){
    		$(".starpro-radio").animate({"margin-left":-1240},1000);
    		$(".stari1").css({"color":"#757575","cursor":"pointer"}).siblings().css({"color":"#cccccc","cursor":""});
    		starFlag = false;
    	}else{
    		$(".starpro-radio").animate({"margin-left":0},1000);
    		$(".stari1").css({"color":"#cccccc","cursor":""}).siblings().css({"color":"#757575","cursor":"pointer"});
    		starFlag = true;
    	}
    }
    
    $(".stari").click(function(){
    	starPlay();
    }).mouseenter(function(){
    	clearInterval(starTimer);
    }).mouseleave(function(){
    	starTimer = setInterval(starPlay,4000);
    })
    
    //楼层标题移动
    for(var i = 1 ; i <= 5 ;i++){
    	floorShow($(".floor"+ i +" .tab-more>li").eq(0));
    }
    $(".floor1 .tab-more>li").mouseenter(function(){
    	floorShow($(this));
    })
    $(".floor2 .tab-more>li").mouseenter(function(){
    	floorShow($(this));
    })
    $(".floor3 .tab-more>li").mouseenter(function(){
    	floorShow($(this));
    })
    $(".floor4 .tab-more>li").mouseenter(function(){
    	floorShow($(this));
    })
    $(".floor5 .tab-more>li").mouseenter(function(){
    	floorShow($(this));
    })
    
    
    function floorShow(obj){
    	obj.addClass("tab-active").siblings().removeClass("tab-active");
    	pb.ajax( "http://127.0.0.1/xiaomi/mi_project/json/floors.json?hh="+Math.random(),function(json){
			var str = "";
	    	for( var i = 0 ; i < json[obj.data("type")].list.length ; i++ ){
	    		var product = json[obj.data("type")].list[i];
				if(i == 7){
					str += `<li class="brick brick-s">
								<a class="brick-s-img" href="javascript:;">
									<img src="img/index/floorsele/${json[obj.data("type")].name}/${product.src}" alt="" />
								</a>
								<h3 class="floor-con-title"><a href="javascript:;">${product.name}</a></h3>
								<p class="price">${product.price}元</p>
							</li>`;
	    		}else{
					str += `<li class="brick">
								<a class="floor-con-img" href="javascript:;"><img src="img/index/floorsele/${json[obj.data("type")].name}/${product.src}" alt=""/></a>
								<h3 class="floor-con-title"><a href="javascript:;">${product.name}</a></h3>
								<p class="desc">${product.desc}</p>
								<p class="price">${product.price}元</p>
								<p class="rank">
									这已经是第三个了，比之前的都要好，质量还是不错的，建议购买
								</p>
							</li>`;
				}
			}
	    	str += `<li class="brick brick-s">
						<a class="brick-s-icon" href="javascript:;">
							<i class="iconfont icon-yijiuhuanxin"></i>
						</a>
						<a class="brick-s-more" href="javascript:;">浏览更多<small>热门</small></a>
					</li>`;
	    	obj.parent().parent().parent().find(".floor-con-2").html(str);
	   }.bind(this));
    }
    
    
    //headernav 子元素隐藏显示
    $(".header-nav>li").mouseover(function(){
    	$(this).find(".item-children").css("display","block");
    }).mouseout(function(){
    	$(this).find(".item-children").css("display","none");
    })
    
    
    
})
