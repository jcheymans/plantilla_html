/*
Snippets de Código VARIOS JS
*/

$(document).ready(function(){
	
	// Dejarlas asi (llamadas desde aca)
	_setBrowser();
	setSmoothScrolling();
	setForms();
	
	// Llamarlas desde otro archivo
	//initICheck();
	//setTooltips();
	//setLazy();
	//setJScroll();
	//setSVG();
	//setGlobalKeys();
	//setPasswordStrength();
	
});


function setForms(){
    if($.fn.datepicker) {
        $(".calendar, .datepicker").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'dd-mm-yy'
        });
    }
}

function setJScroll(){
	// Mas ejemplos: http://jscroll.com/
	$('.scroll').jscroll();
	
	// Para que sea con el link (clickeando y no automatico)
	$('.scroll2').jscroll({
	    autoTrigger: false
	});
	
	// Despues del tercero ya no es automatico
	$('.scroll3').jscroll({
	    autoTriggerUntil: 3
	});
}

function setLazy(){
	//<img data-original="http://www.htmliseasy.com/about_gifs/hello_world.gif" class="lazy" />
	$("img.lazy").lazyload({
		effect : "fadeIn"
	});
	
	// OJO: CUANDO SEAN MUCHISIMAS IMAGENES, USAR EL SCROLLSTOP (USA OTRO PLUGIN)
}

// TOOLTIPS
function setTooltips(){
	// http://iamceege.github.io/tooltipster/
	
	// Simple
	$('.tooltip3').tooltipster();
	
	// Theme diferente
	/*$('.tooltip').tooltipster({
	    theme: 'tooltipster-noir'
	});*/
	$('.tooltip').tooltipster({
	    theme: 'tooltipster-flat',
	    position: "top"
	});
	
	// Mostrar y ocultar programatically
	$('#example').tooltipster('show');
	$('#example').tooltipster('hide');
	
	// Cambiar el contenido de un tooltip
	$('#my-special-element').tooltipster('content', 'My new content');
	
	// Configuracion avanzada
	$('.tooltip2').tooltipster({
	   animation: 'fade',
	   delay: 200,
	   theme: 'tooltipster-default',
	   touchDevices: false,
	   trigger: 'hover'
	});
	
	// Contenido custom html del tooltip
	$('#my-tooltip').tooltipster({
        content: $('<span><img src="my-image.png" /> <strong>This text is in bold case !</strong></span>')
    });
}


// LOADING *************************************************************************************************************************************

function preload(imgArray, callback_final, callback_siempre){
	if(imgArray && typeof imgArray !== 'undefined'){
		if(imgArray && imgArray.length>0){
			var img_count = imgArray.length;
			var baseUrl = 'http://thinkpixellab.com/pxloader' + '/slowImage.php?delay=1&time=' + new Date; // delay each image and append the timestamp to prevent caching 
		    //$log = $('#loading .log').val(''); //$progress = $('#loading .info').text('0 / '+img_count); 
			loader = new PxLoader(); 
			for(i in imgArray){
				var pxImage = new PxLoaderImage(baseUrl + '&i=' + imgArray[i]); pxImage.imageNumber = i + 1; loader.add(pxImage);
			}
			loader.addProgressListener(function(e) { // callback that runs every time an image loads 
				if(typeof callback_siempre == "function") callback_siempre();
			    //$log.val($log.val() + 'Image ' + e.resource.imageNumber + ' Loaded\r'); // log which image completed 
			    //$progress.text(e.completedCount + ' / ' + e.totalCount); // the event provides stats on the number of completed items
			});
			loader.addCompletionListener(function() {
				if(typeof callback_final == "function") callback_final();
			});  
			loader.start(); 
		} else {
			if(typeof callback_final == "function") callback_final();
		}
	} else {
		if(typeof callback_final == "function") callback_final();
	}
}


// INICIALIZAR CHECKBOX Y RADIO CUSTOM - iCheck ************************************************************************************************

function initICheck(){
	$('input').iCheck({
		checkboxClass: 'icheckbox_minimal',
		radioClass: 'iradio_minimal',
		increaseArea: '20%' // optional
	});
	/*$('input').iCheck({
	    checkboxClass: 'icheckbox_minimal-red',
	    radioClass: 'iradio_minimal-red',
	    increaseArea: '20%' // optional
	}); */
}


// EFECTO DIBUJADO DE SVG ************************************************************************************************

function setSVG(){
	replaceWithPaths($('svg')); // Reemplaza todos los vectores por PATHS (necesario para efecto de dibujado)
	hideSVGPaths($("div svg")); // Esconde los SVG, para luego aparecerlos dibujados
	startSVGAnimation($('svg')); // Dibuja los paths
}

// [SNIPPET] KEYPRESS KEYS GLOBALES ***********************************************************************************************************************************
function setGlobalKeys(){
	$("body").keydown(function(e) {
	  	switch(e.keyCode){
	  		case 37:
	  			e.preventDefault(); e.stopPropagation();
		    	prev();
		    	break;
		    case 39:
			    e.preventDefault(); e.stopPropagation();
		    	next();
		    	break;
	  	}
	});
}


// [SNIPPET] TEST PASSWORD STRENGTH  *************************************************************************************************************************************
/*$('#passwordId').keyup(function(e) {
	var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).*$", "g");
	var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
	var enoughRegex = new RegExp("(?=.{6,}).*", "g");
	
	if (false == enoughRegex.test($(this).val())) {
		$('#passstrength').html('More Characters');
	} else if (strongRegex.test($(this).val())) {
		$('#passstrength').className = 'ok';
		$('#passstrength').html('Strong!');
	} else if (mediumRegex.test($(this).val())) {
		$('#passstrength').className = 'alert';
		$('#passstrength').html('Medium!');
	} else {
		$('#passstrength').className = 'error';
		$('#passstrength').html('Weak!');
	}
	return true;
});*/


// SMOOTH SCROLLING FOR INTERNAL LINKS (despues unificar las dos funciones)

function setSmoothScrolling(){ // Automaticamente setea todas las links #asi para que naveguen smoothly 
	// (usa la funcion scrollTo que la puedo usar yo afuera con cualquier selector)
	$('a').on("click", function(e){
		var href = $(this).attr("href");
		if(href && href.length>1){
			if(href_nav(href)){
				e.preventDefault();
				scrollTo(href, 800, 0, function(){
				    window.location.hash = href;
				});
			}
		}
	});
}

function scrollTo(selector, tiempo, offset, callback){
	if(!tiempo) var tiempo = 1000;
	if(!offset) var offset = 0;
	
	if($('body').find(selector).length>0){
		
		var mostrar = $('body').find(selector).offset().top;
		if(offset!=0) mostrar = mostrar + offset;
		
		$('html, body').animate({
			scrollTop: mostrar
		}, tiempo, "swing", function(){ // despues puedo hacer q esto agregue al url el hash ( window.location.hash = href; )
			if(typeof callback == "function") callback();
		}); 
		
		return false;
	}
}

function href_nav(str){
	if(str && str.length>1 && str['0'] == "#"){
		return true;
	} else {
		return false;
	}
}



/*
function smoothScroll(href, tiempo){
	if(!tiempo) var tiempo = 1000;
	var mostrar = $('body').find(href).offset().top;
	$('html, body').animate({
		scrollTop: mostrar
	}, tiempo); 
	return false;
}*/


// WORD LIMIT EN UN PARRAFO (Funcionamiento Read more incorporado) ***************************************************************************************************

function word_limit(str, nwords) {
	var words = str.split(' ');
  	words.splice(nwords, words.length-1);
  	return words.join(' ') + (words.length !== str.split(' ').length ? '&hellip;' : '');
}
/* Ejemplo
var $p = $('p');
var $more = $('#more');
var $less = $('#less');

function less() {
  $p.data('text', $p.html()); // store untouched text first
  $p.html( word_limit($p.html(), 50) );
  $more.show();
  $less.hide();
}

function more() {
  $p.html($p.data('text'));
  $more.hide();
  $less.show();
}

less(); // init
$('#more').click(more);
$('#less').click(less);

*/



// HIGHLIGHT TEXT (LES AGREGA UNA CLASE) **************************************************************************************************
function highlight(text, words, tag) {
  // Default tag if no tag is provided
  tag = tag || 'span';
 
  var i, len = words.length, re;
  for (i = 0; i < len; i++) {
    // Global regex to highlight all matches
    re = new RegExp(words[i], 'g');
    if (re.test(text)) {
      text = text.replace(re, '<'+ tag +' class="highlight">$&</'+ tag +'>');
    }
  }
  return text;
}
function unhighlight(text, tag) {
  // Default tag if no tag is provided
  tag = tag || 'span';
  var re = new RegExp('(<'+ tag +'.+?>|<\/'+ tag +'>)', 'g');
  return text.replace(re, '');
}

/* Ejemplo:
 * 
$('p').html( highlight(
    $('p').html(), // the text
    ['foo', 'bar', 'baz', 'hello world'], // list of words or phrases to highlight
    'strong' // custom tag
));*/



// EMBED YOUTUBE VIDEOS FROM URLS  **************************************************************************************************

function embedYoutube(link, ops) {
  var o = $.extend({
    width: 480,
    height: 320,
    params: ''
  }, ops);
  var id = /\?v\=(\w+)/.exec(link)[1];
  return '<iframe style="display: block;"'+
    ' class="youtube-video" type="text/html"'+
    ' width="' + o.width + '" height="' + o.height +
    ' "src="http://www.youtube.com/embed/' + id + '?' + o.params +
    '&amp;wmode=transparent" frameborder="0" />';
}
/* Ejemplo: 
embedYoutube(
  'https://www.youtube.com/watch?v=JaAWdljhD5o',
  { params: 'theme=light&fs=0' }
);
*/




// VERIFICA SI ES UNA FECHA VALIDA ********************************************************************************************************************************

function isValidDate(value, userFormat) { 
  // Set default format if format is not provided
  userFormat = userFormat || 'yyyy/mm/dd';
 
  // Find custom delimiter by excluding month, day and year characters
  var delimiter = /[^mdy]/.exec(userFormat)[0];
 
  // Create an array with month, day and year so we know the format order by index
  var theFormat = userFormat.split(delimiter);
 
  // Create array from user date
  var theDate = value.split(delimiter);
 
  function isDate(date, format) {
    var m, d, y, i = 0, len = format.length, f;
    for (i; i < len; i++) {
      f = format[i];
      if (/m/.test(f)) m = date[i];
      if (/d/.test(f)) d = date[i];
      if (/y/.test(f)) y = date[i];
    }
    return (
      m > 0 && m < 13 &&
      y && y.length === 4 &&
      d > 0 &&
      // Check if it's a valid day of the month
      d <= (new Date(y, m, 0)).getDate()
    );
  }
  return isDate(theDate, theFormat);
}
// Ejemplo: isValidDate('dd-mm-yyyy', '31/11/2012') - Esto seria false porque no existe el 31 de noviembre






// FUNCIONES QUE ME DAN EL MAX HEIGHT/WIDTH DE UN ELEMENTO (Lo usare para hacer dos columnas con alto igual) ***************************************************

var getMaxHeight = function ($elms) {
  	var maxHeight = 0;
  	$elms.each(function(){ // In some cases you may want to use outerHeight() instead
	    var height = $(this).height();
	    if(height > maxHeight) {
	    	maxHeight = height;
	    }
  	});
  	return maxHeight;
}; // Ejemplo de uso: $(elements).height( getMaxHeight($(elements)) );

var getMaxWidth = function ($elms) {
  	var maxWidth = 0;
  	$elms.each(function(){ // In some cases you may want to use outerHeight() instead
	    var width = $(this).width();
	    if(width > maxWidth) {
	      	maxWidth = width;
	    }
  	});
  	return maxWidth;
}; // Ejemplo de uso: $(elements).width( getMaxWidth($(elements)) );



// FUNCION QUE ME PERMITE ESPERAR A QUE TERMINE EL EVENTO (SCROLL) ************************************************************************************************

var waitForFinalEvent = (function(){
	var timers = {};
  	return function(callback, ms, uniqueId){
	    if(!uniqueId) uniqueId = "Don't call this twice without a uniqueId";
	    if(timers[uniqueId]) clearTimeout (timers[uniqueId]);
	    timers[uniqueId] = setTimeout(callback, ms);
  	};
})();
/*Ejemplo:
	waitForFinalEvent(function(){
		alert("Do as you please");
	}, 500, "some unique string");
*/



// RECONOCIMIENTO DE NAVEGADOR Y VERSION ************************************************************************************************

function _setBrowser(){
	Browser.init(); // Funcion en hey_funciones.js (modernizr)
	console.log("Estás usando el browser "+Browser.browser+", versión "+Browser.version);
}
var Browser = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;
            if (dataString.indexOf(data[i].subString) !== -1) return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) return;
        var rv = dataString.indexOf("rv:");
        if (this.versionSearchString === "Trident" && rv !== -1) {
            return parseFloat(dataString.substring(rv + 3));
        } else {
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        }
    },
    dataBrowser: [
        {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
        {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
        {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
        {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
        {string: navigator.userAgent, subString: "Safari", identity: "Safari"},
        {string: navigator.userAgent, subString: "Opera", identity: "Opera"}
    ]
};

