import styles from "./toggleButtons.module.css";
import { FiLock, FiUnlock } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function ToggleButtons({ allow, setAllow }) {
  const handleToggle = () => {
    setAllow(!allow);
  };

  return (
    <div className={styles.toggleContainer} onClick={handleToggle}>
      <div className={styles.buttonSection}>
        <AnimatePresence mode="wait">
          {allow ? (
            <motion.div
              key="unlock"
              className={styles.iconWrapper}
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 90, scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiUnlock className={styles.icon} />
            </motion.div>
          ) : (
            <motion.div
              key="lock"
              className={styles.iconWrapper}
              initial={{ rotate: 90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: -90, scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiLock className={styles.icon} />
            </motion.div>
          )}
        </AnimatePresence>
        <button className={allow ? styles.active : styles.inactive}>
          {allow ? "공개" : "비공개"}
        </button>
      </div>
    </div>
  );
}
