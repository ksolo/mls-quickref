(function() {
  function getAddress() {
    const addressNode = document.getElementsByClassName("pl-head-address")[0];

    if (addressNode) {
      return addressNode.textContent.replace(/[\s*]/g,' ').trim();
    }
    return "Chicago, IL";
  }

  function getPrice() {
    const priceRegexp = /[\$,]/g
    const priceNode = document.getElementsByClassName("rc-price")[0];

    if (priceNode) {
      return parseInt(priceNode.textContent.trim().replace(priceRegexp, ''));
    }
    return 0;
  }

  const listing = {
    address: getAddress(),
    price: getPrice()
  }

  chrome.storage.local.set({listing});
})();
