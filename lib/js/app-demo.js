/* ------------------------------------------------------------------------------ */
/* App - demo */
/* ------------------------------------------------------------------------------ */
window.App = (function(app){
	
	//create empty App obj if none found
	var App = app || {},
		Scroller;
	
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
			var	$container = $('[data-role=scroller]');
			if (!$container.length) {
				return 'no scroller container found';
			}
			if (Scroller) Scroller.destroy();
			Scroller = new FTScroller($container[0], {
				scrollingX: 			false,
				scrollbars: 			true,
				updateOnChanges: 		true,
				bouncing:				$.os.ios ? true : false
			});
		},		
		
		//initCtrlToggle
		initCtrlToggle: function(){
			var	$ctrls = $('[data-ctrl-type=toggle]'),
				activeCls = 'activated';
			
			if (!$ctrls.length) {
				return 'no toggle ctrl found!';
			}
			
			$ctrls.map(function(){
				var $ctrl = $(this);
				$ctrl.on('click', function(e){
					e.preventDefault();
					$ctrl.toggleClass(activeCls);
					if ( $ctrl.siblings().length ) { 
						$ctrl.siblings().removeClass(activeCls);
					}
					App.demo.initScroller();		
				});
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
		
		//initAccordion
		initAccordion: function (){
			var	$triggers = $('.titleAccordion');
			if (!$triggers.length) {
				return 'no accordion trigger found';
			}
			function closeOthers(id) {
				$.each($triggers, function(idx, ele){
					if (id != idx) {
						var $trigger = $(ele),
							$content = $trigger.next('.accordionGrp');
						$trigger.attr('data-active', '0');
						$content.attr('data-active', '0');
					}
				});
			}
			$.each($triggers, function(idx, ele){
				var $trigger = $(ele),
					$content = $trigger.next('.accordionGrp');
				$trigger.on('click', function(){
					var isActive = $trigger.attr('data-active')=='1';
					if (isActive) {
						$trigger.attr('data-active', '0');
						$content.attr('data-active', '0');
					} else {
						$trigger.attr('data-active', '1');
						$content.attr('data-active', '1');
						closeOthers(idx);	
					}
					initScroller();	
				});
			});
		},

		/* ------------------------------------------------------------------------------ */
		//function - init
		init: function(){
			
			//alert('app.demo.init()');
			
			this.initButtonsEvents();
			this.initScroller();
			this.initHomeMenuBtn();		
			this.initCtrlToggle();
			this.initAccordion();	
		}
		
	};
	
	return App;
	
})(window.App);
