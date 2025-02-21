import { db } from "@/db";
import { getUser } from "@/lib/auth/helper";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const user = await getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  const sort = searchParams.get("sort");

  if (!status || !sort) return new Response("Bad Request", { status: 400 });
  console.log("🚀 ~ GET ~ status:", status);

  const res = await db.query.tasks.findMany({
    // User with team role can only see their assigned tasks only
    ...(user.role === "team"
      ? {
          where: (t, { and, eq }) =>
            // @ts-expect-error
            and(eq(t.assignedTo, user.id), eq(t.status, status)),
        }
      : // @ts-expect-error
        { where: (t, { eq }) => eq(t.status, status) }),
    // Sorter
    orderBy: (t, { asc, desc }) => {
      if (sort === "created-at-asc") return asc(t.createdAt);
      if (sort === "created-at-desc") return desc(t.createdAt);
      if (sort === "title-desc") return desc(t.title);
      return asc(t.title);
    },
  });

  return new Response(JSON.stringify(res), {
    status: 200,
  });
}
