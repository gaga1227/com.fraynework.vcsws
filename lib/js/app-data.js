/* ------------------------------------------------------------------------------ */
/* App - data */
/* ------------------------------------------------------------------------------ */
window.App = (function(app){
	
	//create empty App obj if none found
	var App = app || {};
	
	/* ------------------------------------------------------------------------------ */
	/* data */
	App.data = {
		
		/* ------------------------------------------------------------------------------ */
		//static properties
		static:
		{	

		},
		
		/* ------------------------------------------------------------------------------ */
		//messages
		msg:
		{
			dataLoadError: 		'<p class="title"><b>Unable to retieve data!</b></p><p class="ins">Please make sure you have a working network connection then restart the app.</p>',
			noDeviceSupport:	'<p class="title"><b>Sorry, this feature is not supported by your device.</b></p>',
			noConnection:		'<p class="title"><b>No connection found!</b></p><p class="ins">Please make sure you have a working network connection then restart the app.</p>'
		},
		
		/* ------------------------------------------------------------------------------ */
		//properties
		serviceURLGet: 	'',		//service url get
		model: 			{},		//empty data model
		
		/* ------------------------------------------------------------------------------ */
		//function - updateModel
		updateModel: function( data ) {	
			//vars
			var i;
			
			//loop through supplied data
			for ( i=0; i<data.length; i++ ) {
				//assign each object to model obj using id as key
				this.model[ String(data[i].id) ] = data[i];
			}
			
			console.log('data model updated', this.model);
		},
		
		/* ------------------------------------------------------------------------------ */
		//function - getContactInfo
		getContactInfo: function() {
			
			//vars
			var thisObj = this,
				branchObj = thisObj.model[thisObj.selected],
				contactDataObj = {};
				
			//update data to new contact data obj
			contactDataObj.name = { givenName: branchObj.name };
			contactDataObj.displayName = branchObj.name;
			contactDataObj.phoneNumbers = [ new ContactField( 'work', branchObj.phone ) ];
			contactDataObj.addresses = [ new ContactField( 'work', branchObj.address ) ];
			contactDataObj.emails = [ new ContactField( 'work', branchObj.email ) ];
			contactDataObj.urls = [ new ContactField( 'website', branchObj.website ) ];
			contactDataObj.note = branchObj.afterhours_notes;
			
			console.log('new contact data', contactDataObj);
			
			//return contact info obj
			return contactDataObj;
				
		},
		
		/* ------------------------------------------------------------------------------ */
		//function - getPageContent
		getPageContent: function(targetURL){
			
			//vars
			var thisObj = this,										//ref to data obj
				request,											//request status
				url = targetURL;									//request url
						
			//abort if no url or in request already
			if (!url || this.inRequest) return false;
			
			//otherwise set in request status and show loader
			this.inRequest = true;
			//App.utils.popmsg( 'show', {} );
			
			//make request call			
			request = $.ajax({
				url:		url,
				dataType:	'text',
				cache:		false,
				success:	function(data, textStatus, jqXHR) {  
								//alert('getPageContent: success');
								console.log('getPageContent: success');
								console.log(data);
								$('body').append(data);
							},
				complete:	function(jqXHR, textStatus) { 
								//alert('getPageContent: complete');
								console.log('getPageContent: complete');
								thisObj.inRequest = false;
								//hide loader
								//App.utils.popmsg(); 
							},
				error:		function(jqXHR, textStatus, errorThrown) { 
								//alert('getPageContent: error', textStatus, errorThrown);
								console.log('getPageContent: error', textStatus, errorThrown);
							}
			});
									
		},
					
		/* ------------------------------------------------------------------------------ */
		//function - init data obj
		init: function() {
			
			//alert('app.data.init()');
			
			//getPageContent test
			//this.getPageContent('{pageURL}');
			
		}
			
	}
	
	return App;
	
})(window.App);
