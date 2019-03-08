(function() {
  // formulas pulled from: https://en.wikipedia.org/wiki/Time_value_of_money
  const monthsPerYear = 12;
  const decimalConversionFactor = 100;

  function calculateAppliedInterestRate(apr) {
    return (apr / monthsPerYear) / decimalConversionFactor;
  }

  function calculateNumberOfMonths(years) {
    return years * monthsPerYear;
  }

  function calculateRateFactor(appliedInterestRate, numberOfPayments) {
    return (1 + appliedInterestRate) ** numberOfPayments;
  }

  function calculatePayment(presentValue, apr, years) {
    const appliedInterestRate = calculateAppliedInterestRate(apr);
    const numberOfPayments = calculateNumberOfMonths(years);
    const rateFactor = calculateRateFactor(appliedInterestRate, numberOfPayments);

    return Math.ceil(
      presentValue * (appliedInterestRate * (rateFactor / (rateFactor - 1)))
    );
  }

  // export calculatePayment function
  window.calculatePayment = calculatePayment;
})();
