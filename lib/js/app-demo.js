/* -------------------------------------------------------------------------- */
/* enable buttons */

//common
$(document).on('touchstart', '[data-role="button"]', function(e)	{ console.log('e:touchstart'); $(this).addClass('active'); });
$(document).on('touchmove', '[data-role="button"]', function(e)		{ console.log('e:touchmove'); $(this).removeClass('active'); });
$(document).on('touchend', '[data-role="button"]', function(e) 		{ console.log('e:touchend'); $(this).removeClass('active'); });
$(document).on('tap', '[data-role="button"]', function(e) 			{ console.log('e:tap'); });
$(document).on('longTap', '[data-role="button"]', function(e) 		{ console.log('e:longTap'); });
$(document).on('click', '[data-role="button"]', function(e) 		{ console.log('e:click'); });

/* -------------------------------------------------------------------------- */
/* draft View */
/*
App = {};
App.view = {};
App.view.startupPage = 'Home';
App.view.getAllPages = function(){
	var $pages = $('[data-role="page"]');
	App.view.pages = {};
	$.each( $pages, function(idx,ele){
		App.view.pages[$(ele).attr('id').replace('pg','')] = $(ele);
	} );
};
App.view.hideOtherPages = function(){
	$.each( App.view.pages, function(key,val){
		var $page = $(val);
		if ($page.attr('id') != 'pg'+App.view.currentPage) {
			$page.addClass('hidden');
		}
	} );
};
App.view.setCurrentPage = function(id){
	$.each( App.view.pages, function(key,val){
		var $page = $(val);
		if ($page.attr('id') == 'pg'+id) {
			$page.addClass('currentPage');
		} else {
			$page.removeClass('currentPage');
		}
	} );
};
App.view.gotoPage = function(id, fx){
	var $page = App.view.pages[id],
		fxClass = fx ? ('animated ' + fx) : '';
	if (!$page || !$page.length || App.view.currentPage == id) {
		return false;
	}
	$page.removeClass('hidden');
	App.view.setCurrentPage(id);
	if (fxClass) {
		$page
			.addClass(fxClass)
	  		.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
				console.log('anim end');
				if (fxClass) $(this).removeClass(fxClass);
				App.view.initPage(id);
				App.view.currentPage = id;
				App.view.hideOtherPages();
		  	});
	} else {
		App.view.initPage(id);
		App.view.currentPage = id;
		App.view.hideOtherPages();
	}
};
App.view.initScroller = function(id){
	var	$container = App.view.pages[id].find('[data-role=scroller]'),
		scroller;
	App.view.destroyScroller();
	if (!$container.length) {
		return 'no scroller container found';
	}
	scroller = App.view.scroller = new FTScroller($container[0], {
		scrollingX: 			false,
		scrollbars: 			true,
		updateOnChanges: 		true,
		bouncing:				$.os.ios ? true : false
	});
};
App.view.destroyScroller = function(removeElements){
	if (App.view.scroller) App.view.scroller.destroy(removeElements);
};
App.view.initPage = function(id){
	console.log('init ' + id);
	App.view.initScroller(id);
};
App.view.initMenu = function(){
	//home
	$('#pgHome .btnMenu').on('tap', function(e) {
		$('#pgHome .menu').toggleClass('active');
	});
	//pageHeader
	App.view.menuActive = false;
	$('.pageHeader .btnMenu').on('tap', function(e) {
		var $menu = App.view.pages['Menu'],
			$currentPage = App.view.pages[App.view.currentPage],
			menuActive = !$menu.hasClass('hidden');
		if (menuActive) {
			console.log('deactivating menu');
			$currentPage
				.removeClass('menuActive')
				.one('webkitTransitionEnd msTransitionEnd transitionend', function(e) {
					console.log('trans end');
					$menu.addClass('hidden');
					App.view.initPage(App.view.currentPage);
		  		});
		} else {
			console.log('activating menu');
			$menu.removeClass('hidden');
			App.view.initPage('Menu');
			$currentPage.addClass('menuActive');
		}
	});
	//menuItems
	$('.menuItem').on('click', function(e) {
		var target = $(this).attr('data-target'),
			fx = 'fadeInRight';
		if (App.view.pages[target] && App.view.pages[target].length) {
			App.view.gotoPage(target, fx);
			$('.page').removeClass('menuActive');
		} else {
			alert('invalid target page');
			return false;
		}
	});
};
$(document).ready(function(){
	App.view.getAllPages();
	App.view.initMenu();
	App.view.gotoPage(App.view.startupPage, 'fadeIn');
});
*/

//article
/*
$('.pageHeader .btnBack').on('tap', function(e) {
	$(this).parents('.page').removeClass('active');
	$(this).parents('.page').addClass('off2Right');
});
$('.itemNews, .itemEvent').on('click', function(e) {
	$('#pgArticle').removeClass('off2Right');
});
*/

/* -------------------------------------------------------------------------- */
/* enable buttons */
/*
$(document).on('swipeLeft', '#pgSplash', function(e) {
	console.log('swipeLeft');
	$('#pgHome').removeClass('off2Right');
	$('#loader').removeClass('active');
});
$(document).on('swipeRight', '#pgHome', function(e) {
	console.log('swipeRight');
	$(this).addClass('off2Right');
	$('#loader').addClass('active');
});
*/

function initScroller(){
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
};
initScroller()
