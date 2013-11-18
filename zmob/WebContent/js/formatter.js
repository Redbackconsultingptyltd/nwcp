jQuery.sap.declare("sap.app.formatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");
sap.app.formatter = {
						_statusStateMap : {
											"Neu" : "Warning",
											"Initial" : "Success"
										},
						statusState : function (value) {
															var map = sap.app.formatter._statusStateMap;
															return (value && map[value]) ? map[value] : "None";
														},
						date : function (value) {
													if (value) {
																	var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
																		pattern: "yyyy-MM-dd"});
																	return oDateFormat.format(new Date(value));
																} 
													else {
															return value;
														}
						}
};