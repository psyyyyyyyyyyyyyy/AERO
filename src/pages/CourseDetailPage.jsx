import Header from "../components/header/Header";
import CourseTitle from "../components/courseDetail/CourseTitle";
import NaverMapView from "../components/courseDetail/NaverMapView";
import FacilityIcons from "../components/courseDetail/FacilityIcons";
import PlaceList from "../components/courseDetail/PlaceList";

export default function CourseDetailPage() {
  return (
    <div>
      <Header />
      <CourseTitle />
      <NaverMapView />
      <FacilityIcons />
      <PlaceList />
    </div>
  );
}