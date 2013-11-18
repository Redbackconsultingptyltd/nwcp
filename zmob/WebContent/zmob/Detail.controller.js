jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("zmob.Detail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zmob.Detail
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zmob.Detail
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zmob.Detail
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zmob.Detail
*/
//	onExit: function() {
//
//	}

	// Navigation back.
	handleNavButtonPress : function (evt) {
		this.nav.back("Master");
		},
		
	// Approve Handler
	handleApprove : function (evt) {
		// show confirmation dialog
		var bundle = sap.ui.getCore().getModel("i18n").getResourceBundle();
		sap.m.MessageBox.confirm(
				bundle.getText("ApproveDialogMsg"),
				function (oAction) {
					if (sap.m.MessageBox.Action.OK === oAction) {
						// notify user
						var successMsg = bundle.getText("ApproveDialogSuccessMsg");
						sap.m.MessageToast.show(successMsg);
						// TODO call proper service method and update model (not part of this session)
					}
				},
				bundle.getText("ApproveDialogTitle")
		);
	}
});