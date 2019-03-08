(function(){
  // averages
  const apr = 4.5;
  const numberOfYears = 30;
  const downPaymentPercent = 0.20;

  function getValueElementFor(field) {
    const container = document.getElementById(field);
    return container.getElementsByClassName("value")[0];
  }

  function priceLessDownPayment(price) {
    price -= Math.ceil(price * downPaymentPercent);
    return price
  }

  function setPayment() {
    const valueField = getValueElementFor("payment");

    chrome.storage.local.get(["listing"], function(data){
      if (!data.listing.price) return
      price = priceLessDownPayment(data.listing.price);
      valueField.textContent = `${window.monthlyPayment(price, apr, numberOfYears)}`
    });
  }

  function setAssociationFees() {
    const valueField = getValueElementFor("association");

    chrome.storage.local.get(["listing"], function(data){
      if (!data.listing.price) return
      valueField.textContent = `${data.listing.associationFees}`
    });
  }

  function setTaxes() {
    const valueField = getValueElementFor("taxes");

    chrome.storage.local.get(["listing"], function(data){
      if (!data.listing.price) return
      valueField.textContent = `${window.monthlyTaxes(data.listing.taxes)}`
    });
  }

  function setInsurance() {
    const valueField = getValueElementFor("insurance");

    chrome.storage.local.get(["listing"], function(data){
      if (!data.listing.price) return
      valueField.textContent = `${window.monthlyInsurance(data.listing.price)}`
    });
  }

  function setTotal() {
    const valueField = getValueElementFor("total");

    chrome.storage.local.get(["listing"], function(data){
      if (!data.listing.price) return

      const {taxes, associationFees} = data.listing;
      const price = priceLessDownPayment(data.listing.price);
      const total = monthlyPayment(price, apr, numberOfYears) +
                    monthlyTaxes(taxes) +
                    monthlyInsurance(price) +
                    associationFees;

      valueField.textContent = `${total}`
    });
  }

  setPayment();
  setAssociationFees();
  setInsurance();
  setTaxes();
  setTotal();
})();
