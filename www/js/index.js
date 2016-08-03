
var app = {
  
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
	$.getScript('http://op.genesisgo.us/ar/ar2.js');
    },

    receivedEvent: function(id) {}
};

app.initialize();
