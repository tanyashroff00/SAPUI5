sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/Fragment",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(jQuery, Fragment, Controller, JSONModel) {
	"use strict";
	var JsonDataModel = new sap.ui.model.json.JSONModel();
	return Controller.extend("z_tanyaz_tanya.controller.Form", {

		onInit: function() {

			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("Form");
			this._oRouter.getRoute("EditPath").attachPatternMatched(this.EditVisitorDetails, this);
			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZUI_CRUD_SRV/", true);
			oModel.read("/ZVISITORSet", {
				success: function(oData) {
					JsonDataModel.setData(oData.results);
				}
			});
		},

		EditVisitorDetails: function(oEvent) {
			var vname = this.getView().byId("vname");
			var cname = this.getView().byId("cname");
			var mnum = this.getView().byId("mnum");
			var dep = this.getView().byId("dep");
			var email = this.getView().byId("email");
			var vId = oEvent.getParameters("arguments");
			this.vId = vId;

			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZUI_CRUD_SRV/", true);
			oModel.read("/ZVISITORSet('" + vId.arguments.VisitorID + "')", {
				success: function(odata, oResponse) {
					debugger;
					vname.setValue(odata.Name);
					cname.setValue(odata.CompName);
					mnum.setValue(odata.MobileNo);
					dep.setValue(odata.Dept);
					email.setValue(odata.Email);
				},
				error: function() {
					debugger;
				}
			});
		},
		Save: function(evt) {
			var selectedId = 0;
			var newRating = sap.ui.getCore().byId("DataList").getSelectedItems()[0].getSelectedItem().getText();
			if (sap.ui.getCore().byId("DataList").getSelectedItems()[0].getText() != "") {
				selectedId = sap.ui.getCore().byId("DataList").getSelectedItems()[0].getText();
			}
			var oEntry = {};
			oEntry.Rating = newRating;
		},
		savebtn: function() {
			var that = this;
			var vname = this.getView().byId("vname").getValue();
			var cname = this.getView().byId("cname").getValue();
			var mnum = this.getView().byId("mnum").getValue();
			var dep = this.getView().byId("dep").getValue();
			var email = this.getView().byId("email").getValue();

			if (this.vId !== undefined) {
				for (var i = 0; i < JsonDataModel.getData().length; i++) {
					if (this.vId.arguments.VisitorID === JsonDataModel.getData()[i].Userid) {
						this.EditUser = true;
						break;
					} else {
						this.EditUser = false;
					}
				}
			} else {
				this.EditUser = false;
			}
			if (this.EditUser === true) {
				var Items = {
					"Userid": this.vId.arguments.VisitorID,
					"Name": vname,
					"CompName": cname,
					"MobileNo": mnum,
					"Dept": dep,
					"Email": email

				};
				this.getView().getModel().update("/ZVISITORSet(Userid='" + this.vId.arguments.VisitorID + "')", Items, {
					method: "put",
					success: function(odata, oResponse) {
						debugger;
						that._oRouter.navTo("Dashboard");

					},
					error: function(error) {
						debugger;
					}
				});
			} else {
				var uid = parseInt(JsonDataModel.getData()[JsonDataModel.getData().length-1].Userid,10) + 1;
				var Items = {
					"Userid": uid.toString(),
					"Name": vname,
					"CompName": cname,
					"MobileNo": mnum,
					"Dept": dep,
					"Email": email
				};
				this.getView().getModel().create("/ZVISITORSet", Items, {
					success: function(odata, oResponse) {
						that._oRouter.navTo("Dashboard");
					},
					error: function(error) {}
				});
			}
		},

		onClickToDashboard: function() {
			this._oRouter.navTo("Dashboard");
		},
		cancelbtn: function() {
			this.getView().byId("vname").setValue("");
			this.getView().byId("cname").setValue("");
			this.getView().byId("mnum").setValue("");
			this.getView().byId("dep").setValue("");
			this.getView().byId("email").setValue("");
		}
	});
});