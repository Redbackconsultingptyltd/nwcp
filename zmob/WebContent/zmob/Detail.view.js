sap.ui.jsview("zmob.Detail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zmob.Detail
	*/ 
	getControllerName : function() {
		return "zmob.Detail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zmob.Detail
	*/ 
	createContent : function(oController) {
		
		var oControls = [];
		var oObjecthead = new sap.m.ObjectHeader({
			id: this.createId("detail-head"),
			title: "Address Type",
			intro: "Intro",
			attributes: [
							new sap.m.ObjectAttribute({
														id:this.createId("detail-head-from"),
														text: { 
																path: "FROM",
																formatter: "sap.app.formatter.date"
															  }
													}),
						    new sap.m.ObjectAttribute({
						    							id:this.createId("detail-head-to"),
														text: {
																path:"TO",
																formatter: "sap.app.formatter.date"
															  }
													}),
													
						],
		     firstStatus: new sap.m.ObjectStatus({
		    	 									id:this.createId("detail-head-status"),
		    	 									text:"Active",
		    	 									//text: {
		    	 										//	text:"Neu",
		    	 											//formatter: "sap.app.formatter.statusState"
		    	 										   //}
		     									})
		});

		var iconBar = new sap.m.IconTabBar({
						id: this.createId("detail-tabs"),
						expanded: "{device>isNoPhone}",
						items: [ new sap.m.IconTabFilter({
												  		id: this.createId("detail-tab-info"),
												  		text: "Additional Info",
												  		icon: "sap-icon://supplier",
													})
						],
				  		content:  new sap.ui.commons.form.SimpleForm({
		  		        	  											id: this.createId("detail.tab-info-form"),
		  		        	  											minWidth: 1024,
		  		        	  											content: [
		  		        	  											          	//GRoup Title
		  		        	  											          	new sap.ui.commons.Title({
		  		        	  											          		id:this.createId("detail-tab-info-form-info"),
		  		        	  											          		text: "Information"
		  		        	  											          	}),
		  		        	  											          	// From Label 
		  		        	  											          	new sap.ui.commons.Label({
		  		        	  											          								id:this.createId("detail-tab-info-form-info-lblfrom"),
		  		        	  											          								text:"From"
		  						  		        	            					}),
		  						  		        	            					new sap.ui.commons.TextField({
		  						  		        	            													id:this.createId("detail-tab-info-form-info-from"),
		  						  		        	            													value: "{FROM}"
		  						  		        	            					}),
		  		          	  
		  												      
		  						  		        	            					// TO LAbel
		  						  		        	            					new sap.ui.commons.Label({
		  						  		        	            												id:this.createId("detail-tab-info-form-info-lblto"),
		  						  		        	            												text:"To"
		  						  		        	            					}),
		  						  		        	            					new sap.ui.commons.TextField({
		  						  		        	            													id:this.createId("detail-tab-info-form-info-to"),
		  						  		        	            													value: "{TO}"
		  						  		        	            					})
		  		        	  											]
					})
		});
		//var label1 = new sap.m.Label({id:this.createId("lbl1"),text:"Address Type"});
		
		//var txt1 = new sap.m.Text({id:this.createId("txt1"),
		//							text:"{ADDRTYPE}"
			//						});
		
		//oControls.push(label1,txt1);
		
		// Register to before show
		this.addEventDelegate({
            onBeforeShow: function(evt) {
            	debugger;
                this.setBindingContext(evt.data.context); // give this (= the View) as additional parameter to make it available inside the delegate's functions as "this" object
            }
        }, this);
		

	
		oControls.push(oObjecthead,iconBar);
 		return new sap.m.Page({
			title: "{i18n>DetailTitle}",
			showNavButton: "{device>/isPhone}",
			content: oControls,
			footer: new sap.m.Bar({
				id: this.createId("detail-footer"),
				contentRight: new sap.m.Button({
					id: this.createId("detail-footer-appr"),
					text: "{i18n>ApproveButtonText}",
					icon: "sap-icon://accept",
					press: oController.handleApprove
				})
			})
		});
	},
	
//	onBeforeShow: function(evt){
	//	debugger;
		//this.setBindingContext(evt.data.context);
	//}

});