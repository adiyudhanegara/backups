// ======= EVENT DELAY =======
function delay(callback, ms) {
  var timer = 0;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}

// ======= SCROLL TO ELEMENT =======
function scroll_to(el, opts={}){
  sub_el = undefined;
  if (el.is("select.using-chosen:hidden")) {
    sub_el = el.next();
  }
  o={
    space: opts.space || 0,
    horizontal: opts.horizontal || false,
    container: opts.container || [document.documentElement, document.body],
    center: opts.center || false,
    callback: opts.callback || function(){
      if (el.is("input:not(:disabled):not(:animated), select:not(:disabled):not(:animated)")) {
        el.focus();
      }
    }
  }
  if (o.horizontal) {
    let scroll_pos = 0;
    $(`.product-details-navigation li:not(:nth-child(1n+${el.index()+1}))`).each(function(index) {
      scroll_pos += parseInt($(this).width(), 10) + 15;
    });
    if (o.center) {
      scroll_pos -= (parseInt($(o.container).width(), 10)/2) - ((parseInt(el.width(), 10)+15)/2);
    }
    $(o.container).animate({
      scrollLeft: scroll_pos + o.space
    }, 500);
  }else{
    $(o.container).animate({
      scrollTop: (sub_el || el).offset().top+o.space
    }, 500, 'swing', o.callback);
  }
}

// Jump to Top]
function backToTop() {
	scroll_to($("body"));
}

//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);
// When the user scrolls down 20px from the top of the document, show the button
scrollFunction();

window.onscroll = delay(function () {
	scrollFunction();
}, 100);

function scrollFunction() {
	if (
		document.body.scrollTop > 20 ||
		document.documentElement.scrollTop > 20
	) {
		mybutton.classList.add('bounce2');
		mybutton.classList.add("active");
	} else {
		mybutton.classList.remove('bounce2');
		mybutton.classList.remove("active");
	}
}

// Validation with jQuery Validate
$(document).ready( function () {
	$("#contactForm").validate( {
		rules: {
			name: "required",
			email: {
				required: true,
				email: true
			},
			phone: {
				required: true,
				phone: true
			},
			message: {
				required: true,
				minlength: 2
			},
		},
		messages: {
			name: "Please enter your firstname",
			email: "Please enter a valid email address",
			phone: "Please enter a valid phone address",
			message: {
				required: "Please enter a username",
				minlength: "Your username must consist of at least 2 characters"
			},
		},
		errorElement: "em",
		errorPlacement: function ( error, element ) {
			// Add the `help-block` class to the error element
			error.addClass( "help-block" );

			// Add `has-feedback` class to the parent div.form-group
			// in order to add icons to inputs
			element.parents( ".col-sm-5" ).addClass( "has-feedback" );

			if ( element.prop( "type" ) === "checkbox" ) {
				error.insertAfter( element.parent( "label" ) );
			} else {
				error.insertAfter( element );
			}

			// Add the span element, if doesn't exists, and apply the icon classes to it.
			if ( !element.next( "span" )[ 0 ] ) {
				$( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
			}
		},
		success: function ( label, element ) {
			// Add the span element, if doesn't exists, and apply the icon classes to it.
			if ( !$( element ).next( "span" )[ 0 ] ) {
				$( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter( $( element ) );
			}
		},
		highlight: function ( element, errorClass, validClass ) {
			$( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
			$( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
		},
		unhighlight: function ( element, errorClass, validClass ) {
			$( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
			$( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
		}
	});
});

// Href link anchor handler
$(function(){
	AOS.init({ offset: 100, duration:700, easing:"ease-out-quad", once:false });
	window.addEventListener('load', AOS.refresh);

	$("a[rel='nofollow']").on("click", function(event) {
		event.preventDefault();
		var direction = $($(this).attr("href"));
		if(direction.length == 0) return false;
		scroll_to(direction, {
			space: -50,
		});
	});

	$("#services-slider").owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    responsive:{
			0:{
				items:1,
				nav:true
			},
			600:{
				items:3,
				nav:false
			},
			1000:{
				items:3,
				nav:true,
				loop:false
			}
		},
	});

	$('#subscriptionForm').on("ajaxError", function(event, jqxhr, settings, thrownError) {
		return event.preventDefault();
	});
});
