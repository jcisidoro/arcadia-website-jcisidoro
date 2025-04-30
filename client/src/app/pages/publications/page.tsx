import PositionPapersPage from "../PositionPapersPage";
import PublicationsIntroPage from "../PublicationsIntroPage";
import PublicationsPage from "../PublicationsPage";
import OpinionEditorials from "../OpinionEditorials";
import PublishedWasteReportPage from "../PublishedWasteReportPage";
import ReportsAndManifestosPage from "../ReportsAndManifestosPage";

export default function ThirdPage() {
  return (
    <div className="flex flex-col bg-black">
      <PublicationsPage />
      <PublicationsIntroPage />
      <PositionPapersPage />
      <ReportsAndManifestosPage />
      <div id="opinion-editorials">
        <OpinionEditorials />
      </div>
      <PublishedWasteReportPage />
    </div>
  );
}
