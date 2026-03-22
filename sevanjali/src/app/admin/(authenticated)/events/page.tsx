import { getAllEvents } from "@/lib/actions/events";
import { EventList } from "./event-list";

export default async function AdminEventsPage() {
  const events = await getAllEvents();

  return <EventList events={events} />;
}
