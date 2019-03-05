(function() {
  let address = setAddress();
  let price = setPrice();

  function setAddress() {
    const addressNode = document.getElementsByClassName("pl-head-address")[0];

    if (addressNode) {
      return addressNode.textContent.replace(/[\s*]/g,' ').trim();
    }
    return "";
  }

  function setPrice() {
    const priceRegexp = /[\$,]/g
    const priceNode = document.getElementsByClassName("rc-price")[0];

    if (priceNode) {
      return parseInt(priceNode.textContent.trim().replace(priceRegexp, ''));
    }
    return 0;
  }

  let listing = { address, price }

  chrome.storage.local.set({"listing": listing});
})();
