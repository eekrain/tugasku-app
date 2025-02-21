import { db } from "@/db";
import { getUser } from "@/lib/auth/helper";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const user = await getUser();
  if (!user || user.role !== "lead")
    return new Response("Unauthorized", { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");

  const res = await db.query.userTable.findMany({
    where: (t, { and, eq, like }) =>
      username
        ? and(eq(t.role, "team"), like(t.username, `%${username}%`))
        : eq(t.role, "team"),
    limit: 10,
    orderBy: (t, { asc }) => asc(t.username),
    columns: {
      username: true,
      id: true,
    },
  });

  return new Response(
    JSON.stringify(res.map((val) => ({ value: val.id, label: val.username }))),
    {
      status: 200,
    },
  );
}
