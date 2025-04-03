import PositionPapersPage from "../PositionPapersPage";
import PublicationsIntroPage from "../PublicationsIntroPage";
import PublicationsPage from "../PublicationsPage";
import OpinionEditorials from "../OpinionEditorials";
import PublishedWasteReportPage from "../PublishedWasteReportPage";
import ReportsAndManifestosPage from "../ReportsAndManifestosPage";

export default function ThirdPage() {
  return (
    <div className="flex flex-col bg-[#6D6D6D]">
      <PublicationsPage />
      <PublicationsIntroPage />
      <PositionPapersPage />
      <ReportsAndManifestosPage />
      <OpinionEditorials />
      <PublishedWasteReportPage />
    </div>
  );
}
