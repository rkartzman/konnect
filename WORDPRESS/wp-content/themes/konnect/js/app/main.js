var $window = $(window),
    $body = $('body');

$(window).on('scroll', function() {
	var st = $(window).scrollTop();
	if(st > 0) {
		var boundary = .7;
		blurScroll = (1/(st/5));
		oVal = blurScroll;

		var imgBoundary = .8,
				imgScale = (1/(st/5));

		// as our scroll position increases we want out opacity to decrease. negative correlation between scroll and opacity 
		if(imgScale < imgBoundary) {
			imgScale = imgBoundary;
		} else if( imgScale > 1 ) {
			imgScale = 1;
		}
		if(blurScroll < boundary) {
			blurScroll = boundary;
		}

		$('.branding__info.blur').css('opacity', oVal);
		$('.blur img').css('opacity', blurScroll);	
		$('.blur img').css('transform', 'scale(' + imgScale + ')');
	} else {
		$('.blur img').css('opacity', 1);
		$('.blur img').css('transform', 'scale(1)');
		$('.branding__info.blur').css('opacity', 1);
		
	}
	
});
var utility = function(){
    return{
        throttle: function(fn, threshhold, scope) {
            threshhold || (threshhold = 250);
            var last;
            var deferTimer;
            return function() {
                var context = scope || this;

                var now = +new Date,
                    args = arguments;
                if (last && now < last + threshhold) {
                    // preserve by debouncing the last call
                    clearTimeout(deferTimer);
                    deferTimer = setTimeout(function () {
                        last = now;
                        fn.apply(context, args);
                    }, threshhold);
                } else {
                    last = now;
                    fn.apply(context, args);
                }
            };
        },
        debounce: function(fn, threshhold, scope) {
            threshhold || (threshhold = 250);
            var deferTimer;

            return function () {
                var context = scope || this;
                var args = arguments;

                clearTimeout(deferTimer);
                deferTimer = setTimeout(function() {
                    fn.apply(context, args);
                }, threshhold);

            };
        },
        setCookie: function(id, value, days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            var expires = "expires="+date.toUTCString();
            document.cookie = id + "=" + value + "; " + expires;
        },
        getCookie: function(id) {
            var name = id + "=";
            var cookies = document.cookie.split(';');

            for(var i=0; i<cookies.length; i++) {
                var cookie = cookies[i];
                while (cookie.charAt(0) == ' ')
                    cookie = cookie.substring(1);
                if( cookie.indexOf(name) == 0 )
                    return cookie.substring(name.length, cookie.length);
            }
            return "";
        },
        deleteCookie: function(id){
            this.setCookie(id, "", -1);
        },
        checkBrowser: function(){
            // Check for IE 9,10,11
            if ( /MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) ){
                // this is Internet explorer 9 10 and 11
                $('html').addClass('ie');
                isIe = true;
            }

            if ( /constructor/i.test(window.HTMLElement) ){
                // this is Safari
                $('html').addClass('safari');
                isSafari = true;
            }

            if ( window.navigator.userAgent.indexOf('Edge') > -1 ){
                // this is Safari
                $('html').addClass('edge');
                isEdge = true;
            }
        }
    };
};

var scrollDetector = function(){
    var position = 0;
    var lastPosition = 0;
    var direction;
    var isTop;
    var $nav = $('.nav');

    return {
        isTop: function(){
            return isTop;
        },
        direction: function(){
            return direction;
        },
        update: function(callbacks){

            lastPosition = position;
            position = $window.scrollTop();
            direction = lastPosition > position ? 'up' : 'down';
            isTop = position < $nav.height();

            if( typeof(callbacks) === 'undefined' ) return;

            // call the function(s) to run after the update
            if( Array.isArray(callbacks) ){
                for( var i=0; i < callbacks.length; i++ ) {
                    callbacks[i](direction, isTop);
                }
            } else {
                callbacks(direction, isTop);
            }
        }
    }
};

var util = new utility();

var scrollCallbacks = [ // array of functions to run on scroll
    
];
var scrollDetector = new scrollDetector();
scrollDetector.update();

var scrollDelay = 250;
$window.scroll(
    util.throttle(function(){
        scrollDetector.update(scrollCallbacks);
    }, scrollDelay, this)
);