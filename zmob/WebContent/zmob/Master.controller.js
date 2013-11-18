sap.ui.controller("zmob.Master", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zmob.Master
*/
	onInit: function() {
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
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zmob.Master
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zmob.Master
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zmob.Master
*/
//	onExit: function() {
//
//	}

	onSelect: function(oEvent)
	{
		//var context = oEvent.getSource.getBindingContext(); 
		//alert(context);
//		sap.m.MessageBox.alert("test msg box");
	//	sap.m.MessageToast.show("test msg toast");
		var appView = sap.app.viewCache.get("app");
		appView.app.to("Detail",{context:oEvent.getParameter("listItem").getBindingContext()});
	},

	onPress: function(oEvent)
	{
		//var context = oEvent.getSource.getBindingContext(); 
		//alert(context);
//		sap.m.MessageBox.alert("test msg box");
	//	sap.m.MessageToast.show("test msg toast");
		
		var appView = sap.app.viewCache.get("app");
		appView.app.to("Detail",{context:this.getBindingContext()});
	},

	
	// Search Handler:
	handleSearch : function (evt) 
	{
		debugger;
		// create model filter
		var filters = [];
		var query = evt.getParameter("query");
		if (query && query.length > 0) {
			var filter = new sap.ui.model.Filter("ADDRTYPE", sap.ui.model.FilterOperator.Contains,query);
			filters.push(filter);
		}
		// update list binding
		sap.app.viewCache.get("Master").byId("mList").getBinding("items").filter(filters);
		//var list =	sap.ui.getCore().byId("mList");
		//var lst = vi.byId("mList");
		//var binding = lst.getBinding("items");
		//binding.filter(filters);
	}
		

});