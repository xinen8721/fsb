var eventConfig;
var targetSKU;
var cartTabId;
var pendingOrder = false;
console.log('i am loaded');

var isFLFamRule = {
	conditions: [
		new chrome.declarativeContent.PageStateMatcher({
			css: ["form#product_form"]
		})
	],
	actions: [ new chrome.declarativeContent.ShowPageAction() ]
};

var isFLMobileRule = {
	conditions: [
		new chrome.declarativeContent.PageStateMatcher({
			css: ["div#pdp_info"]
		})
	],
	actions: [ new chrome.declarativeContent.ShowPageAction() ]
};


chrome.runtime.onInstalled.addListener(function() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([isFLFamRule, isFLMobileRule])
	});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch(request.action) {
    case 'getSKU':
      targetSKU = request.source;
      fireWhenReady();
      break;
    case 'getFormData':
      console.log('i am a request for data');
      sendResponse({ sku: targetSKU, size: eventConfig.size, dropTime: eventConfig.time });
      break;
    case 'addedToCart':
      console.log('attempting to process checkout');
      pendingOrder = true;
      chrome.tabs.executeScript(cartTabId, { file: 'assets/scripts/move_to_checkout.js' });
      break;
    case 'movedToCheckout':
      console.log('adding card id and completing order');
      break;
    case 'getCardId':
      console.log('id requested');
      sendResponse({ id: eventConfig.securityId, pendingOrder: pendingOrder });
      pendingOrder = false;
      break;
    case 'registerCart':
      console.log('we found a new cart!');
      cartTabId = sender.tab.id;
      break;
    case 'registerCheckout':
      console.log('made it to checkout');
      chrome.tabs.executeScript(sender.tab.id, { file: 'assets/scripts/complete_order.js' });
      break;
    default:
      eventConfig = request;
      fireWhenReady()
  }
});

var fireWhenReady = function() {
  if (eventConfig != null && targetSKU != null) {
    console.log("I will add to cart now");
    chrome.tabs.query({active:true,currentWindow:true}, function(tabs) {
      var active = tabs[0].id;
      console.log('i am executing a script');
      chrome.tabs.executeScript(null, { file: "assets/config/jquery-2.1.4.min.js" }, function() {
        chrome.tabs.executeScript(active, { file: 'assets/scripts/add_to_cart.js' })
      })
	  });

  } else {
    console.log("I am not ready yet");
  }
};
