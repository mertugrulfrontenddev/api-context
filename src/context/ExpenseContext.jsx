import { createContext, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  let [expenseItems, setExpenseItems] = useState([]);

  // we can delete expense individually

  function handleDelete(expenseId) {
    setExpenseItems((prevList) =>
      prevList.filter((listItem) => listItem.id !== expenseId)
    );
  }

  // we can handle expenses and add to our expense array values form select and input controls
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
