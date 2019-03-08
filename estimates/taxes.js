(function(){
  const monthsPerYear = 12;

  function monthlyAllocationForTaxes(annualTax) {
    return annualTax / monthsPerYear;
  }

  window.monthlyAllocationForTaxes = monthlyAllocationForTaxes;
})();
