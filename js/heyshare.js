/* heyshare */

(function($){
	
	if (window.location.hash == '#close_window') window.close();
	
	$.fn.heyshare = function(options) {
	    
	    // DEFAULT SETTINGS
        var settings = $.extend({
        	theme: "color-squares",
            position: "right",
			size: "normal",
			hover: true,
			
			preload: true,
			
			// Si hover es true, estos no sirven de nada
			hideOthers: true,
			autoHide: true,
			autoHideDelay: 1400
			
        }, options);
	    
	    
    	// PRELOAD DE IMAGENES
    	if(settings.preload == true){
		    var imgArray = [];
		    if(settings.theme == "color-squares"){
		    	imgArray.push("heyshare_icons/cuad_color/facebook.png");
		    }
		    if(imgArray.length>0) preloadImgs(imgArray);
	    }
	    
	    
	    // REDES HABILITADAS PARA ESTE PLUGIN
	    var redes = ["facebook", "twitter", "pinterest", "google", "instagram"];
	    
	    // LOOP QUE RECORRE TODOS LOS ELEMENTOS QUE VAN A CONVERTIRSE 
	    this.each(function(){ 
	    	var elem = $(this);
	    	
	    	// Preparando HTML
	    	var container = $('<span class="hey-share-container closed"></span>');
	    	var sharebtn = $('<span class="hey-share-btn"></span>');
	    	var botones_container = $('<span class="hey-botones-container"></span>');
	    	var botones = $('<span class="hey-botones"></span>');
	    	
	    	var redes_count=0;
	    	redes.forEach(function(red){
	    		if(elem.is('[data-url-'+red+']') && elem.attr('data-url-'+red).length > 0){
		    		var url = elem.attr('data-url-'+red);
		    		agregarRed(red, url); redes_count++;
		    	}
	    	});
	    	
	    	// SETTINGS TAMAÑO
	    	if(settings.size && ( settings.size=="normal" || settings.size=="big" || settings.size=="small" )){ } else {
	    		settings.size = "normal"; // setear default
	    	}
	    	
	    	var medida; switch(settings.size){
	    		//case "normal": medida = 35; break;
	    		case "big": medida = 45; break;
	    		case "small": medida = 25; break;
	    		default: medida = 35; break;
	    	}
	    	
	    	botones_container.append(botones);
	    	var botones_width = medida * redes_count;
	    	botones.css("width",botones_width+"px");
	    	
	    	botones.find("a").css({
	    		"width": medida+"px", "height": medida+"px"
	    	});
	    	sharebtn.css({
	    		"width": medida+"px", "height": medida+"px"
	    	});
	    	
	    	// SETTINGS POSITION
	    	if(settings.position && ( settings.position=="top" || settings.position=="right" || settings.position=="bottom" || settings.position=="left" )){ } else {
	    		settings.position = "right"; // setear default
	    	}
	    	
	    	if(settings.position == "top" || settings.position == "left"){
		    	container.append(botones_container);
	    		container.append(sharebtn);
	    	} else {
		    	container.append(sharebtn);
		    	container.append(botones_container);
	    	}
	    	
	    	if(settings.position == "top" || settings.position == "bottom"){
	    		var botones_container_marg_left = - (botones_width / 2);
	    		botones_container.css("margin-left", botones_container_marg_left + "px");
	    	}
	    	
	    	// SETTINGS HOVER
	    	if(Modernizr.touch){ // es touch, desactivar hover
	    		settings.hover = false;
	    	}
	    	if(settings.hover == true){
	    		container.addClass("hey-hover");
	    	} else {
	    		container.addClass("hey-click");
	    		
    			sharebtn.click(function(){
    				
    				if(container.hasClass("opened")){
    					close(container);
    				} else {
    					// Cerrando los anteriores (si aplica)
    					if(settings.hideOthers == true) $(".hey-share-container.opened").each(function(){ close($(this)); });
	    				
	    				// Abro el que hay que abrir
		   				open(container);
		   				
		   				// Automaticamente se oculta con un delay (si aplica)
	    				if(settings.autoHide == true && !Modernizr.touch){
		   					container.on("mouseleave", function(){
				    			autoclose(container, settings.autoHideDelay);
				    		});
			    		}
    				}
    				
	    		});
	    	}
	    	
	    	// FUNCIONAMIENTO DIALOG
	    	
	    	botones.find(".hey-bot").click(function(e){
	    		e.preventDefault();
	    		var url = $(this).attr("href");
	    		window.open(url,'','width=600,height=400');
	    	});
	    	
	    	
	    	// AGREGO EL HTML
	    	container.addClass(settings.size);
	    	container.addClass(settings.position);
	    	container.addClass(settings.theme);
	    	
	    	elem.replaceWith(container);
	    	
	    	
	    	// CONFIGURACION ADICIONAL DE FACEBOOK (con Facebook API)
	    	if(typeof FB != "undefined"){
	            
		    	container.find(".facebook").unbind("click").on('click', function(e){
	            	e.preventDefault();
	            	
	            	var url = $(this).attr("href");
	            	var caption = elem.data("caption");
	            	var picture = elem.data("picture");
	            	var name = elem.data("title");
	            	var description = elem.data("description");
	            	
					FB.ui({
						method: 'feed',
						link: url,
						caption: caption, 
						picture: picture,
						name: name,
						description: description
						
					}, function(response){
						// callback
					});
	            });
	    	}
	    	
	    	// FUNCIONES VARIAS
	    	function autoclose(_container, delay){
	    		if(!delay || delay<0) var delay = 1400;
	    		setTimeout(function(){
    				close(_container);
    			}, delay);
	    	}
	    	function open(_container){
	    		_container.removeClass("closed").addClass("opened");
	    		_container.find(".hey-botones-container").css("display","inline-block");
	    	}
	    	function close(_container){
	    		_container.removeClass("opened").addClass("closed");
	    		_container.find(".hey-botones-container").css("display","none");
	    	}
	    	
	    	function agregarRed(nombre_red, url){
	    		var link = '<a class="hey-bot '+nombre_red+'" href="'+url+'" target="_blank"></a>';
	    		botones.append(link);
	    	}
	    	
	    }); // each para cada red social
	    
	    function preloadImgs(array){
			for (var i = 0; i < array.length; i++) {
				$("<img />").attr("src", array[i]);
			}
    	}
	    
	};
	 
}(jQuery));