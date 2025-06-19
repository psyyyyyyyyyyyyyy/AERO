import { useState } from "react";
import RegionSelector from "../components/aiCourse/RegionSelector";
import CompanionSelector from "../components/aiCourse/CompanionSelector";
import DateSelector from "../components/aiCourse/DateSelector";
import PaceSelector from "../components/aiCourse/PaceSelector";
import ThemeSelector from "../components/aiCourse/ThemeSelector";
import NextButton from "../components/aiCourse/NextButton";
import Header from "../components/header/Header";
import styles from "./aiCoursePage.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { generateAiCourse } from "../api/AicourseApi";
import { useNavigate } from "react-router-dom";

export default function AiCoursePage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    region: "",
    people: "",
    startDate: "",
    endDate: "",
    theme: "",
    pace: "",
  });
  const [dateError, setDateError] = useState(false);

  const navigate = useNavigate();

  const handleNext = async () => {
    if (step === 5) {
      try {
        const result = await generateAiCourse(form);
        navigate(`/courses/ai/${result.id}`);
      } catch (error) {
        console.error("AI 코스 생성 실패:", error);
        alert("AI 코스 생성 중 오류가 발생했습니다.");
      }
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const renderStepComponent = () => {
    switch (step) {
      case 1:
        return (
          <RegionSelector
            value={form.region}
            onChange={(region) => setForm({ ...form, region })}
          />
        );
      case 2:
        return (
          <CompanionSelector
            value={form.people}
            onChange={(people) => setForm({ ...form, people })}
          />
        );
      case 3:
        return (
          <DateSelector
            start={form.startDate}
            end={form.endDate}
            onChange={(startDate, endDate) => {
              setForm({ ...form, startDate, endDate });

              if (
                startDate &&
                endDate &&
                new Date(startDate) > new Date(endDate)
              ) {
                setDateError(true);
              } else {
                setDateError(false);
              }
            }}
          />
        );
      case 4:
        return (
          <ThemeSelector
            value={form.theme}
            onChange={(theme) => setForm({ ...form, theme })}
          />
        );
      case 5:
        return (
          <PaceSelector
            value={form.pace}
            onChange={(pace) => setForm({ ...form, pace })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className={styles.motionWrapper}
          >
            {renderStepComponent()}
          </motion.div>
        </AnimatePresence>

        <NextButton
          onClick={handleNext}
          isLast={step === 5}
          form={form}
          step={step}
          hasDateError={dateError}
        />
      </div>
    </>
  );
}
