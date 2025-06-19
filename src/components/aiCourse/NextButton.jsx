import styles from "./nextButton.module.css";

export default function NextButton({ onClick, isLast, form, step, hasDateError }) {
  // 현재 스텝에 따라 필요한 필드만 검사
  const isInvalid =
    (step === 1 && !form.region) ||
    (step === 2 && !form.people) ||
    (step === 3 && (!form.startDate || !form.endDate || hasDateError)) ||
    (step === 4 && !form.theme) ||
    (step === 5 && !form.pace);

  return (
    <div className={styles.container}>
      <button
        className={styles.nextBtn}
        onClick={onClick}
        disabled={isInvalid}
      >
        {isLast ? "완료" : "다음"}
      </button>
    </div>
  );
}
