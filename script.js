// script.js

let totalExpenses = 0;
let expenses = [];

function addExpense() {
  const product = document.getElementById('expense-product').value;
  const amount = parseFloat(document.getElementById('expense-amount').value);

  if (!isNaN(amount)) {
    totalExpenses += amount;
    expenses.push({ product, amount });
    renderExpenses();
    document.getElementById('total').textContent = totalExpenses.toFixed(2);
    document.getElementById('expense-product').value = '';
    document.getElementById('expense-amount').value = '';
  }
}

function renderExpenses() {
  const expensesTable = document.getElementById('expenses');
  expensesTable.innerHTML = '';
  expenses.forEach((expense, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.product}</td>
      <td>${expense.amount.toFixed(2)}</td>
      <td class="actions" >
        <button class="edit" onclick="editExpense(${index})">Edit</button>
        <button class="delete"  onclick="deleteExpense(${index})">Delete</button>
      </td>
    `;
    expensesTable.appendChild(row);
  });
}

function editExpense(index) {
  const editedProduct = prompt('Enter edited product:');
  const editedAmount = parseFloat(prompt('Enter edited amount:'));
  if (!isNaN(editedAmount) && editedProduct) {
    totalExpenses -= expenses[index].amount;
    totalExpenses += editedAmount;
    expenses[index] = { product: editedProduct, amount: editedAmount };
    renderExpenses();
    document.getElementById('total').textContent = totalExpenses.toFixed(2);
  }
}

function deleteExpense(index) {
  totalExpenses -= expenses[index].amount;
  expenses.splice(index, 1);
  renderExpenses();
  document.getElementById('total').textContent = totalExpenses.toFixed(2);
}
