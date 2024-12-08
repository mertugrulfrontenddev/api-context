import "./App.css";

import React, { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [budget, setBudget] = useState(0);
  let [expenseItems, setExpenseItems] = useState([]);
  let [showmodal, setShowmodal] = useState(true);

  function handleExpense({ expenseType, amount }) {
    setExpenseItems((prevItems) => [
      ...prevItems,
      { id: Date.now(), expenseType, amount },
    ]);
  }

  const totalExpense = expenseItems.reduce(
    (total, item) => total + parseFloat(item.amount),
    0
  );
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

  function handleSetBudget(newBudget) {
    setBudget(Number(newBudget));

    setShowmodal(false);
  }

  return (
    <div className="App">
      <div className="container-fluid bg-secondary  ">
        <div className="row min-vh-100 d-flex align-items-center justify-content-center">
          <div className="col-sm-12 col-md-6 col-lg-6">
            {!showmodal && (
              <>
                <div className="container-fluid mb-3 mt-2">
                  <div className="card">
                    <div className="card-body">
                      <h2>Set Your Budget</h2>
                      <p>Total Budget: ${budget}</p>
                      <p>Total Expense: ${totalExpense}</p>
                      <p>
                        Remaining Budget: ${budget - totalExpense}
                        {totalExpense > budget && (
                          <span style={{ color: "red" }}> (Exceeded)</span>
                        )}
                        <p>
                          <button
                            className="mt-2 btn bg-primary text-white"
                            onClick={() => {
                              setShowmodal(true);

                              setBudget(0);
                            }}
                          >
                            Reset Budget
                          </button>
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
                <ExpenseForm handleExpense={handleExpense} />

                <ExpenseList
                  expenseItems={expenseItems}
                  handleDelete={handleDelete}
                  budget={budget}
                  totalExpense={totalExpense}
                />
              </>
            )}

            {showmodal && (
              <>
                <div
                  style={{
                    position: "fixed",
                    left: 0,
                    top: 0,

                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div
                    style={{
                      background: "white",
                      padding: "30px",
                      borderRadius: "10px",
                      width: "300px",
                      textAlign: "center",
                      animation: "modalExpand 0.5s ease-out",
                    }}
                  >
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

                    <button
                      className="mt-2 btn bg-primary text-white"
                      onClick={() => handleSetBudget(budget)}
                    >
                      Add Budget
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
