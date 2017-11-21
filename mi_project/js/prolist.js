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
	
	//页面列表数据请求  分页
	var index = 1;//页码
	showData();
	function showData(){
		pb.ajax("http://127.0.0.1/xiaomi/mi_project/json/prolist.json?aa="+Math.random(),function(arr){
			var str = "";
			for(var i = (index-1)*16 ; i < index*16 ; i++){
				if( i < arr.length ){
					var product = arr[i];
					str += `<div class="goods-item">
								<div class="figure figure-img">
									<a href="javascript:;">
										<img src="img/index/headernav/${product.src}"/>
									</a>
								</div>
								<p class="desc">${product.desc}</p>
								<h2 class="title">
									<a href="javascript:;">${product.name}</a>
								</h2>
								<p class="price">${product.price}元</p>
								<div class="thumbs">
									<ul class="thumb-list clearfix">
										<li>
											<img src="img/index/headernav/${product.src}"/>
										</li>
										<li>
											<img src="img/index/headernav/${product.src}"/>
										</li>
									</ul>
								</div>
								<div class="actions clearfix">
									<a href="javascript:;" class="btn-like">
										<i class="iconfont icon-yijiuhuanxin"></i>
										<span>喜欢</span>
									</a>
									<a href="javascript:;" class="btn-buy">
										<span>查看详情</span>
										<i class="iconfont icon-gouwuchekong"></i>
									</a>
								</div>
							</div>`;
				}
			}
//			console.log(arr);
			
			$(".goods-list").html( str );
			
			//获取总页数
			total = Math.ceil( arr.length / 16 );
			var pagestr = "";
			for( var j = 1; j <= total ; j++ ){
				pagestr += `<a class="pages numbers" href="javascript:;">${j}</a>`;
			}
			$(".pagenum").html( pagestr );
			$(".pagenum").children().eq(index-1).addClass("active");
		})
	}
	$(".xm-pagenavi").on("click",".pages",function(){
		index = $(this).html();
		showData();
	})
	$("#left").click(function(){
		if( index == 1 ){
			index = 1;
		}else{
			index--;
		}
		showData();
	})
	$("#right").click(function(){
		if( index == total ){
			index = total;
		}else{
			index++;
		}
		showData();
	})
	
	
	
	
	//类别选择打开和收缩
	$(".J_filterToggle").click(function(){
		if( $(this).parent().is(".filter-list-wrap-selected") ){
			$(this).parent().removeClass("filter-list-wrap-selected");
			$(this).parent().animate({"height":45},500);
		}else{
			$(this).parent().animate({"height":$(this).siblings().height()},500);
			$(this).parent().addClass("filter-list-wrap-selected");
		}
	})
	
	//收藏和购买的显示隐藏
	$(".goods-list-box").on("mouseenter",".goods-item",function(){
		$(this).find(".actions>a").stop().animate({"opacity":1},500);
	}).on("mouseleave",".goods-item",function(){
		$(this).find(".actions>a").stop().animate({"opacity":0},500);
	}).on("mouseover",".btn-like",function(){
		$(this).find("i").css("color","#d00");
	}).on("mouseout",".btn-like",function(){
		$(this).find("i").css("color","#333");
	}).on("mouseover",".btn-buy",function(){
		$(this).find("i").css("color","#FF6700");
	}).on("mouseout",".btn-buy",function(){
		$(this).find("i").css("color","#333");
	})
	
	
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
	
	
})