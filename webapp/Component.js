sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
<<<<<<< HEAD
	"xyxxxxxxx/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("xyxxxxxxx.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

=======
	"z_tanyaz_tanya/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("z_tanyaz_tanya.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			this._oRouter.initialize();
>>>>>>> branch 'main' of https://github.com/tanyashroff00/SAPUI5.git
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});
