import SearchSection from "../components/courseSearch/SearchSection";
import SortTabs from "../components/courseSearch/SortTabs";
import TourCardList from "../components/courseSearch/TourCardList";
import Pagination from "../components/courseSearch/Pagination";

export default function CourseSearchPage() {
  return (
    <div>
      <SearchSection />
      <SortTabs />
      <TourCardList />
      <Pagination />
    </div>
  );
}
