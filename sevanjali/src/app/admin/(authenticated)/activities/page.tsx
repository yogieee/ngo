import { getActivities } from "@/lib/actions/activities";
import { ActivityList } from "./activity-list";

export default async function AdminActivitiesPage() {
  const activities = await getActivities();

  return <ActivityList activities={activities} />;
}
