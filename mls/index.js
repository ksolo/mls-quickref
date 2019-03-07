(function() {
  // functions are coupled to the DOM of the @properties MLS
  // changes to the DOM will break these functions
  function getAddress() {
    const addressNode = document.getElementsByClassName("pl-head-address")[0];

    if (addressNode) {
      return addressNode.textContent.replace(/[\s*]/g,' ').trim();
    }
    return "Chicago, IL";
  }

  function getPrice() {
    const priceRegexp = /[\$,]/g;
    const priceNode = document.getElementsByClassName("rc-price")[0];

    if (priceNode) {
      return parseInt(priceNode.textContent.trim().replace(priceRegexp, ''));
    }
    return 0;
  }

  function getAssociationFees() {
    const labelText = "Assess / Assoc Fee:"
    const tableRow = getRowWithText(labelText);

    return dollarAmountFromText(tableRow.textContent)
  }

  function getTaxes() {
    const labelText = "Total Taxes";
    const tableRow = getRowWithText(labelText);

    if (tableRow) {
      return dollarAmountFromText(tableRow.textContent)
    }
    return 0;
  }

  function getRowWithText(text) {
    const tableIndex = 1;
    const mainInfoClass = "detail-main-info-section";
    const table = document.getElementsByClassName(mainInfoClass)[tableIndex];

    const tableRows = Array.from(table.getElementsByTagName("tr"));
    return tableRows.find(row => row.textContent.match(text));
  }

  function dollarAmountFromText(text) {
    const priceRegexp = /\$(\d{1,3}[,\d{1,3}]{0,}\.?\d{0,2})/
    const matches = text.match(priceRegexp);

    if (matches) {
      return parseFloat(matches[1].replace(/,/g, ''));
    }
    return 0;
  }

  const listing = {
    address: getAddress(),
    price: getPrice(),
    associationFees: getAssociationFees(),
    taxes: getTaxes()
  }

  console.log(listing);

  chrome.storage.local.set({listing});
})();
