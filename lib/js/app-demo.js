/* ------------------------------------------------------------------------------ */
/* App - demo */
/* ------------------------------------------------------------------------------ */
window.App = (function(app){
	
	//create empty App obj if none found
	var App = app || {};
	
	/* ------------------------------------------------------------------------------ */
	/* demo */
	App.demo = {
		
		//initButtonsEvents
		initButtonsEvents: function() {			
			var $doc = $(document);
			//common
			$doc.on('touchstart', '[data-role="button"]', function(e)	{ console.log('e:touchstart'); $(this).addClass('active'); })
				.on('touchmove', '[data-role="button"]', function(e)	{ console.log('e:touchmove'); $(this).removeClass('active'); })
				.on('touchend', '[data-role="button"]', function(e) 	{ console.log('e:touchend'); $(this).removeClass('active'); })
				.on('tap', '[data-role="button"]', function(e) 			{ console.log('e:tap'); })
				.on('longTap', '[data-role="button"]', function(e) 		{ console.log('e:longTap'); })
				.on('click', '[data-role="button"]', function(e) 		{ console.log('e:click'); });
		},
		
		//initScroller
		initScroller: function(){
			var	$container = $('[data-role=scroller]'),
				scroller;
			if (!$container.length) {
				return 'no scroller container found';
			}
			scroller = new FTScroller($container[0], {
				scrollingX: 			false,
				scrollbars: 			true,
				updateOnChanges: 		true,
				bouncing:				$.os.ios ? true : false
			});
		},
		
		//initHomeMenuBtn
		initHomeMenuBtn: function(){
			var	$menu = $('#pgHome').find('.menu'),
				$btnMenu = $menu.find('.btnMenu'),
				activeCls = 'active';
			
			if (!$menu.length || !$btnMenu.length) {
				return 'no menu button found!';
			}
			
			$btnMenu.on('click', function(e){
				e.preventDefault();
				$menu.toggleClass(activeCls);	
			});
		},

		/* ------------------------------------------------------------------------------ */
		//function - init
		init: function(){
			
			//alert('app.demo.init()');
			
			this.initButtonsEvents();
			this.initScroller();
			this.initHomeMenuBtn();			
		}
		
	};
	
	return App;
	
})(window.App);
