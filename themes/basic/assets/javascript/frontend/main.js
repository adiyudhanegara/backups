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

function setupDateTimePicker(element) {
	const defaults = {
		inline: true,
		minDate: 0,
		formatDate: 'y-m-d',
		format: 'Y-m-d H:i',
		allowBlank: true,
		defaultSelect: false,
		validateOnBlur: false,
		allowTimes:[
			"08.00",
			"10.00",
			"13.00",
			"15:00",
			"17:00",
			"19:00",
		]
	}

	$(element).datetimepicker($.extend(defaults, $(element).data('datepicker-options')));
}

$.fn.buildNestedObject = function() {
	var formArray = this.serializeArray();
	var result = {};

	formArray.forEach(function(item) {
		var keys = item.name.split('[').map(key => key.replace(']', ''));
		var value = item.value;
		var obj = result;

		keys.forEach((key, index) => {
			if (index === keys.length - 1) {
				obj[key] = value;
			} else {
				if (!obj[key]) {
					obj[key] = {};
				}
				obj = obj[key];
			}
		});
	});
	return result;
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

let body = document.querySelector("body"),
		lastBodyWidth = document.querySelector("body").clientWidth,
		bodyWidth;

body.style.overflow = "hidden";
bodyWidth = body.clientWidth - lastBodyWidth;
body.style.overflow = "";
body.style.setProperty("--scroll-width", bodyWidth+"px");

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


$(function() {
	let $dialogTemplate = $("#booking-modal").clone();
	$("#booking-modal").remove();

	$(".service-form").on("submit", function(event){
		let $dialog = $dialogTemplate.clone();
		var data = $(this).buildNestedObject(),
				$product = data.product;

		$dialog.dialog({
			dialogClass: 'modal',
			modal: true, // This ensures the backdrop is enabled
			width: 'var(--width)',
			height: $(window).height() * 0.9,
			position: { my: "center", at: "center", of: window },
			open : function(event, ui) {
				$("body").addClass("modal-opened");
			},
			close : function(event, ui) {
				$("body").removeClass("modal-opened");
				$dialog.dialog("destroy");
			},
			show: {
				effect: "scale",
				duration: 500,
				easing: "easeOutBack",
			},
			hide: {
				effect: "scale",
				duration: 500,
				easing: "easeInBack",
			},
			create: function(event, ui) {
				$(this).find(".btn-close[aria-label=Close]").on("click.closeDialog", function(){
					$dialog.dialog("close");
				});
				$(this).find("input[name='booking[package]']").val($product.name);
				
				var current_fs, next_fs, previous_fs; //fieldsets
				var left, opacity, scale; //fieldset properties which we will animate
				var animating; //flag to prevent quick multi-click glitches
				var $fieldsets = $dialog.find(".fieldsets fieldset"),
						$progresses = $dialog.find("#progressbar li"),
						$finish = $dialog.find(".finish"),
						$next		= $dialog.find(".next"),
						$prev		= $dialog.find(".previous"),
						$skip		= $dialog.find(".skip");
				var active_idx = 0,
						fs_length  = $fieldsets.length,
						checkDisabledButton = function() {
							if (active_idx === (fs_length-1)){
								// LAST Page to showing result
								var data = $('#msform').buildNestedObject(),
										booking = data.booking;
								$next.addClass("disabled").add($skip).hide();
								$finish.show();

								next_fs.find("#ordered_class").html(booking.package)
								next_fs.find("#guest_name").html(booking.name)
								next_fs.find("#pax_count").html(booking.pax)
								next_fs.find("#class_schedule").html(moment(booking.date).format('MMMM Do YYYY, h:mm:ss A'));
								
								next_fs.find("[data-bs-toggle=tooltip]").tooltip();
							}else{
								$next.removeClass("disabled").add($skip).show();
								$finish.hide();
							}
							if (active_idx === 0){
								$prev.addClass("disabled");
							}else{
								$prev.removeClass("disabled");
							}
						};

				checkDisabledButton();

				$next.on("click.next", function () {
					if (animating || active_idx === (fs_length-1)) return false;
					animating	= true;
					current_fs	= $fieldsets.eq(active_idx);
					active_idx++;
					next_fs		= $fieldsets.eq(active_idx);
					checkDisabledButton();

					//activate next step on progressbar using the index of next_fs
					$progresses.eq(active_idx).addClass("active");

					//show the next fieldset
					next_fs.show();
					//hide the current fieldset with style
					current_fs.animate({
						opacity: 0
					}, {
						step: function (now, mx) {
							//as the opacity of current_fs reduces to 0 - stored in "now"
							//1. scale current_fs down to 80%
							scale = 1 - (1 - now) * 0.2;
							//2. bring next_fs from the right(50%)
							left = (now * 50) + "%";
							//3. increase opacity of next_fs to 1 as it moves in
							opacity = 1 - now;
							current_fs.css({
								'transform': 'scale(' + scale + ')',
								'position': 'absolute'
							});
							next_fs.css({
								'left': left,
								'opacity': opacity
							});
						},
						complete: function () {
							current_fs.hide();
							animating = false;
						},
						duration: 800,
						//this comes from the custom easing plugin
						easing: 'easeInOutBack'
					});
				});

				$prev.on("click.prev", function () {
					if (animating || active_idx === 0) return false;
					animating = true;
					current_fs = $fieldsets.eq(active_idx);
					//de-activate current step on progressbar
					$progresses.eq(active_idx).removeClass("active");
					active_idx--;
					previous_fs = $fieldsets.eq(active_idx);
					checkDisabledButton();

					//show the previous fieldset
					previous_fs.show();
					//hide the current fieldset with style
					current_fs.animate({
						opacity: 0
					}, {
						step: function (now, mx) {
							//as the opacity of current_fs reduces to 0 - stored in "now"
							//1. scale previous_fs from 80% to 100%
							scale = 0.8 + (1 - now) * 0.2;
							//2. take current_fs to the right(50%) - from 0%
							left = ((1 - now) * 50) + "%";
							//3. increase opacity of previous_fs to 1 as it moves in
							opacity = 1 - now;
							current_fs.css({
								'left': left
							});
							previous_fs.css({
								'transform': 'scale(' + scale + ')',
								'opacity': opacity
							});
						},
						duration: 800,
						complete: function () {
							current_fs.hide();
							animating = false;
						},
						//this comes from the custom easing plugin
						easing: 'easeInOutBack'
					});
				});

				$skip.on("click.skip", function(event) {
					$next.trigger("click.next");
				});

				$dialog.find("#msform").on("submit", function (event) {
					var data = $('#msform').buildNestedObject(),
							booking = data.booking;
					var whatsappUrl = `https://wa.me/6287860828780?text=
						*Silver Class Booking Details*%0a
						*Package:* ${booking.package}%0a
						*Name:* ${booking.name}%0a
						*Pax:* ${booking.pax}%0a
						*Date:* _${moment(booking.date).format('MMMM Do YYYY, h:mm:ss A')}_
					`;
			
					// Open WhatsApp with the message
					window.open(whatsappUrl, '_blank');

					return event.preventDefault();
				});

				setupDateTimePicker($("input[name='booking[date]']")[0]);
			}
		});

		return event.preventDefault();
	});

	$("[data-bs-toggle=tooltip]").tooltip();
}); 
