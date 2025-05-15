import styles from "./AddTravelPage.module.css";
import Header from "./Header";
import InputField from "./InputField";
import ThemeSelect from "./ThemeSelect";
import DateRange from "./DateRange";
import PeopleAndDays from "./PeopleAndDays";
import FacilityIcons from "./FacilityIcons";
import MapPreview from "./MapPreview";
import ScheduleItem from "./ScheduleItem";

export default function AddTravelPage() {
  return (
    <div className={styles.container}>
      <Header />
      <h2 className={styles.title}>+ 여행 일정 추가</h2>
      <InputField placeholder="나만의 여행명을 작성해주세요.." label="여행명" />
      <ThemeSelect />
      <DateRange />
      <PeopleAndDays />
      <FacilityIcons />
      <MapPreview />
      <ScheduleItem no="1" />
      <ScheduleItem no="2" />
      <button className={styles.addBtn}>+</button>
      <button className={styles.detailBtn}>+ 상세 일정</button>
      <button className={styles.saveBtn}>save</button>
    </div>
  );
}
