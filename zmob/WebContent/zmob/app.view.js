sap.ui.jsview("zmob.app", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zmob.app
	*/ 
	getControllerName : function() {
		return "zmob.app";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zmob.app
	*/ 
	createContent : function(oController) {
		
		// to avoid scroll bars on desktop the root view must be set to block display
		//this.setDisplayBlock(true);
		// create app
		this.app = new sap.m.SplitApp();
		// load the master page
		var master = sap.app.viewCache.get("Master");
		//var master = sap.ui.view({id : "Master", viewName : "zmob.Master", type : sap.ui.core.mvc.ViewType.JS});
		master.getController().nav = this.getController();
		this.app.addPage(master, true);

		// load the detail page
		var detail = sap.app.viewCache.get("Detail");
		this.app.addPage(detail, false);
		
		
		// load the empty page
		var empty = sap.app.viewCache.get("Empty");
		this.app.addPage(empty, false);

		this.app.setInitialDetail("Empty");

		// wrap app with shell
		return new sap.m.Shell("Shell", {
		title : "{i18n>ShellTitle}",
//			title : "ShellTitle",
		showLogout : false,
		app : this.app
		});
	}

});