define(function(){
	return {
		ajax : function(uri,callback){
			$.ajax({
				type : "get",
				url : uri,
				success : function(res){
					callback(res);
				}
			})
		}
		
		
	}
})
