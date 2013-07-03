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
			
			//initFile
			//this.initFile();
		}
		
	};
	
	return App;
	
})(window.App);