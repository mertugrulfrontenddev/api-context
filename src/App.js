import "./App.css";
import { ExpenseContext } from "./context/ExpenseContext";
import React, { useState, useContext, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { ExpenseProvider } from "./context/ExpenseContext";

function App() {
  const [budget, setBudget] = useState(0); // Başlangıçta bütçe 0
  const [showmodal, setShowmodal] = useState(false); // Modal'ı kontrol etmek için state

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan bütçeyi al
    const savedBudget = localStorage.getItem("budget");
    if (savedBudget) {
      setBudget(JSON.parse(savedBudget)); // Eğer localStorage'da bütçe varsa, state'i güncelle
    } else {
      setShowmodal(true); // Eğer bütçe yoksa, modalı göster
    }
  }, []); // Bu effect sadece sayfa ilk yüklendiğinde çalışır

  const {
    expenseItems,
    setExpenseItems,
    handleDelete,
    handleExpense,
    totalExpense,
  } = useContext(ExpenseContext);

  function handleBudgetChange(event) {
    setBudget(Number(event.target.value));
  }

  function handleSetBudget(newBudget) {
    setBudget(Number(newBudget));
    localStorage.setItem("budget", JSON.stringify(Number(newBudget))); // Bütçeyi localStorage'a kaydet
    setShowmodal(false); // Modal'ı kapat
  }

  return (
    <div className="App">
      <div className="container-fluid bg-secondary  ">
        <div className="row min-vh-100 d-flex align-items-center justify-content-center">
          <div className="col-sm-12 col-md-6 col-lg-6">
            {/* Eğer bütçe varsa ve modal kapalıysa, bu kısmı göster */}
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
                      </p>
                      <p>
                        <button
                          className="mt-2 btn bg-primary text-white"
                          onClick={() => {
                            setShowmodal(true); // Modal'ı tekrar göster
                            setBudget(0); // Bütçeyi sıfırla
                          }}
                        >
                          Reset Budget
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
                <ExpenseForm />
                <ExpenseList
                  expenseItems={expenseItems}
                  handleDelete={handleDelete}
                  budget={budget}
                  totalExpense={totalExpense}
                />
              </>
            )}

            {/* Eğer showmodal true ise, modalı göster */}
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
                      onChange={handleBudgetChange}
                      placeholder="Enter Your Budget"
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
