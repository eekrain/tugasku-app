import { Option } from "@/components/common/select";
import { myfetch } from "./fetcher";

export const getTeamMember = async (username?: string) => {
  let url = "/api/getTeamMember";
  if (username) url += `?username=${username}`;

  const res = await myfetch
    .get(url)
    .errorMessage("Fetch team member gagal")
    .execute<Option[]>();

  return res;
};
