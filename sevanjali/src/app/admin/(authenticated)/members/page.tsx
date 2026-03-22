import { getMembers } from "@/lib/actions/members";
import { MemberList } from "./member-list";

export default async function AdminMembersPage() {
  const members = await getMembers();

  return <MemberList members={members} />;
}
