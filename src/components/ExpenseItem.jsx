// ExpenseItem.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Görselleri import et
import removeIcon from "../images/remove.png";
import xButtonIcon from "../images/x-button.png";
import next from "../images/next.png";

const ExpenseItem = ({ item, handleDelete }) => {
  // Hover durumunu yönetmek için state tanımlıyoruz
  const [hoveredItemId, setHoveredItemId] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }} // İlk yüklemede soldan gelerek görünür
      animate={{ opacity: 1, x: 0 }} // Görünür hale gelir
      exit={{ opacity: 0, x: 100 }} // Sağ tarafa kayarak silinir
    >
      <li className="list-group-item d-flex justify-content-between">
        {/* Harcama türü */}
        <span className="text-secondary fw-bold" style={{ minWidth: 130 }}>
          <img
            src={next}
            style={{ maxWidth: 15, maxHeight: 15 }}
            className="me-2"
            alt="Next Icon"
          />
          {item.expenseType.charAt(0).toUpperCase() + item.expenseType.slice(1)}
        </span>

        {/* Miktar */}
        <span className="text-secondary fw-bold" style={{ minWidth: 100 }}>
          {"$ " + item.amount}
        </span>

        {/* Silme butonu */}
        <div>
          <img
            src={hoveredItemId === item.id ? xButtonIcon : removeIcon} // Hover durumuna göre ikon değişir
            style={{
              maxWidth: 20,
              maxHeight: 20,
              cursor: "pointer",
            }}
            className="delete-icon me-1"
            alt="Remove Icon"
            onClick={() => handleDelete(item.id)} // Silme işlemini tetikler
            onMouseEnter={() => setHoveredItemId(item.id)} // Hover başlar
            onMouseLeave={() => setHoveredItemId(null)} // Hover biter
          />
        </div>
      </li>
    </motion.div>
  );
};

export default ExpenseItem;
