import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import CourseDetailPage from "../pages/CourseDetailPage";
import RegionSearchPage from "../pages/RegionSearchPage";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/course" element={<CourseDetailPage />} />
        <Route path="/regionSearch" element={<RegionSearchPage />} />
      </Routes>
    </Router>
  );
}
