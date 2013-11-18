sap.ui.controller("zui5bsp.main", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zui5bsp.main
*/
	onInit: function() 
	{
		var oModel = new sap.ui.model.json.JSONModel();
    	sap.ui.getCore().setModel(oModel,"MainModel");

	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zui5bsp.main
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zui5bsp.main
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zui5bsp.main
*/
//	onExit: function() {
//
//	}

	doIt : function(oEvent) 
	{ 
		alert(oEvent.getSource().getId() + " does it!"); 
		//var URL = 'http://cbr1saps01.internal.dotars.gov.au:8000/sap/bc/bsp/sap/zui5bspdata/index2.htm';
    	//var data = null;
    	
		//var URL = 'http://cbr1saps01.internal.dotars.gov.au:8000/sap/bc/bsp/sap/zui5bspdata/address.htm';   
		var URL	=	'http://cbr1saps01.internal.dotars.gov.au:8000/zdoit/zui5/';
    	var data = '{"ROOT":{"EMPLOYEENUMBER":"53723288"}}';    	
    	$.ajax(
    	{ 
			 type: 'POST', 
			 url: URL,
			 data: data,
			 dataType: 'json',
			 cache: false,
			 contentType: "application/json; charset=\"utf-8\"",
			 beforeSend: function( xhr ){
				// Set up any header data .
				//	xhr.setRequestHeader(<name>,<value>);
				 return;
				},			 
			 success: function(data) {
				 //alert(data);
				 //var oJSONData = new sap.ui.model.json.JSONModel();
				 //oJSONData.setData(data, false);
				 //alert(oJSONData.getJSON());
//				 var oModel = sap.ui.getCore().getModel("MainModel");
	//			 oModel.setData(data,true);
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(data,false);
					//alert(oModel.getJSON());
			    	//sap.ui.getCore().setModel(oModel,"MainModel2");
					sap.ui.getCore().setModel(oModel);
				 
			 }
		});
	}
});