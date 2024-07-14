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

//Get the button
let mybutton = document.getElementById("btn-back-to-top");

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
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

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
	} );
} );
