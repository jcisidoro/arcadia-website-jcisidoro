import CampaignsPage from "../CampaignsPage";
import UpcomingEvents from "../UpcomingEvents";
import EventsIntroPage from "../EventsIntroPage";
import EventsPage from "../EventsPage";
import PreviousEvents from "../PreviousEvents";

export default function SecondPage() {
  return (
    <div className="flex flex-col bg-black">
      <EventsPage />
      <EventsIntroPage />
      <CampaignsPage />
      <div id="upcoming-events">
        <UpcomingEvents />
      </div>
      <PreviousEvents />
    </div>
  );
}
