import CampaignsPage from "../CampaignsPage";
import UpcomingEvents from "../UpcomingEvents";
import EventsIntroPage from "../EventsIntroPage";
import EventsPage from "../EventsPage";
import PreviousEvents from "../PreviousEvents";

export default function SecondPage() {
  return (
    <div className="flex flex-col bg-[#6D6D6D]">
      <EventsPage />
      <EventsIntroPage />
      <CampaignsPage />
      <UpcomingEvents />
      <PreviousEvents />
    </div>
  );
}
