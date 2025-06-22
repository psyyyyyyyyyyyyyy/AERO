import { motion } from "framer-motion";
import styles from "./loadingOverlay.module.css";

export default function LoadingOverlay() {
  return (
    <div className={styles.overlay}>
      <motion.div
        className={styles.spinner}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <motion.p
        className={styles.text}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        AI가 여러분의 맞춤 코스를 생성중입니다...
      </motion.p>
    </div>
  );
}
