(function() {
  // formulas pulled from: https://en.wikipedia.org/wiki/Time_value_of_money
  const monthsPerYear = 12;
  const decimalConversionFactor = 100;

  // Time Value of Money calculations
  function calculateAppliedInterestRate(apr) {
    return (apr / monthsPerYear) / decimalConversionFactor;
  }

  function calculateNumberOfMonths(years) {
    return years * monthsPerYear;
  }

  function calculateRateFactor(appliedInterestRate, numberOfPayments) {
    return (1 + appliedInterestRate) ** numberOfPayments;
  }

  function monthlyPayment(presentValue, apr, years) {
    const appliedInterestRate = calculateAppliedInterestRate(apr);
    const numberOfPayments = calculateNumberOfMonths(years);
    const rateFactor = calculateRateFactor(appliedInterestRate, numberOfPayments);

    return Math.ceil(
      presentValue * (appliedInterestRate * (rateFactor / (rateFactor - 1)))
    );
  }

  // Tax calculation
  function monthlyTaxes(annualTax) {
    return Math.ceil(annualTax / monthsPerYear);
  }

  // Insurance calculations
  function monthlyInsurance(presentValue) {
    const percentOfValue = 0.00049;
    const percentFinanced = 0.80;
    return Math.ceil(presentValue * percentFinanced * percentOfValue);
  }

  // export functions
  window.monthlyPayment = monthlyPayment;
  window.monthlyTaxes = monthlyTaxes;
  window.monthlyInsurance = monthlyInsurance;
})();
