/* ------------------------------------------------------------------------------ */
/* App - utils */
/* ------------------------------------------------------------------------------ */
window.App = (function(app){
	
	//create empty App obj if none found
	var App = app || {};

	/* ------------------------------------------------------------------------------ */
	/* utils - logger */
	window.Logger = function() {
		var oldConsoleLog = null,
			pub = {};
		pub.enableLogger = function enableLogger() {
			if(oldConsoleLog == null) return;
			window['console']['log'] = oldConsoleLog;
		};
		pub.disableLogger = function disableLogger() {
			oldConsoleLog = console.log;
			window['console']['log'] = function() {};
		};
		return pub;
	}();
	
	/* ------------------------------------------------------------------------------ */
	/* utils - Platform */
	window.Platform = new function(){
		//detecting functions
		function checkPlatform(os) { return (navigator.userAgent.toLowerCase().indexOf(os.toLowerCase())>=0); }
		function checkEvent(e) { return (e in document.documentElement); }
		function IsGCFInstalled() {
			try {
				var i = new ActiveXObject('ChromeTab.ChromeFrame');
				if (i) { return true; }
			} catch(e) {
				//console.log('ChromeFrame not available, error:', e.message);
			}
			return false;
		}
		//add properties
		this.ie = checkPlatform('msie');
		this.gcf = IsGCFInstalled();
		this.iPhone = checkPlatform('iPhone');
		this.iPad = checkPlatform('iPad');
		this.iPod = checkPlatform('iPod');
		this.iOS = this.iPhone||this.iPad||this.iPod;
		this.android = checkPlatform('android');
		this.touchOS = checkEvent('ontouchstart');
		this.debugLog = function(){
			console.log('iPhone: '+this.iPhone);
			console.log('iPad: '+this.iPad);
			console.log('iPod: '+this.iPod);
			console.log('iOS: '+this.iOS);
			console.log('android: '+this.android);
			console.log('touchOS: '+this.touchOS);
		}
		//return self
		return this;
	}
	
	/* ------------------------------------------------------------------------------ */
	/* utils - alert */
	if ( !window.Platform.iOS && !window.Platform.android ) {
		window.alert = function(msg){ console.log('window.alert: '+msg); }
	}
	
	/* ------------------------------------------------------------------------------ */
	/* utils */
	App.utils = {
				
		/* ------------------------------------------------------------------------------ */
		/*addDeviceClass*/
		addDeviceClass:	function() {
			var p = Platform;
				$html = $('html:eq(0)');
			$html.removeClass('no-js').addClass('js');
			if (p.touchOS) {
				$html.addClass('touch');
			}
			else {
				$html.addClass('no-touch');
			}
			if (p.iOS) {
				$html.addClass('ios');
				if (p.iPhone) {	$html.addClass('iphone'); }
				else if (p.iPod) {	$html.addClass('ipod'); }
				else if (p.iPad) {	$html.addClass('ipad'); }
			} 
			else if (p.android) {
				$html.addClass('android');
			}
		},	
		
		/* ------------------------------------------------------------------------------ */
		/*popmsg - JQM*/	
		popmsg: function(showSwitch, customOpts, dismiss){
			
			//vars
			var opts,
				defaultOpts = 						//default jqm loader opts for reset
				{
					theme:			'a',			//skin swatch
					text:			'loading',		//string: msg
					textVisible: 	false,			//boolean: show/hide spinner
					textonly:		false,			//boolean: show/hide text msg
					html:			''				//String: replace all content
				};
			
			//update params
			if (showSwitch != 'show' ) {
				showSwitch = 'hide';
				opts = defaultOpts;
			} else {
				opts = customOpts;
			}
			
			//call jqm loader
			$.mobile.loading( showSwitch, opts );
			
			//attach dismiss behavior
			if (dismiss) {
				$('.ui-loader').one('click', function(){
					$.mobile.loading( 'hide' );	
				});
			}
			
		},
		
		/* ------------------------------------------------------------------------------ */
		/*addContact*/		
		addContact: function(dataObj) {
			
			//exit if no API
			if ( !navigator.contacts ) return false;
						
			//vars
			var contact = navigator.contacts.create( dataObj ),
				onSuccess = function(contact) {
					//alert('New contact is saved!');
					console.log('New contact is saved!');
				},
				onError = function(contactError) {
					//alert('Error saving contact: ' + contactError.code);
					console.log('Error saving new contact: ' + contactError.code);
				}
			
			//save contact
			contact.save(onSuccess, onError);
			
		},
		
		/* ------------------------------------------------------------------------------ */
		/*checkConnection*/
		checkConnection: function() {
			
			//exit if no API
			if ( !navigator.network || !navigator.network.connection ) return false;
			
			//vars
			var networkState = navigator.network.connection.type;
			
			//return state
			return networkState;
			
		},
		
		/* ------------------------------------------------------------------------------ */
		/*reloadApp*/
		reloadApp: function() {
			
			//update to main app file address without page id
			window.location = String(window.location).substr(0, String(window.location).indexOf('#'));	
		
		},
		
		/* -------------------------------------------------------------------------- */
		/* push */
		initPush: function() {
			
			var pushNotification;
			
			// result contains any message sent from the plugin call
			function successHandler (result) {
				alert('result = '+result);
			}
			
			// result contains any error description text returned from the plugin call
			function errorHandler (error) {
				alert('error = '+error);
			}
			
			function tokenHandler (result) {
				// Your iOS push server needs to know the token before it can push to this device
				// here is where you might want to send it the token for later use.
				alert('device token = '+result);
			}
			
			/* -------------------------------------------------------------------------- */
			/* ECB */
			
			/* iOS */
			function onNotificationAPN(event) {
				if (event.alert) {
					navigator.notification.alert(event.alert);
				}
			
				if (event.sound) {
					var snd = new Media(event.sound);
					snd.play();
				}
			
				if (event.badge) {
					pushNotification.setApplicationIconBadgeNumber(successHandler, event.badge);
				}
			}
			
			/* Android */
			function onNotificationGCM(e) {
				//$("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
	
				switch( e.event )
				{
					case 'registered':
					if ( e.regid.length > 0 )
					{
						$("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
						// Your GCM push server needs to know the regID before it can push to this device
						// here is where you might want to send it the regID for later use.
						console.log("regID = " + e.regID);
					}
					break;
	
					case 'message':
						// if this flag is set, this notification happened while we were in the foreground.
						// you might want to play a sound to get the user's attention, throw up a dialog, etc.
						if (e.foreground)
						{
							$("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
	
							// if the notification contains a soundname, play it.
							var my_media = new Media("/android_asset/www/"+e.soundname);
							my_media.play();
						}
						else
						{   // otherwise we were launched because the user touched a notification in the notification tray.
							if (e.coldstart)
								$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
							else
							$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
						}
	
						$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
						$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
					break;
	
					case 'error':
						$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
					break;
	
					default:
						$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
					break;
				}
			}
			
			function registerPush(){
				
				if (device.platform == 'android' || device.platform == 'Android') {
					/* android */
					pushNotification.register(successHandler, errorHandler, {"senderID":"{deal with later with Google API}","ecb":"onNotificationGCM"});
				} else {
					/* iOS */
					pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});
				}
				
			}
			
			if ( App.onDevice ) {
				//go upon deviceready
				document.addEventListener('deviceready', function(e){ 
					pushNotification = window.plugins.pushNotification;
					registerPush();
				}, false);
			} else {
				
			}
			
			
		},
		
		/* -------------------------------------------------------------------------- */
		/* file */
		initFile: function() {
			
			// file read functions
			function readDataUrl(file) {
				var reader = new FileReader();
				reader.onloadend = function(e) {
					console.log("Read as data URL");
					console.log(e.target.result);
				};
				reader.readAsDataURL(file);
			}
			function readAsText(file) {
				alert('readAsText');
				var reader = new FileReader();
				reader.onloadend = function(e) {
					console.log("Read as text");
					console.log(e.target.result);
					alert(e.target.result);
				};
				reader.readAsText(file);
			}	
			
			//file system handlers
			
			//filesystem request handlers
			function FSRequestSuccess(fileSystem) {
				alert('FSRequestSuccess');
				fileSystem.root.getFile('settings.txt', {create: true, exclusive: true}, FSFileSuccess, FSRequestFail);
			}
			//fileEntry handler
			/*
			function FSFileEntrySuccess(fileEntry) {
				alert('FSFileEntrySuccess');
				fileEntry.file(FSFileSuccess, FSRequestFail);
			}
			*/
			//file handler
			function FSFileSuccess(file){
				alert('FSFileSuccess');
				//readDataUrl(file);
				//readAsText(file);
				
				file.createWriter(
					function(writer){
						writer.onwrite = function(e){ alert('File saved!'); };
						writer.onerror = function(e){ alert('write Failed'); };	
						writer.write('this is the settings file');
					},
					function(){
						alert('createWriter Failed');
					}
				);
				
			}
			//FS fail handler
			function FSRequestFail(e) {
				alert('FSRequestFail');
				alert(e.target.error.code);
				console.log(e.target.error.code);
			}
			
			//request filesystem upon device ready
			document.addEventListener('deviceready', function(e){ 
				alert('initFile: device ready');
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, FSRequestSuccess, FSRequestFail);
			}, false);

		},
		
		/* ------------------------------------------------------------------------------ */
		/*init*/
		init: function() {
			
			//alert('app.utils.init()');
			
			//attach devices class to html
			this.addDeviceClass();
			
			//initPush
			//this.initPush();
			
			//initFile
			//this.initFile();
		}
		
	};
	
	return App;
	
})(window.App);