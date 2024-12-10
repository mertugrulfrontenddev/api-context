import { createContext, useEffect, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  let [expenseItems, setExpenseItems] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );

  // we can delete expense individually

  function handleDelete(expenseId) {
    setExpenseItems((prevList) => {
      let updatedItems = prevList.filter(
        (listItem) => listItem.id !== expenseId
      );

      localStorage.setItem("expenses", JSON.stringify(updatedItems));

      return updatedItems;
    });
  }

  // we can handle expenses and add to our expense array values form select and input controls
  function handleExpense({ expenseType, amount }) {
    setExpenseItems((prevItems) => {
      let updatedItems = [
        ...prevItems,
        { id: Date.now(), expenseType, amount },
      ];

      localStorage.setItem("expenses", JSON.stringify(updatedItems));

      return updatedItems;
    });
  }

  const totalExpense = expenseItems.reduce(
    (total, item) => total + parseFloat(item.amount),
    0
  );

  return (
    <ExpenseContext.Provider
      value={{
        expenseItems,
        setExpenseItems,
        handleDelete,
        handleExpense,
        totalExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
