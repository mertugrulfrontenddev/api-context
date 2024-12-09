import { motion, AnimatePresence } from "framer-motion";
import wallet from "../images/wallet.png";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenseItems, handleDelete, budget, totalExpense }) => {
  return (
    <div className="container-fluid mt-2">
      <div className="card">
        <div className="card-body">
          <h3>Expense List</h3>

          <motion.h5
            style={{ color: totalExpense > budget ? "red" : "green" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={totalExpense > budget ? "over-budget" : "under-budget"}
          >
            {totalExpense > budget
              ? "Warning! You've exceeded your budget!"
              : "Expenses are under control."}
          </motion.h5>

          <div className="d-flex justify-content-between">
            <h5>Total Expense: ${totalExpense.toFixed(2)}</h5>
            <h5>Remaining Budget: ${budget - totalExpense}</h5>
          </div>

          <ul className="list-group">
            <AnimatePresence>
              {expenseItems.length > 0 ? (
                expenseItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="list-group-item"
                  >
                    <ExpenseItem item={item} handleDelete={handleDelete} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="d-flex flex-column justify-content-center"
                >
                  <div className="card">
                    <div className="card-body mx-auto d-flex flex-column align-items-center">
                      <img
                        src={wallet}
                        style={{
                          maxWidth: 75,
                          maxHeight: 75,
                        }}
                        className="delete-icon me-2"
                        alt="Empty Wallet"
                      />
                      <p className="badge bg-primary px-4 fs-6">
                        Henüz bir harcamanız yok
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
