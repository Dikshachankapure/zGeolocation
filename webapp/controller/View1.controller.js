sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/Device"

], function (Controller, Device) {
	"use strict";

	return Controller.extend("Geo.zGeolocation.controller.View1", {
		onAfterRendering: function () {

			this.geocoder = new google.maps.Geocoder();
			window.mapOptions = {
				center: new google.maps.LatLng(45, 32),
				zoom: 17,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map(this.getView().byId("map").getDomRef(), mapOptions);
			var infowindow = new google.maps.InfoWindow;
			var geocoder = new google.maps.Geocoder();
			var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

			navigator.geolocation.watchPosition(function (position) {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				var marker = new google.maps.Marker({
					map: map,
					position: pos,
					icon: iconBase + 'placemark_circle_highlight_maps.png'
				});
				infowindow.setPosition(pos);
				infowindow.setContent('Location found.');
				map.setCenter(pos);
			}, function () {
				noGeolocation('Error: The Geolocation service failed.');
			}, {
				enableHighAccuracy: true,
				maximumAge: 10e3,
				timeout: 20e3
			});

		},
		noGeolocation: function (message) {
			var opts = {
					map: map,
					position: ll(60, 105),
					content: message
				},
				info = new google.maps.InfoWindow(opts);
			map.setCenter(opts.position);
		},
		ll: function (y, x) {
			return new google.maps.LatLng(y, x);
		},

	});
});