jQuery.sap.require("sap.ui.core.IconPool");
function getRandomIcon() {
	if (!getRandomIcon._allIcons) {
		getRandomIcon._allIcons = [];
		
        var aNames = sap.ui.core.IconPool.getIconNames();
        for(i = 0; i < aNames.length ; ++i) {
        	getRandomIcon._allIcons.push(sap.ui.core.IconPool.getIconURI(aNames[i]));
        }
	}

	var a = getRandomIcon._allIcons;
    var l = a.length;
    
    return a[Math.floor(Math.random() * l)];
};

sap.ui.jsview("zmenu.app", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zmenu.app
	*/ 
	getControllerName : function() {
		return "zmenu.app";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zmenu.app
	*/ 
	createContent : function(oController) {
		//Create SearchFiled Control 
		//Attention: Which control should be used in future is not yet clear. Here changes could happen!
		var oSF = new sap.ui.commons.SearchField({
			search: function(oEvent){
				alert("Search triggered: " + oEvent.getParameter("query"));
			},
			width: "95%",
			enableListSuggest: false
		});
		oSF.addStyleClass("mySearchField");
		
		
		//Initialize the basic Shell control 
		var oShell = new sap.ui.unified.Shell({
			icon: jQuery.sap.getModulePath("sap.ui.core", '/') + "mimes/logo/sap_73x36.gif",
			search: oSF,
			paneContent: new sap.ui.commons.TextView({text: "Here should come the side pane content ..."}),
			itemSelect: function(oEvent){
				var oItem = oEvent.getParameter("item");
				if(oItem.getItems().length != 0){
					oEvent.preventDefault();
					return;
				}
				oShell.destroyContent();
				var newContent = new sap.ui.commons.TextView({text: "This is the content for item '"+oItem.getTitle()+"' (Key: '"+oItem.getKey()+"')"});
				oShell.addContent(newContent);
				oShell.setSelectedHeadItem(null); //Show the content area 
			}
		});
		oShell.addNavContent(new sap.ui.unified.ShellNavigationTree({itemProvider : oShell}));
		oShell.placeAt("content");
		
		
		//Initialize the HeaderItems 
		var itm = new sap.ui.unified.ShellHeadContentItem({
			title: "Home",
			tooltip: "Home",
			icon: sap.ui.core.IconPool.getIconURI("home"),
			applyContentPadding: true,
			showHeader: true,
			fullHeightContent: true,
			content: [new sap.ui.commons.TextView({text: "Here should come the Home content ..."})]
		});
		oShell.addHeadItem(itm);
		oShell.setSelectedHeadItem(itm);
		
		itm = new sap.ui.unified.ShellHeadContentItem({
			title: "Index",
			tooltip: "Index",
			icon: sap.ui.core.IconPool.getIconURI("org-chart"),
			fullHeightContent: true,
			applyContentPadding: false,
			content: [new sap.ui.unified.ShellIndex({itemProvider: oShell})]
		});
		oShell.addHeadItem(itm);
		
		function createTile(title, icon){
			return new sap.ui.unified.IndexTile({
				title: title,
				icon: sap.ui.core.IconPool.getIconURI(icon),
				press: function(){
					alert("Settings option '"+title+"' triggered");
				}
			});
		};
		
		itm = new sap.ui.unified.ShellHeadContentItem({
			title: "User Settings",
			tooltip: "User Settings",
			icon: sap.ui.core.IconPool.getIconURI("settings"),
			fullHeightContent: true,
			applyContentPadding: false,
			content: [new sap.ui.unified.IndexLayout({
				content: [
					new sap.ui.unified.IndexTile({
						title: "My Profile",
						icon: sap.ui.core.IconPool.getIconURI("employee"),
						press: function(){
							oCustDialog.open();
						}
					}),
					createTile("Settings", "settings"),
					createTile("Account", "laptop"),
					createTile("Help Center", "sys-help"),
					createTile("Log Out", "log")
				]
			})]
		});
		oShell.addHeadItem(itm);
		
		var oActionPopup = new sap.ui.unified.ShellActionPopup({
			title: "Actions",
			actions: [
				new sap.ui.unified.ShellItem({
					title: "Share",
					icon: "sap-icon://share-2",
					key: "Actions-Share"
				}),
				new sap.ui.unified.ShellItem({
					title: "Comment",
					icon: "sap-icon://notification-2",
					key: "Actions-Comment"
				}),
				new sap.ui.unified.ShellItem({
					title: "Tag",
					icon: "sap-icon://attachment",
					key: "Actions-Tag"
				}),
				new sap.ui.unified.ShellItem({
					title: "Print",
					icon: "sap-icon://print",
					key: "Actions-Print"
				}),
				new sap.ui.unified.ShellItem({
					title: "Logout",
					icon: "sap-icon://log",
					key: "Actions-Logout"
				})
			],
			select: function(oEvent){
				alert("Action with key '"+oEvent.getParameter("item").getKey()+"' selected.");
			}
		});
		
		itm = new sap.ui.unified.ShellHeadItem({
			title: "Actions",
			tooltip: "Actions",
			icon: sap.ui.core.IconPool.getIconURI("action"),
			press: function(){
				oActionPopup.open();
			},
			startsSection: true
		});
		oShell.addHeadItem(itm);
		
		
		//Initialize the Navigation 
		
		//--Index 
		
		var oData = {
			items: [
				{title: "Employee Self Service", icon: getRandomIcon(), key: "Index-ESS", items: [
					{title: "Overview", icon: getRandomIcon(), key: "Index-ESS-Overview", items: []},
	                {title: "Time Recoding", icon: getRandomIcon(), key: "Index-ESS-TimeRec", items: []},
	                {title: "Create Leave Request", icon: getRandomIcon(), key: "Index-ESS-LeaveCreate", items: []}  
				]},
				{title: "Sales", icon: getRandomIcon(), key: "Index-Sales", items: [
					{title: "Sales Orders Overview", icon: getRandomIcon(), key: "Index-Sales-Orders", items: []},
	                {title: "Opportunities", icon: getRandomIcon(), key: "Index-Sales-Opp", items: []},
	                {title: "Create Sales Order", icon: getRandomIcon(), key: "Index-Sales-OrderCreate", items: []},
	                {title: "Approve Sales Order", icon: getRandomIcon(), key: "Index-Sales-OrderApprove", items: []}    
				]}
			]	
		};
		
		jQuery.sap.require("sap.ui.model.json.JSONModel");
		var oNavModel = new sap.ui.model.json.JSONModel();
		oNavModel.setData(oData);
		
		var oItemTemplate = new sap.ui.unified.ShellItem({
			title: "{title}",
			icon: "{icon}",
			key: "{key}",
			description: {
		        path: "title",
		        formatter: function(sTitle) {	
		            return "Description of item '"+sTitle+"'";
				}
			}
		});
		oItemTemplate.bindAggregation("items", "items", oItemTemplate);
		
		var oCat = new sap.ui.unified.ShellItemCategory({
	        title: "Index",
	        description : "The navigation index"
		});
		oCat.setModel(oNavModel);
		oCat.bindAggregation("items", "/items", oItemTemplate);
		oShell.addItem(oCat);
		
		//--Recent Items 
		
		function createCustNavItems(keyPrefix, bInvers, showIcon){
			var aTitles = ["Material Shortages", "Overdoue Supply", "Production Order", "Leave Overview", "Create Leave Request",
			               "Customer Demand", "Time Statement", "Purchase Order", "Approve Leave Request", "Human Resources"];
			var aItems = [];
			var ico = 1;
			
			function newItem(title){
				var oItem = new sap.ui.unified.ShellItem({
					title: title,
					description: "Description of item '"+title+"'",
					key: keyPrefix + "-" + title
				});
				if(showIcon){
					oItem.setIcon("../images/shellexample/appPreview"+ico+".png");
				}
				aItems.push(oItem);
				ico++;
				if(ico > 3){
					ico = 1;
				}
			}
			
			if(bInvers){
				for(var i=aTitles.length-1; i>=0; i--){
					newItem(aTitles[i]);
				}
			}else{
				for(var i=0; i<aTitles.length; i++){
					newItem(aTitles[i]);
				}
			}
			
			return aItems;
		};
		
		oCat = new sap.ui.unified.ShellItemCategory({
	         title: "Recent Items",
	         description : "The recently used items",
	         items: createCustNavItems("Recent", false, true)
	    });
		oShell.addItem(oCat);
		
		//--Frequently used 
		
		oCat = new sap.ui.unified.ShellItemCategory({
	         title: "Frequently Used",
	         description : "The frequently used items",
	         items: createCustNavItems("Frequent", true, true)
	    });
		oShell.addItem(oCat);
		
		//--Favorites 
		
		oCat = new sap.ui.unified.ShellItemCategory({
	         title: "Favorites",
	         description : "The favorite items",
	         items: createCustNavItems("Favorite", false, false)
	    });
		oShell.addItem(oCat);
		
		
		//Customization (Just a Prototype!) 
		
		var predef = [
			[null, null, true],
			["7F9E4C", "../images/shell/custombg1.jpg", true],
			["DEB252", "../images/shell/custombg2.jpg", true],
			[null, "../images/shell/custombg3.jpg", false]
		];
		var idx = 0;
		var current = predef[idx];
		var skip = false;
		
		function change(iIdx, oVal){
			if(skip){
				return;
			}
			if(iIdx >= 0){
				current[iIdx] = oVal;
			}
			oShell._customize(current[0], current[1], current[2]);
		};
		
		var oBg = new sap.ui.commons.TextField({
			width: "90%",
			change: function(oEvent){
				change(1, oEvent.getParameter("newValue"));
			}
		});
		
		var oInvert = new sap.ui.commons.CheckBox({
			checked: true,
			change: function(oEvent){
				change(2, !!oEvent.getParameter("checked"));
			}
		});
		oInvert.addStyleClass("Right");
		
		var oColor = new sap.ui.commons.ColorPicker({
			colorString : "7F92AB",
			liveChange : function(oEvent){
				change(0, oEvent.getParameter("hex"));
			}
		});
		
		var oPredef = new sap.ui.commons.Button({
			text: "Predefined Skins",
			press: function(){
				idx = idx >= 3 ? 0 : idx+1;
				current = predef[idx];
				change(-1);
				
				skip = true;
				oColor.setColorString(current[0] || "7F92AB");
				oBg.setValue(current[1]);
				oInvert.setChecked(!!current[2]);
				skip = false;
			}
		});
		
		var oCustDialog = new sap.ui.commons.Dialog({
			resizable: false,
			modal: true,
			title: "Customize",
			content: [oColor, oBg, oInvert, oPredef]
		});

	}

});
