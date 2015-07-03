var theId;

console.log('attempting to complete order');
chrome.extension.sendMessage(
	{ action: "getCardId" },
    function(response) {
    	if (response.pendingOrder) {
    		theId = response.id;
    	}
    }
);

var countOrDoIt = function() {
	var omgLoop = setInterval(function() {
		if (theId != null) {
			console.log("ready");
			clearInterval(omgLoop);
			var idDiv = document.getElementById('payMethodPaneStoredCCCVV');
			idDiv.value = theId;
			console.log('IT WORKED');
			var submitButton = document.getElementById('orderSubmit');
			submitButton.click(function() {
				console.log('it was clicked')
			})
		} else {
			console.log("not ready...")
		};
	}, 100);
};

document.onreadystatechange = countOrDoIt();
