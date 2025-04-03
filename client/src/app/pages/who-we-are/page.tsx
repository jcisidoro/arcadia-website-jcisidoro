import AboutIntro from "../AboutIntro";
import ArcadiaComponents from "../ArcadiaComponents";
import ArcadiaIntroPage from "../ArcadiaIntroPage";
import ArcadiaSolutionsPage from "../ArcadiaSolutionsPage";
import LandingPage from "../LandingPage";

export default function FirstPage() {
  return (
    <div className="flex flex-col bg-[#6D6D6D]">
      <LandingPage />
      <ArcadiaIntroPage />
      <ArcadiaComponents />
      <ArcadiaSolutionsPage />
      <AboutIntro />
    </div>
  );
}
