var movedToCheckout = function() {
	chrome.extension.sendMessage({ action: 'movedToCheckout' })
};

console.log('blast dat cart');
document.getElementById('cart_bottom').firstElementChild.firstElementChild.click(function() {
	movedToCheckout()
});