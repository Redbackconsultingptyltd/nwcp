sap.ui.jsview("zmob.Master", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zmob.Master
	*/ 
	getControllerName : function() {
		return "zmob.Master";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zmob.Master
	*/ 
	createContent : function(oController) {
		var oControls = [];

		//Sub Header
		
		//var mPage = new sap.m.Page({title:"i18n>MasterTitle",});
		var subHeader = new sap.m.Bar({
										id:this.createId("Master-SubHeader"),
										contentLeft: new sap.m.SearchField({
																				id:this.createId("Master-SubHeader-Search"),
																				search: oController.handleSearch
																			})
										});
		// Setup list with columns
		var mList = new sap.m.List(
						{
							id: this.createId("mList"),
							threshold: 2,
							inset : false,
							//mode: sap.m.ListMode.None,
							mode: "{device>/listMode}",
							showUnread : true,
							scrollToLoad : true,
							headerText : "Items (5)",
							includeItemInSelection	: true,
							select : oController.onSelect,
							swipeContent : new sap.m.Button({
								text : "Swipe Button",
								type : "Accept",
								press : function(e) {
									list.swipeOut();
								}
							}),
							columns : [new sap.m.Column({
								styleClass : "name",
								hAlign : "Left",
								header : new sap.m.Label({
									text : "{i18n>List-AddrType}"
								})
							}), new sap.m.Column({
								hAlign : "Center",
								styleClass : "qty",
								popinDisplay : "Inline",
								header : new sap.m.Label({
									text : "{i18n>List-From}"
								}),
								minScreenWidth : "Tablet",
								demandPopin : true
							}),  new sap.m.Column({
								hAlign : "Right",
								styleClass : "price",
								width : "30%",
								popinDisplay : "Inline",
								header : new sap.m.Label({
									text : "{i18n>List-To}"
								}),
								footer : new sap.m.Label({
									text : "Valid End Date"
								}),
								minScreenWidth : "400px",
								demandPopin : true
							})
							]			
						}
					);

		//ColumnItemTemplate
		var template = new sap.m.ColumnListItem({
			type : sap.m.ListType.Navigation,
			unread : false,
			//tap : oContoller.onSelect,
			press : oController.onPress,
			cells : [
				new sap.m.Input({
					value : "{ADDRTYPE}",
					editable : false
				}),
				new sap.m.Input({
					value: "{FROM}",
					editable : false
					//wrapping : true
				}), 
				new sap.m.Input({
					value: "{TO}",
					editable : false						
				})
			]
		});
		//template.attachPress(oController.onSelect);
		//template.attachTap(oController.onSelect);
		//template.attachDetailPress(oController.onSelect);
		//template.attachDetailTap(oController.onSelect);
		
		//Binding 
		mList.bindAggregation("items", "/ROOT/ADDRESSES", template);
		oControls.push(subHeader,mList);
 		return new sap.m.Page({
			title: "{i18n>MasterTitle}",
			content: oControls,
			footer: new sap.m.Bar({
				id: this.createId("master-footer")
				})
			
		});
	}

});