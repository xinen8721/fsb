chrome.extension.sendMessage(
	{ action: "getFormData" },
    function(response) {
    	console.log(response);
    	var dropTime = new Date(parseInt(response.dropTime));
    	console.log("It is now " + new Date());
    	console.log('Release time is ' + dropTime);
    	var sku = response.sku;
    	var size = response.size;
    	sendForm(dropTime, sku, size)
    }
);

var addedToCartSuccess = function() {
	chrome.extension.sendMessage({ action: 'addedToCart' })
};

var sendForm = function(dropTime, sku, size) {
	if (dropTime == null || sku == null || size == null) {
		console.log('something null. droptime? ' + dropTime + '? sku? ' + sku + '? size? ' + size);
		return false
	};
	var doDrop = setInterval(function() {
		now = new Date();
		if(now >= dropTime) {
			clearInterval(doDrop);
			var url = 'http://m.footlocker.com?uri=add2cart';
			var data = {
				// "requestKey": $('#requestKey').attr('value'),
				"qty":"1",
				"size": size,
				"sku": sku, //$('#pdp_selectedSKU').attr('value'),
				"storeNumber":"00000",
				"fulfillmentType": 'SHIP_TO_HOME',
				"storeCostOfGoods": '0.00', //$('#pdp_storeCostOfGoods').attr('value'),
				"inlineAddToCart":"0",
				"coreMetricsCategory": 'blank',
				"hasXYPromo":"false",
				// "BV_TrackingTag_Review_Display_Sort": 'http://footlocker.ugc.bazaarvoice.com/8001/220684/reviews.djs?format=embeddedhtml',
				"rdo_deliveryMethod":"shiptohome",
				"inlineAddToCart":"0",
			};
			$.post(url, data, function(response) {
				addedToCartSuccess()
			});
		} else {
			console.log("Not ready...");
		}
	}, 200);
};
