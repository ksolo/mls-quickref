(function() {
  let address = setAddress();
  let price = setPrice();

  function setAddress() {
    const addressNode = document.getElementsByClassName("pl-head-address")[0];
    return addressNode.textContent.replace(/[\s*]/g,' ').trim();
  }

  function setPrice() {
    const priceRegexp = /[\$,]/g
    const priceNode = document.getElementsByClassName("rc-price")[0];
    return parseInt(priceNode.textContent.trim().replace(priceRegexp, ''));
  }

  let listing = { address, price }

  chrome.storage.local.set({"location": listing});
})();
