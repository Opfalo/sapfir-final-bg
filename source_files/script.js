/* nav */
$(document).ready(function(){
	var theToggle = document.getElementById('toggle-nav');

	function hasClass(elem, className) {
		return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
	}

	function addClass(elem, className) {
	    if (!hasClass(elem, className)) {
	    	elem.className += ' ' + className;
	    }
	}

	function removeClass(elem, className) {
		var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
		if (hasClass(elem, className)) {
	        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
	            newClass = newClass.replace(' ' + className + ' ', ' ');
	        }
	        elem.className = newClass.replace(/^\s+|\s+$/g, '');
	    }
	}

	function toggleClass(elem, className) {
		var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, " " ) + ' ';
	    if (hasClass(elem, className)) {
	        while (newClass.indexOf(" " + className + " ") >= 0 ) {
	            newClass = newClass.replace( " " + className + " " , " " );
	        }
	        elem.className = newClass.replace(/^\s+|\s+$/g, '');
	    } else {
	        elem.className += ' ' + className;
	    }
	}

	theToggle.onclick = function() {
	   toggleClass(this, 'on');

	   //$("header").toggleClass("absolute");
	   return false;
	}
});


/* slider home - banner home primo accesso */
if(jQuery("body").is(".home")) {
	$(document).ready(function(){
		
		
		// banner home primo accesso

		setTimeout(function(){
			$("#home_loader").fadeOut();

		},1000);


		// slider home
		recalcHomeSlider();

		var swiper = new Swiper('#slider_hm', {
			slidesPerView: 1,
			speed: 900,
	    	loop: true,
	    	parallax: true,
	    	
	    	autoplay: {
			    delay: 7000,
			    disableOnInteraction: false,
    			stopOnLast: false
			},
		    navigation: {
		        nextEl: '.swiper-next',
		        prevEl: '.swiper-prev',
		    }
		});

		swiper.autoplay.start();

		
	});

	$(window).resize(function(){
		recalcHomeSlider();
	})
};

function recalcHomeSlider() {
	var ww = $(window).width();
	var slide = $('.swiper-slide');

	slide.each(function(){

		var slideDesktop = $(this).attr('data-slide-desktop');
		var slideMobile = $(this).attr('data-slide-mobile');

		//console.log(slideMobile);

		if(ww <= 680) {
			$(this).css('background-image', 'url("'+slideMobile+'")');
		}
		else {
			$(this).css('background-image', 'url("'+slideDesktop+'")');
		}

	});
}


/*carousel prodotti correlati */
if(jQuery("body").is(".single-product")) {
$(document).ready(function(){
	/* correlati */
	var swiper_related = new Swiper('.related_products .swiper-container', {
	    slidesPerView: 3,
	    spaceBetween: 20,
	   	navigation: {
        	nextEl: '.related_products .swiper-next',
		    prevEl: '.related_products .swiper-prev',
      	},
	    breakpoints: {
	        1100: {
	        	spaceBetween: 15
	        },
	        768: {
	        	slidesPerView: 2,
	        	spaceBetween: 10
	        },
	        640: {
	        	slidesPerView: 1,
	        	spaceBetween: 0
	        }
      	}
	});
});

/*media gallery */
var swiper_gallery = new Swiper('.gallery_product .swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
    	nextEl: '.gallery_product .swiper-next',
	    prevEl: '.gallery_product .swiper-prev',
  	},
    breakpoints: {
        1100: {
        	spaceBetween: 15
        },
        768: {
        	slidesPerView: 2,
        	spaceBetween: 10
        },
        640: {
        	slidesPerView: 1,
        	spaceBetween: 0
        }
  	}
});

// Descrizione icone prodotto al "mouseover"
jQuery(document).ready(function() {
	jQuery('[data-toggle="popover"]').popover();
});

};

// faccio comparire sottomenù corrispondente in base alla voce cliccata: unico vincolo a backend > menù rispettare gerarchia classi
 		
$(document).on("click", ".custom-menu", function(){
	
	var classes = $(this).attr('class').split(/\s+/);
	
	$('.custom-menu').not($(this)).removeClass('nav-active');
	$('.custom-submenu').not('#sub'+classes[1]).hide();

	$(this).addClass("nav-active");
	 
	$('#sub'+classes[1]).insertAfter($('.nav-active > a')).fadeIn();

});


/* lightbox */

$(document).ready(function(){
    $(".fancybox").fancybox({
        openEffect: "none",
        closeEffect: "none"
    });
});


//button top
function scrollaAlTop() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
}

(function($) {          
  $(document).ready(function(){                    
    $(window).scroll(function(){                          
      if ($(this).scrollTop() > 400) {
        $('#top_button').fadeIn(500);
      } else {
        $('#top_button').fadeOut(500);
      }
    });
  });
})(jQuery);


//open app social on mobile
if(navigator.userAgent.match(/iPhone|iPod/i|/Android/i|/Windows Phone/i)) {
	$("footer .social.mobile").show();
	$("footer .social.desktop").hide();
} else {
	$("footer .social.mobile").hide();
	$("footer .social.desktop").show();
}

/* parallax banner */

$(document).ready(function(){
	$window = $(window);
	$('.banner-parallax').each(function() {
		var $scroll = $(this);
		$(window).scroll(function() {
			var yPos = $window.scrollTop();
			var coords = '50% ' + yPos + 'px';
			if(yPos < 600 && $window.width() > 1025)
				$scroll.css({ backgroundPosition: coords });
			else
				$scroll.css({ backgroundPosition: "center" });
		});
	});  
}); 


/*********************************************/
/*			  AREA RISERVATA				 */
/*********************************************/

$('#user_login').on('click', function(){
	var email = $('#user_email').val();
	var passw = $('#user_password').val();
	console.log('click');
	$(".form-error").each(function(){
		$(this).text("");	
	});

	var data = {
		'action' : 'sportarredo_login',
		'email' : email,
		'password' : passw
	};

	jQuery.post(window.ajax_url, data, function(response) {
			var data = JSON.parse(response);
			console.log(data);
			if(data == "0"){
				//window.location.href = window.home_url+'/documenti';
				window.location.reload();
			}
			// else if(data == "1"){
			// 	window.location.href = window.home_url+'/wp-admin/admin.php?page=wp_file_manager#elf_l1_dGVzdDI';
			// }
			else{
				$.each(data,function(i,message){
						$("#"+i).text(message);
				});
			}	
	});	

});


$(document).on('ready', function(){

	$('.download-area-folder').each(function(){
		$(this).find('ul').hide();
	});
});


$('.download-area-folder span').on('click', function(){
	console.log($(this));

	//if($(this).children(':last').find('ul')){	
		if($(this).parent().find('> ul').is(":visible")){
			$(this).parent().find('> ul').hide();
		}
		else{
			$(this).parent().find('> ul').show();	
			$('html, body').animate({
		        scrollTop: $(this).parent().find('> ul').offset().top
		    }, 2000);
		}
	//}	
})

/* lampade accordion + hash */

if(jQuery("body").is(".term-lampade") || jQuery("body").is(".term-lamps") || jQuery("body").is(".term-lamparas")) {
	
	var location_hash = window.location.hash;

	$(".panel-title").on("click", function(){

		$('html, body').animate({ scrollTop: $(this).offset().top-$("header").outerHeight()}, 1000);
		
		var id = $(this).parent(".panel").attr("id");
		$(this).toggleClass('active');
		$(this).parent(".panel").find(".panel-body").toggleClass("active-collapse");
	});


	if($(window.location.hash).length > 0){
		$('html, body').animate({ scrollTop: $(window.location.hash).offset().top-$("header").outerHeight()}, 1000);
		var collapse = (location.hash);
		var collapse = collapse.substr(1)

		$("#"+collapse).find(".panel-title").toggleClass('active');
		$("#"+collapse).find(".panel-body").toggleClass("active-collapse");
	}

	$("#submenu-lampade a").on("click", function(){
		
		var collapse = $(this).attr('data-target');

		
		$(".panel-group").find(".panel-title").removeClass('active');
		$(".panel-group").find(".panel-body").removeClass('active-collapse');

		$("#"+collapse).find(".panel-title").toggleClass('active');
		$("#"+collapse).find(".panel-body").toggleClass("active-collapse");	

		$("#toggle-nav").trigger("click");
		
		$('html, body').animate({ scrollTop: $("#"+collapse).offset().top-$("header").outerHeight()}, 1000);

	});

}


//correlati mobile
if ($(window).width() <= 767)  {  

	$(".drop-mobile").on("click", function(){
		$(".open-mobile").hide();
		$(this).find(".open-mobile").toggle();
	});
}

$( window ).resize(function() {
	if ($(window).width() > 767)  {  
  		$(".open-mobile").show();
  	} else {
  		$(".open-mobile").hide();
  	}
});