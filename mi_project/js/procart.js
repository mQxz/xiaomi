requirejs.config({
	paths : {
		"jquery" : "jquery-1.11.1.min",
		"pb" : "public"
	}
})

requirejs(["jquery","pb"],function($,pb){
    //用户名显示
	var hrefstr = location.href;
	console.log(hrefstr)
	var userid = hrefstr.split("?")[1].split("&")[0].split("=")[1];
	$("#name").html( userid );
	$(".user").mouseenter(function(){
		$(this).find(".sep").css("display","none").end().find(".user-menu").css("display","block");
	}).mouseleave(function(){
		$(this).find(".sep").css("display","inline").end().find(".user-menu").css("display","none");
	})
	
	$(".cart-logo").click(function(){
		location.href = "index.html?userId="+userid;
	})
	
	//cookie数据显示到页面
	function showData(){
		if( pb.getCookie( "cartlist" ) ){
			var list = JSON.parse( pb.getCookie( "cartlist" ) );
			var str = "";
			for(var i = 0 ; i <  list.length ; i++){
				var product = list[i];
				str += `<div class="item-box">
							<div class="item-table J_cartGoods">
	                			<div class="item-row clearfix">
	                				<div class="col col-check">
	                					<i class="iconfont icon-checkbox J_itemCheckbox">√</i>
	                				</div>
	                				<div class="col col-img">
	                					<a href="javascript:;" target="_blank">
	                						<img alt="" src="${product.src}" width="80" height="80">
	                					</a>
	                				</div>
	                				<div class="col col-name">
	                					<div class="tags">   </div>  
	                					<h3 class="name">  
	                						<a href="javascript:;"> ${product.name} </a>  
	                					</h3>      
	                				</div>
	                				<div class="col col-price"> ${product.price}  </div>
	                				<div class="col col-num">
										<div class="change-goods-num clearfix J_changeGoodsNum">
											<a href="javascript:void(0)" class="J_minus">
												<i class="iconfont">-</i>
											</a>
											<input tyep="text" name="2173500017_0_buy" value="1" data-num="1" data-buylimit="2" autocomplete="off" class="goods-num J_goodsNum"> 
											<a href="javascript:void(0) " class="J_plus ">
												<i class="iconfont ">+</i>
											</a>   
										</div>  
	                				</div>
	                				<div class="col col-total"> ${product.price}  <p class="pre-info">  </p> </div>
	                				<div class="col col-action"> 
	                					<a id="2173500017_0_buy" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods">
	                						<i class="iconfont">X</i>
	                					</a> 
	                				</div>
	                			</div>
	                		</div>
	                	</div>`
			}
			$(".list-body").html( str );
			$("#J_cartTotalNum").html( list.length );
		}
	}
	showData();
	
	
	//选择框
	$(".list-body").on("click",".icon-checkbox",function(){
		$(this).toggleClass("icon-checkbox-selected");
		$("#J_selTotalNum").html( $(".list-body .icon-checkbox-selected").length );
		for( var i = 0 ; i < $(".list-body .icon-checkbox").length ; i++ ){
			if( !$(".list-body .icon-checkbox").eq(i).is(".icon-checkbox-selected") ){
				$(".list-head .icon-checkbox").removeClass("icon-checkbox-selected");
			}
		}
		showMoney();
	})
	//全选
	$(".list-head .icon-checkbox").click(function(){
		$(this).toggleClass("icon-checkbox-selected");
		if( $(this).is(".icon-checkbox-selected") ){
			$(".list-body .icon-checkbox").addClass("icon-checkbox-selected");
		}else{
			$(".list-body .icon-checkbox").removeClass("icon-checkbox-selected");
		}
		$("#J_selTotalNum").html( $(".list-body .icon-checkbox-selected").length );
		showMoney();
	})
	//合计显示
	showMoney();
	function showMoney(){
		var totalMon = 0;
		$(".list-body .icon-checkbox-selected").each(function(index){
			totalMon += parseInt($(this).parent().parent().parent().find(".col-total").html());
		})
		$("#J_cartTotalPrice").html( totalMon );
	}
	//小计
	function stotalMon(obj){
		var stotalMon = obj.parent().parent().parent().find(".col-price").html()*obj.parent().find("input").val();
		obj.parent().parent().parent().find(".col-total").html( stotalMon );
	}
	
	//数量加减
	$("#J_cartListBody").on("click",".J_minus",function(){
		var $num = parseInt($(this).parent().find("input").val()); 
		if($num <= 1){
			$(this).parent().find("input").val(1);
		}else{
			$num--;
			$(this).parent().find("input").val( $num );
		}
		stotalMon($(this));
		if( $(this).parent().parent().parent().find(".icon-checkbox").is(".icon-checkbox-selected")){
			showMoney()
		}
	})
	$("#J_cartListBody").on("click",".J_plus",function(){
		var $num = parseInt($(this).parent().find("input").val()); 
		$num++;
		$(this).parent().find("input").val( $num );
		stotalMon($(this));
		if( $(this).parent().parent().parent().find(".icon-checkbox").is(".icon-checkbox-selected")){
			showMoney()
		}
	})
	
})
