import "./App.css";

import React, { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [budget, setBudget] = useState(0);
  let [expenseItems, setExpenseItems] = useState([]);

  function handleExpense({ expenseType, amount }) {
    setExpenseItems((prevItems) => [
      ...prevItems,
      { id: Date.now(), expenseType, amount },
    ]);
  }

  function handleBudgetChange(event) {
    setBudget(Number(event.target.value));
  }
  function handleFocus(event) {
    event.target.select(); // İçeriği seçili yapar
  }

  function handleDelete(expenseId) {
    setExpenseItems((prevList) =>
      prevList.filter((listItem) => listItem.id !== expenseId)
    );
  }

  return (
    <div className="App">
      <div className="container-fluid bg-secondary  ">
        <div className="row min-vh-100 d-flex align-items-center justify-content-center">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="container-fluid mb-3 mt-2">
              <div className="card">
                <div className="card-body">
                  <h2>Set Your Budget</h2>
                  <input
                    className="form-control"
                    type="number"
                    value={budget}
                    onChange={(event) => {
                      handleBudgetChange(event);
                    }}
                    onFocus={handleFocus}
                    placeholder="Bütçenizi girin"
                  />
                </div>
              </div>
            </div>
            <ExpenseForm handleExpense={handleExpense} />

            <ExpenseList
              expenseItems={expenseItems}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
