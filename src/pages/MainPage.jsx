import Header from "../components/header/Header";
import MainBanner from "../components/main/MainBanner";
import TagFilter from "../components/main/TagFilter";
import RecommendedCourse from "../components/main/RecommendedCourse";
import UserCourse from "../components/main/UserCourse";

export default function MainPage() {
  return (
    <div>
      <Header />
      <MainBanner />
      <TagFilter />
      <RecommendedCourse />
      <UserCourse />
    </div>
  );
}