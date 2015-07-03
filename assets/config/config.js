$('#submitConfig').on('click', function() {
	var time = $('#dropTime').val();
	var size = $('#sizeSelector').val();
	var securityId = $('#securityId').val();
	sendForm(time, size, securityId);
});

var sendForm = function(time, size, securityId) {
	var formData = { "time": time, "size": size, "securityId": securityId };
  	var productTab;

	chrome.tabs.query({active:true,currentWindow:true}, function(tabs) {
    	productTab = tabs[0].id;
    	chrome.tabs.executeScript(productTab, { file: 'assets/scripts/sku_div.js' });
	});

	chrome.runtime.sendMessage(
		formData,
		function(response) {
      // var cartUrl = "http://m.footlocker.com/?uri=cart";
      // var cartTab = chrome.tabs.create({ url: cartUrl });
      // console.log(cartTab);
			// console.log(document.all[0].outerHTML);
		}
	)
};
