import { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import wallet from "../images/wallet.png";
const ExpenseList = ({ expenseItems, handleDelete, budget, totalExpense }) => {
  return (
    <div className="container-fluid mt-2">
      <div className="card">
        <div className="card-body">
          <h3>Expense List</h3>
          <h5 style={{ color: totalExpense > budget ? "red" : "green" }}>
            {totalExpense > budget
              ? "Warning! You've exceeded your budget!"
              : "Expenses are under control."}
          </h5>
          <div className="d-flex justify-content-between">
            <h5>Total Expense: ${totalExpense.toFixed(2)}</h5>
            <h5>Remaining Budget: ${budget - totalExpense}</h5>
          </div>
          <ul className="list-group">
            {expenseItems.length > 0 ? (
              expenseItems.map((item) => (
                <ExpenseItem item={item} handleDelete={handleDelete} />
              ))
            ) : (
              <div className="d-flex  flex-column  justify-content-center ">
                <div className="card ">
                  <div className="card-body mx-auto d-flex flex-column align-items-center ">
                    <img
                      src={wallet}
                      style={{
                        maxWidth: 75,
                        maxHeight: 75,
                      }}
                      className="delete-icon me-2 "
                    />
                    <p className="badge bg-primary px-4 fs-6">
                      Henüz bir harcamanız yok
                    </p>
                  </div>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
