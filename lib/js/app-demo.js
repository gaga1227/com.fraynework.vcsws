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

		//touch delay
		touchDelay: 100,

		//initButtonsEvents
		initButtonsEvents: function() {
			var $doc = $(document);
			//common
			$doc.on('touchstart', '[data-role="button"]', function(e) {
					console.log('----------------');
					console.log('e:touchstart');
					var $this = $(this);
					$this.data('touchend', false);
					setTimeout( function(){
						if ( !$this.data('touchmove') && !$this.data('touchend') ) {
							$this.addClass('active');
						}
					}, App.demo.touchDelay );
				})
				.on('touchmove', '[data-role="button"]', function(e) {
					console.log('e:touchmove');
					$(this)
						.data('touchmove', true)
						.removeClass('active');
				})
				.on('touchend', '[data-role="button"]', function(e) {
					console.log('e:touchend');
					$(this)
						.data('touchmove', false)
						.data('touchend', true)
						.removeClass('active');
				})
				.on('tap', '[data-role="button"]', function(e) {
					console.log('e:tap');
				})
				.on('longTap', '[data-role="button"]', function(e) {
					console.log('e:longTap');
				})
				.on('click', '[data-role="button"]', function(e) {
					console.log('e:click');
				});
		},

		//initScroller
		initScroller: function(){
			var	$container = $('[data-role=scroller]');
			if (!$container.length) { return 'no scroller container found'; }
			if ($.os.ios) { return 'iOS uses native scrolling'; }
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

		//initSwitch
		initSwitch: function(){
			var	$switches = $('[data-role=switch]'),
				activeCls = 'checked';

			if (!$switches.length) {
				return 'no switch ctrl found!';
			}

			//event handler
			function updateSwitch($tgt, toggle){
				var $switch = $tgt,
					$chkbox = $switch.find('input'),
					checked = toggle ? !$chkbox.prop('checked') : $chkbox.prop('checked');
				if (checked) {
					$switch.addClass(activeCls);
				} else {
					$switch.removeClass(activeCls);
				}
				$chkbox.prop('checked', checked);
			}

			//bind button event
			$switches.on('click', function(e){
				var $switch = $(this);
				updateSwitch($switch, true);
			});
			$switches.on('swipeLeft swipeRight', function(e){
				var $switch = $(this),
					checked = $switch.find('input').prop('checked'),
					type = e.type;
				if ( (type == 'swipeLeft' && checked) || (type == 'swipeRight' && !checked) ) {
					updateSwitch($switch, true);
				}
			});

			//init states
			$.each($switches, function(idx,ele){
				updateSwitch($(ele), false);
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
			this.initSwitch();
			this.initAccordion();
		}

	};

	return App;

})(window.App);
