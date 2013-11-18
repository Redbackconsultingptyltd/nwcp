jQuery.sap.registerModulePath('app', 'js');

jQuery.sap.require("app.config");
jQuery.sap.require("app.viewcache");
jQuery.sap.require("app.utility");
jQuery.sap.require("app.formatter");

// Internationalization:        
// create global i18n resource bundle for texts in application UI        
var i18n = new sap.ui.model.resource.ResourceModel({
				bundleUrl : "i18n/messageBundle.properties",
				locale : sap.ui.getCore().getConfiguration().getLanguage()
				});        
sap.ui.getCore().setModel(i18n, "i18n");

//set device model
var deviceModel = new sap.ui.model.json.JSONModel({
isPhone : jQuery.device.is.phone,
isNoPhone : ! jQuery.device.is.phone,
listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
});
deviceModel.setDefaultBindingMode("OneWay");
sap.ui.getCore().setModel(deviceModel, "device");

//instantiate initial view
sap.ui.localResources(sap.app.config.viewNamespace);
sap.app.viewCache.get("app").placeAt("content");

