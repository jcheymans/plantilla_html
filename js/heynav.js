/* heynav */

(function($){
	
	$.fn.heynav = function(options) {
	    
	    // DEFAULT SETTINGS
        var settings = $.extend({
			breakpoint: 768,
			slide: true, // TRUE si va a ser slide
			showSpeed: 200, // Velocidad con la que se despliega el menu mobile
			menuBtn_selector: ".menu-btn", // Boton que despliega el menu mobile
			absolute: false  // RECORDATORIO: Si es TRUE, el div contenedor (header) debe tener un height fluido para que funcione como se supone
			
		}, options);
	    
		var w = $(window).width();
	    
	    this.each(function(){
	    	
	    	var nav = $(this);
	    	var ul = nav.children("ul"); // la UL madre (es solamente una siempre)
	    	var lis = ul.children("li"); // Todos los li de primer nivel
	    	var sub_uls = nav.find("li > ul"); // Todas las UL hijas
	    	
	    	if(settings.absolute == true) nav.addClass("heynav-absolute");
	    	
	    	// FUNCIONAMIENTO CLICK AL BOTON DE MENU
	    	var menuBtn = $(settings.menuBtn_selector);
			menuBtn.unbind("click").click(function(){
				toggle(nav);
			});
			
			showOrHideNav(nav, sub_uls);
			liLoop(lis);
			
			$(window).resize(function(){
				w = $(window).width();
				showOrHideNav(nav, sub_uls);
				liLoop(lis);
			});
			
	    });
	    
	    function showOrHideNav(nav, sub_uls){
	    	if(w > settings.breakpoint) nav.show(); sub_uls.hide();
	    }
	    
	    function liLoop(lis){
	    	// LOOP EN TODOS LOS LIs 
			lis.each(function(){ if($(this).find("ul").length > 0){ // Verifico que tengan hijos UL (esto sginifica que son desplegables)
				var ul = $(this).find("ul"); // UL hija
				var a = $(this).children("a"); // Link hija directa de este LI
				revisarBreakpoint(ul, a);
			}});
	    }
	    
	    function revisarBreakpoint(ul, a){ 
	    	
	    	// ul es una subnav, y la a es el link principal de ese q no debe tener click ahorita
	    	console.log("revisando breakpoint");
	    	
			a.unbind("click"); // Desactivo el click por si ya se habia asignado antes
			
			if(w > settings.breakpoint){ // Menu version desktop
				ul.css("display","");
				
			} else { // Menu version mobile
				a.click(function(e){
					e.preventDefault();
					toggle(ul);
				});
			}
		}
		
		function toggle(nav){
			if(nav.is(":visible")){
				if(settings.slide == true) nav.slideUp(settings.showSpeed);
				else nav.fadeOut(settings.showSpeed);
			} else {
				if(settings.slide == true) nav.slideDown(settings.showSpeed);
				else nav.fadeIn(settings.showSpeed);
			}
		}
	    
	};
	 
}(jQuery));