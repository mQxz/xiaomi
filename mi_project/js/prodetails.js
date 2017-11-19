requirejs.config({
	paths : {
		"jquery" : "jquery-1.11.1.min",
		"pb" : "public"
	}
})

requirejs(["jquery","pb"],function($,pb){
	$("#top-common").load("publichtml.html #topbar");
	$("#header-common").load("publichtml.html #header");
	$("#proHeader-common").load("publichtml.html #J-proHeader");
	$("#bottom-common").load("publichtml.html #bottom");
	$("#footer-common").load("publichtml.html #footer");
	
	
	
	
	
})