// VARIABLES


// INIT
$(document).ready(function(){
	
	setLoading();
	
});	

function setHeyShare(){
	$(".hey-share2").heyshare();
	
	$(".hey-share").heyshare({
		theme: "color-squares",
		position: "top",
		size: "normal",
		hover: true,
		
		preload: true,
		
		// Si hover es true, estos no sirven de nada
		hideOthers: false,
		autoHide: true,
		autoHideDelay: 1000
	});
}

function setLoading(){
	var imgArray=[];
	preload(imgArray, function(){
		start();
	});
}

function start(){
	//hideLoading(50);
	//initWow();
}

function initWow(){
	new WOW().init();
}


// FUNCIONES

