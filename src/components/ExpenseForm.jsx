import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
const ExpenseForm = () => {
  const [expenseType, setExpenseType] = useState("");
  const [amount, setAmount] = useState(0);

  const { handleExpense } = useContext(ExpenseContext);

  // Expense type değiştiğinde tetiklenen fonksiyon
  const handleChange = (event) => {
    setExpenseType(event.target.value); // Burada Number() kullanmak gerekmez
  };

  // Harcama miktarı değiştiğinde tetiklenen fonksiyon
  const handleAmountChange = (event) => {
    setAmount(event.target.value); // amount'u string olarak tutuyoruz, sayıya dönüştürmemize gerek yok
  };

  const handleFocus = (event) => {
    event.target.select();
  };
  const handleSubmit = () => {
    if (expenseType && amount) {
      // Harcama bilgisini gönder
      handleExpense({ expenseType, amount });

      // Formu temizle
      setExpenseType("");
      setAmount("");
    } else {
      alert("Lütfen tüm alanları doldurun!");
    }
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <h3>Select Expense Type</h3>
          <div className="form-group d-flex flex-column gap-3">
            <label
              htmlFor="expenseType"
              className="badge bg-primary fw-bold text-white py-2 "
            >
              Expense Type
            </label>
            <select
              className="form-control"
              id="expenseType"
              value={expenseType}
              onChange={handleChange}
              // Daha kısa yazım
            >
              <option value="">Please Select</option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="entertainment">Entertainment</option>
              <option value="bills">Bills</option>
              <option value="other">Other</option>
            </select>

            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              onFocus={handleFocus} // Harcama miktarı değiştiğinde
              placeholder="Enter amount"
            />

            <button
              className="btn bg-primary mt-2 text-white"
              onClick={handleSubmit}
            >
              Add Expense
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
