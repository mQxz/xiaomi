requirejs.config({
	paths : {
		"jquery" : "jquery-1.11.1.min",
		"pb" : "public"
	}
})

requirejs(["jquery","pb"],function($,pb){
	window.onload = function(){
		var str = "";
		for(var i = 0 ; i < 10 ; i++){
			str += getRand(0,9);
		}
		$(".miId").html( str );
	}
	function getRand(min,max){
		return Math.round( Math.random()*( max-min ) + min );
	}
	$(".btn_reg_1").click(function(){
		var data = JSON.parse( pb.getCookie("userlist") );
		var json = {
			"userphone" : data["userphone"],
			"userid" : $(".miId").html(),
			"userpwd" : data["userpwd"]
		}
		pb.setCookie("userlist" , json);
		location.href = "login.html";
	})

	
	
	
})