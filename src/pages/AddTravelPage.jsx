import styles from "./addTravelPage.module.css";
import Header from "../components/header/Header";
import TitleHeader from "../components/addTravel/TitleHeader";
import ToggleButtons from "../components/addTravel/ToggleButtons";
import InputGroup from "../components/addTravel/InputGroup";
import FacilityIcons from "../components/addTravel/FacilityIcons";
import DayTabs from "../components/addTravel/DayTab";
import MapSection from "../components/addTravel/MapSection";
import ScheduleList from "../components/addTravel/ScheduleList";
import SaveButton from "../components/addTravel/SaveButton";

export default function AddTravelPage() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.headerSection}>
        <TitleHeader />
        <ToggleButtons />
      </div>
      <InputGroup />
      <FacilityIcons />
      <DayTabs totalDays={6} />
      <MapSection />
      <ScheduleList />
      <SaveButton />
    </div>
  );
}
