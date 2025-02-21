import { db } from "@/db";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
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
