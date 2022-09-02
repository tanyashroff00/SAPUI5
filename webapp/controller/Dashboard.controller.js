sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment",
	"sap/ui/model/Sorter"
], function(Controller, JSONModel, Filter, FilterOperator, Fragment, Sorter) {
	"use strict";
	var JsonDataModel = new sap.ui.model.json.JSONModel();
	return Controller.extend("z_tanyaz_tanya.controller.Dashboard", {

		onInit: function() {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("Dashboard");
			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZUI_CRUD_SRV/", true);
			var that = this;
			oModel.read("/ZVISITORSet", {
				success: function(oData) {
					JsonDataModel.setData(oData.results);
					that.getView().byId("DataList").setModel(JsonDataModel, "JsonDataModel");
				}
			});
		},

		onClickForm: function() {
			this._oRouter.navTo("Form");
		},
		onClickPrint: function() {
			window.print();
		},
		onClickNewForm: function() {
			this._oRouter.navTo("Form");
		},
		onSearch: function(oEvent) {

			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("Name", FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			var oList = this.byId("DataList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters, "Application");
		},

		ONNAVTO: function(oEvent) {
			var objId = oEvent.getSource().getBindingContext("JsonDataModel").getObject();
			this._oRouter.navTo("EditPath", {
				VisitorID: objId.Userid
			});
		},

		onOpenDialog: function() {
			if (!this.DialogEx) {
				this.DialogEx = sap.ui.xmlfragment("z_tanyaz_tanya.fragment.ConfirmDialog", this);
				this.getView().addDependent(this.DialogEx);
			}
			this.DialogEx.open();
		},

		onSorting: function() {
			var oView = this.getView();
			Fragment.load({
				id: oView.getId(),
				name: "z_tanyaz_tanya.fragment.sorting",
				controller: this 
			}).then(function(DialogEx){
				DialogEx.open();
			});
		}
	});

});