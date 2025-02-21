import { Option } from "@/components/common/select";
import { myfetch } from "./fetcher";

export const getTeamMember = async (username?: string) => {
  const query = new URLSearchParams();
  if (username) query.append("username", username);

  const res = await myfetch
    .get(`/api/getTeamMember?${query.toString()}`)
    .errorMessage("Fetch team member gagal")
    .execute<Option[]>();

  return res;
};
