import removeIcon from "../images/remove.png";
import xButtonIcon from "../images/x-button.png";
import wallet from "../images/wallet.png";
import next from "../images/next.png";
import { useState } from "react";
const ExpenseList = ({ expenseItems, handleDelete }) => {
  const [hoveredItemId, setHoveredItemId] = useState(false);
  const totalExpense = expenseItems.reduce(
    (total, item) => total + parseFloat(item.amount),
    0
  );
  return (
    <div className="container-fluid mt-2">
      <div className="card">
        <div className="card-body">
          <h3>Expense List</h3>

          <h5>Total Expense: ${totalExpense.toFixed(2)}</h5>
          <ul className="list-group">
            {expenseItems.length > 0 ? (
              expenseItems.map((item) => (
                <li className="list-group-item d-flex justify-content-between">
                  <span
                    className="text-secondary fw-bold"
                    style={{ minWidth: 150 }}
                  >
                    <img
                      src={next}
                      style={{ maxWidth: 15, maxHeight: 15 }}
                      className="me-2 "
                      alt=""
                    />
                    {item.expenseType.charAt(0).toUpperCase() +
                      item.expenseType.slice(1)}
                  </span>
                  <span
                    className="text-secondary fw-bold"
                    style={{ minWidth: 100 }}
                  >
                    {"$ " + item.amount}
                  </span>
                  <div>
                    <span>
                      <img
                        src={
                          hoveredItemId === item.id ? xButtonIcon : removeIcon
                        } // Resmi src olarak ekliyoruz
                        style={{
                          maxWidth: 20,
                          maxHeight: 20,
                          cursor: "pointer",
                        }}
                        className="delete-icon me-2 "
                        alt="Remove Icon"
                        onClick={() => handleDelete(item.id)}
                        onMouseEnter={() => setHoveredItemId(item.id)}
                        onMouseLeave={() => setHoveredItemId(null)}
                      />
                    </span>
                  </div>
                </li>
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
