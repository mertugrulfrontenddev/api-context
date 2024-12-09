// ExpenseItem.js

import { useState } from "react";
import { motion } from "framer-motion";

import removeIcon from "../images/remove.png";
import xButtonIcon from "../images/x-button.png";

import next from "../images/next.png";

const ExpenseItem = ({ item, handleDelete }) => {
  const [hoveredItemId, setHoveredItemId] = useState(false);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }} // Sayfa ilk yüklendiğinde öğe görünmesin ve soldan gelsin
        animate={{ opacity: 1, x: 0 }} // Öğenin tam görünür hale gelmesi ve konumlanması
        exit={{ opacity: 0, x: 100 }} // Öğenin sağa kayarak kaybolması
      >
        <li className="list-group-item d-flex justify-content-between">
          <span className="text-secondary fw-bold" style={{ minWidth: 130 }}>
            <img
              src={next}
              style={{ maxWidth: 15, maxHeight: 15 }}
              className="me-2 "
              alt=""
            />

            {item.expenseType.charAt(0).toUpperCase() +
              item.expenseType.slice(1)}
          </span>
          <span className="text-secondary fw-bold" style={{ minWidth: 100 }}>
            {"$ " + item.amount}
          </span>

          <div>
            <span>
              <img
                src={hoveredItemId === item.id ? xButtonIcon : removeIcon} // Resmi src olarak ekliyoruz
                style={{
                  maxWidth: 20,
                  maxHeight: 20,
                  cursor: "pointer",
                }}
                className="delete-icon me-1 "
                alt="Remove Icon"
                onClick={() => handleDelete(item.id)}
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
              />
            </span>
          </div>
        </li>
      </motion.div>
    </>
  );
};

export default ExpenseItem;
