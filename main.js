function updateSlider(sourceId, targetId, valueId) {
  const sourceInput = document.getElementById(sourceId);
  const targetInput = document.getElementById(targetId);
  const valueInput = document.getElementById(valueId);

  targetInput.value = sourceInput.value;
  valueInput.value = sourceInput.value;

  updateSliderColor(sourceInput, valueInput);
}

function updateSliderColor(input, value) {
  const track = input.nextElementSibling.firstElementChild;

  if (input.value == input.min) {
    track.style.backgroundColor = '#f1f1f1';
  } else if (input.value == input.max) {
    track.style.backgroundColor = '#04AA6D';
  } else {
    track.style.backgroundColor = '#FFC107';
  }
}

function updateTimePeriodUnit() {
  const timePeriodInput = document.getElementById("timePeriod");
  const timePeriodUnitInput = document.getElementById("timePeriodUnit");
  const timePeriodTrackInput = document.getElementById("timePeriodTrack");

  const timePeriodValue = timePeriodInput.value;
  const timePeriodUnit = timePeriodUnitInput.value;

  if (timePeriodUnit === "days") {
    timePeriodInput.value = timePeriodValue;
    timePeriodTrackInput.max = 365;
    timePeriodTrackInput.value = timePeriodValue;
  } else if (timePeriodUnit === "months") {
    timePeriodInput.value = timePeriodValue;
    timePeriodTrackInput.max = 50;
    timePeriodTrackInput.value = timePeriodValue;
  } else if (timePeriodUnit === "years") {
    timePeriodInput.value = timePeriodValue;
    timePeriodTrackInput.max = 50;
    timePeriodTrackInput.value = timePeriodValue;
  }
}

function calculate() {
  const investedAmount = parseFloat(document.getElementById("investmentAmount").value);
  const estimatedReturn = parseFloat(document.getElementById("returnRate").value);
  const timePeriod = parseFloat(document.getElementById("timePeriod").value);
  const timePeriodUnit = document.getElementById("timePeriodUnit").value;

  let timePeriodInYears;

  if (timePeriodUnit === "days") {
    timePeriodInYears = timePeriod / 365.25;
  } else if (timePeriodUnit === "months") {
    timePeriodInYears = timePeriod / 12;
  } else if (timePeriodUnit === "years") {
    timePeriodInYears = timePeriod;
  }

  const [principalAmount, compoundInterest, totalValue] = calculateFDReturns(investedAmount, estimatedReturn, timePeriodInYears);

  const resultContainer = document.getElementById("result-container");

  resultContainer.innerHTML = "";

  const investedAmountElement = document.createElement("p");
  investedAmountElement.innerText = "Invested Amount: ₹" + Math.round(investedAmount).toLocaleString('en-IN');

  const estimatedReturnElement = document.createElement("p");
  estimatedReturnElement.innerText = "Estimated Return: ₹" + Math.round(compoundInterest).toLocaleString('en-IN');

  const totalValueElement = document.createElement("p");
  totalValueElement.innerText = "Total Value: ₹" + Math.round(totalValue).toLocaleString('en-IN');

  resultContainer.appendChild(investedAmountElement);
  resultContainer.appendChild(estimatedReturnElement);
  resultContainer.appendChild(totalValueElement);
}

function calculateFDReturns(investment, returnRate, timePeriod) {
  const principalAmount = investment;
  const interestRate = returnRate;
  const compoundingFrequency = 4; // Compounding every 3 months (quarterly)
  const tenure = timePeriod * compoundingFrequency; // Adjust the tenure by multiplying it with the compounding frequency

  // Compound Interest Calculation
  const compoundInterest = principalAmount * (Math.pow(1 + interestRate / (100 * compoundingFrequency), tenure) - 1);
  const totalValueCompound = principalAmount + compoundInterest;

  return [Math.round(principalAmount), Math.round(compoundInterest), Math.round(totalValueCompound)];
}

