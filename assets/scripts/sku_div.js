chrome.extension.sendMessage({
    action: "getSKU",
    source: document.getElementById('pdp_selectedSKU').value
});