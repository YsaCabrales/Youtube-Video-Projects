// Monthly Income DOM
const incomeInput = document.querySelector("#incomeInput");
const incomeDesc = document.querySelector("#incomeDesc");
const incomeBtn = document.querySelector("#incomeBtn");
const incomeRecord = document.querySelector(".incomeRecord");
const totalIncome = document.querySelector("#totalIncome");

// Monthly Expense DOM
const expenseInput = document.querySelector("#expenseInput");
const expenseDesc = document.querySelector("#expenseDesc");
const expenseType = document.querySelector("#expenseTypes");
const expenseBtn = document.querySelector("#expenseBtn");
const expenseRecord = document.querySelector(".expenseRecord");
const totalExpense = document.querySelector("#totalExpense");

// Budget Allocation DOM
const needsBudget = document.querySelector(".needsBudget");
const wantsBudget = document.querySelector(".wantsBudget");
const savingsBudget = document.querySelector(".savingsBudget");
const needsTotal = document.querySelector(".needsTotal");
const wantsTotal = document.querySelector(".wantsTotal");
const savingsTotal = document.querySelector(".savingsTotal");
const budgetLeft = document.querySelector(".budgetLeft");

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  showRecords("income");
  showRecords("expense");
  budgetAllocation();
});
incomeBtn.addEventListener("click", addIncome);
expenseBtn.addEventListener("click", addExpense);
incomeRecord.addEventListener("click", deleteItem);
expenseRecord.addEventListener("click", deleteItem);

// Global Variables
let incomeRecords = [], expenseRecords = [];
let localTotalIncome = 0, localTotalExpense = 0;

function showRecords(recordType) {
  let recordCap = recordType.charAt(0).toUpperCase() + recordType.slice(1);
  let localRecords = JSON.parse(localStorage.getItem(`local${recordCap}Records`)) || [];
  let total = 0;

  localRecords.forEach(record => {
    displayElements(
      record["amount"], 
      record["description"], 
      `${recordType}Amount`, 
      `${recordType}Desc`, 
      recordType === "income" ? incomeRecord : expenseRecord, 
      recordType === "expenseRecord", 
      record["type"]);
    total += parseFloat(record["amount"]);
  });

  if (recordType === "income") {
    totalIncome.innerText = `Total Income: $${total.toFixed(2)}`;
    localTotalIncome = total;
  } else {
    totalExpense.innerText = `Total Expense: $${total.toFixed(2)}`;
    localTotalExpense = total;
  }
}

function addIncome(e) {
    //Prevent natural behavior storing data right in a user's web browser. It allows you to save data that persists even after the user closes the browser or refreshes the page.
    e.preventDefault();

    if(incomeInput.value > 0 && incomeDesc.value){
      let incomeTemp = {
        amount: incomeInput.value,
        description: incomeDesc.value
      };
      incomeRecords.push(incomeTemp);
      localStorage.setItem("localIncomeRecords", JSON.stringify(incomeRecords));

      displayElements(
        incomeInput.value, 
        incomeDesc.value, 
        "incomeAmount", 
        "incomeDesc", 
        incomeRecord, 
        false)
      localTotalIncome += parseFloat(incomeInput.value)
      totalIncome.innerText = `Total Income: $${localTotalIncome.toFixed(2)}`;
      budgetAllocation();
    } else {
      alert("Please provide valid input to all income fields.");
    }
}

function addExpense(e) {
  //Prevent natural behavior
  e.preventDefault();

  if(expenseInput.value > 0 && expenseDesc.value && expenseType.value){
    let expenseTemp = {
      amount: expenseInput.value,
      description: expenseDesc.value,
      type: expenseType.value
    };
    expenseRecords.push(expenseTemp);
    localStorage.setItem("localExpenseRecords", JSON.stringify(expenseRecords));

    displayElements(expenseInput.value, expenseDesc.value, "expenseAmount", "expenseDesc", expenseRecord, true, expenseType.value)
    localTotalExpense += parseFloat(expenseInput.value)
    totalExpense.innerText = `Total Expense: $${localTotalExpense.toFixed(2)}`;

    budgetAllocation();
  } else {
    alert("Please provide valid input to all expense fields.");
  }
}

function displayElements(
  amount, 
  desc, 
  amountClass, 
  descClass, 
  div, 
  isExpense, 
  type) {
  const newDiv = document.createElement("div");
  const amountDiv = document.createElement("div");
  const descDiv = document.createElement("div");
  amountDiv.innerText = `$${amount}`;
  amountDiv.classList.add(amountClass)
  descDiv.innerText = desc;
  descDiv.classList.add(descClass)
  div.appendChild(newDiv);
  newDiv.appendChild(descDiv);
  newDiv.appendChild(amountDiv);

  if (isExpense) {
    const typeDiv = document.createElement("div");
    typeDiv.innerText = type;
    typeDiv.classList.add(descClass);
    newDiv.appendChild(typeDiv);
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `X`;
  deleteBtn.classList.add("deleteRecord");
  newDiv.appendChild(deleteBtn);
}

function deleteItem(e) {
    e.preventDefault();

    const item = e.target;
  
    if (item.classList[0] === "deleteRecord") {
      const record = item.parentElement;
      const amount = parseFloat((record.querySelector(".incomeAmount, .expenseAmount").innerText).substring(1));
      record.remove();
      if (record.querySelector('.incomeAmount')){
        removeLocalRecord("localIncomeRecords", record);
        localTotalIncome -= amount;
        totalIncome.innerText = `Total Income: $${localTotalIncome}`;
      } else {
        removeLocalRecord("localExpenseRecords", record);
        localTotalExpense -= amount;
        totalExpense.innerText = `Total Expense: $${localTotalExpense}`;
      }
      budgetAllocation();
    }
}
  
function removeLocalRecord(localRecord, record) {
  if (localStorage.getItem(localRecord) === null) {
    incomeRecords = [];
  } else {
    incomeRecords = JSON.parse(localStorage.getItem(localRecord));
  }
  const recordIndex = record.children[0].innerText;
  incomeRecords.splice(incomeRecords.indexOf(recordIndex), 1);
  localStorage.setItem(localRecord, JSON.stringify(incomeRecords));
}

function budgetAllocation() {
  localExpenseRecords = JSON.parse(localStorage.getItem("localExpenseRecords"));
  
  let needs = localTotalIncome * 0.5;
  let wants = localTotalIncome * 0.3;
  let savings = localTotalIncome * 0.2;

  needsBudget.innerText = `Needs Budget (50%): $${needs.toFixed(2)}`;
  wantsBudget.innerText = `Wants Budget (30%): $${wants.toFixed(2)}`;
  savingsBudget.innerText = `Savings Budget (20%): $${savings.toFixed(2)}`;
  
  let totalNeeds = 0, totalWants = 0, totalSavings = 0;
  
  localExpenseRecords.forEach(record => {
    switch (record["type"]) {
      case "Needs":
        totalNeeds += parseFloat(record["amount"]);
        break;
      case "Wants":
        totalWants += parseFloat(record["amount"]);
        break;
      case "Savings":
        totalSavings += parseFloat(record["amount"]);
        break;
      default:
        alert("Invalid expense type.");
    }
  });

  let needsDiff = needs - totalNeeds;
  let wantsDiff = wants - totalWants;
  let savingsDiff = savings - totalSavings;

  needsTotal.innerText = `Needs Total: $${totalNeeds.toFixed(2)} | Difference: $${needsDiff.toFixed(2)}`;
  wantsTotal.innerText = `Wants Total: $${totalWants.toFixed(2)} | Difference: $${wantsDiff.toFixed(2)}`;
  savingsTotal.innerText = `Savings Total: $${totalSavings.toFixed(2)} | Difference: $${savingsDiff.toFixed(2)}`;

  budgetLeft.innerText = `Budget Left:  $${(localTotalIncome - localTotalExpense).toFixed(2)}`
}