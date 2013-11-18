sap.ui.jsview("zui5bsp.main", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zui5bsp.main
	*/ 
	getControllerName : function() {
		return "zui5bsp.main";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zui5bsp.main
	*/ 
	createContent : function(oController) {
		var aControls = []; 
		var oButton = new sap.ui.commons.Button({ id : this.createId("MyButton"), text : "Get Address" }); 
		//aControls.push(oButton.attachPress(oController.doIt)); return aControls;
		oButton.attachPress(oController.doIt); 
		
		
	      // Add a table to display 
  	  var oTable = new sap.ui.table.Table({title:"MyTable", 
  		  									visibleRowCount:7,
  		  									selectionMode:sap.ui.table.SelectionMode.Single
  	  										});
  	  
  	  var mytoolbar = 
//  	  toolbar: new sap.ui.commons.toolbar({ id: "MyToolbar",
  	  new sap.ui.commons.Toolbar({ id: "MyToolbar",
					items:[
						new sap.ui.commons.TextField({id:"iEmployeeNumber"})
					]
				});
  	  var lblEmployeeNumber = new sap.ui.commons.Label({text:"EmployeeNumber"});
  	  lblEmployeeNumber.setLabelFor(sap.ui.getCore().getControl("iEmployeeNumber"));
  	  mytoolbar.addItem(lblEmployeeNumber);

  	  oTable.setToolbar(mytoolbar);
  	  var myButton = new sap.ui.commons.Button({text:"Get Address List"});
  	  myButton.attachPress(oController.doIt);
  	  mytoolbar.addItem(myButton);
  	  
  	  // Setup the columns now
  	  oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text:"Address Type"}),
  			  									template:new sap.ui.commons.TextField().bindProperty("value","ADDRTYPE"),
  			  									sortProperty:"ADDRTYPE",
  			  									filterProperty:"ADDRTYPE",
  			  									width:"100px"
  	  											})
  	  					);

  	  oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text:"Valid From"}),
														template:new sap.ui.commons.TextField().bindProperty("value","FROM"),
														sortProperty:"FROM",
														filterProperty:"FROM",
														width:"200px"
  	  											})
  	  					);  	 
  	  oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text:"Valid To"}),
													template:new sap.ui.commons.TextField().bindProperty("value","TO"),
													sortProperty:"TO",
													filterProperty:"TO",
													width:"200px"
  	  											})
  	  
  	  					);
  	  //oTable.bindRows("MainModel2>/ROOT/ADDRESSES");
  	  oTable.bindRows("/ROOT/ADDRESSES");
  	  aControls.push(oTable);
  	  return aControls;
		
		
		
		
	}

});
